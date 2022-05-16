# Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

# Author:

# Xinhao Chen 1230696 Melbourne
# Weimin Ouyang 340438 Melbourne
# Tianqi Yu 1221167 China
# Junjie Xia 1045673 China
# Yuling Zheng 954408 Melbourne

import couchdb
import tweepy
import json
import socket
from functions import *
from couchdb_settings import *
from api_credentials import *


class TwitterStreamer(tweepy.Stream):

    def on_status(self, status):
        print(f'status_text: {status.text}')

    def on_data(self, data):
        tweet = json.loads(data)
        tweet_id = tweet.get('id_str')
        
        if (tweet.get('retweeted_status', None) is None) and (tweet_id not in tweet_db):
            save_to_db(tweet_id, 'tweet', tweet, tweet_db)
            # log = ('\n' + 'new tweet: ' + tweet_id)
            # with open('log.txt', 'a') as f:
            #     f.write(log)
            
        user_id = tweet['user'].get('id_str')
        if user_id not in user_db:
            search_timeline(client, user_id, place_id, tweet_db)
            save_to_db(user_id, 'processed', 'yes', user_db) 
            # log = ('\n' + 'user completed: ' + user_id)
            # with open('log.txt', 'a') as f:
            #     f.write(log)
    
    def on_error(self, status):
        print(f'error: {status}')
        
    def on_exception(self, exception):
        print(f'exception: {exception}')
        return



if __name__ == '__main__':

    tweet_db = db_connect(tweets)
    user_db = db_connect(user)

    client = authenticate(BEARER_TOKEN)

    stream = TwitterStreamer(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    place_id = '01864a8a64df9dc4'

    servers = 4
    area = search_area(servers)
    # print(area)
    
    while True:
        try:
            stream.filter(locations = area)
        except:
            continue
