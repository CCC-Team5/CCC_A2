import couchdb
import tweepy
import json
from functions import *
from couchdb_settings import *
from api_credentials import *


class TwitterStreamer(tweepy.Stream):

    def on_status(self, status):
        print(f'status_text: {status.text}')

    def on_data(self, data):
        tweet = json.loads(data)
        tweet_id = str(tweet.get('id'))
        
        if (tweet.get('retweeted_status', None) is None) and (tweet_id not in tweet_db):
            save_to_db(tweet_id, 'stream', tweet, tweet_db)
            log = ('\n' + 'new tweet: ' + tweet_id)
            with open('log.txt', 'a') as f:
                f.write(log)
            # print(f'new tweet: {tweet_id}')
            
        user_id = str(tweet['user'].get('id_str'))
        if user_id not in user_db:
            search_timeline(client, user_id, place_id, tweet_db)
            save_to_db(user_id, 'processed', 'yes', user_db) 
            log = ('\n' + 'user completed: ' + user_id)
            with open('log.txt', 'a') as f:
                f.write(log)
            # print(f'user completed: {user_id}')
    
    def on_error(self, status):
        print(f'error: {status}')
        
    def on_exception(self, exception):
        print(f'exception: {exception}')
        return



if __name__ == '__main__':

    tweet_db = db_connect(tweets)
    user_db = db_connect(user)

    place_id = '01864a8a64df9dc4'

    client = authenticate(BEARER_TOKEN)

    stream = TwitterStreamer(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    while True:
        try:
            stream.filter(locations = [144.593741856, -38.433859306, 145.512528832, -37.5112737225])
        except:
            continue