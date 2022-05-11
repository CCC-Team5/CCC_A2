import couchdb
import tweepy
import datetime
import socket
from couchdb_settings import *
from api_credentials import *

def db_connect(dbname):
    """
    connect to CouchDB server to create databases
    params: name of the database to be created
    return: created database
    """

    couchserver = couchdb.Server('http://' + username + ':' + password + '@' + address)
    try:
      db = couchserver[dbname]
    except:
      db = couchserver.create(dbname)

    return db


def save_to_db(item_id, keyword, item, db):
    """
    save document to database
    params: the id of the document;
            the key word as the key to the saved content;
            the content to be saved in the document;
            the database to save the document to
    """

    db[item_id] = {keyword: item}
        

def authenticate(BEARER_TOKEN):
    """
    authenticate Twitter API
    params: bear token of Twitter developer account
    return: client to make request to the Twitter API
    """

    client = tweepy.Client(bearer_token=BEARER_TOKEN, wait_on_rate_limit=True)

    return client


def search_timeline(client, id_str, place_id, tweet_db):
    """
    search through a particular user's timeline
    params: client to make request to the Twitter API;
            the id of the user to be searched up;
            the place id of Melbourne;
            the database to save searched tweets to
    """ 

    for response in tweepy.Paginator(client.get_users_tweets, 
                                     id_str, 
                                     start_time = datetime.datetime(2018, 1, 1, 0, 0, 0).strftime("%Y-%m-%dT%H:%M:%SZ"),
                                     exclude=['retweets','replies'],
                                     tweet_fields = ['created_at','entities','geo','lang'],
                                     place_fields = ['geo'],
                                     expansions = 'geo.place_id,author_id',
                                     max_results = 100).flatten():
        
        tweet = response.data
        if tweet.get('geo', None) is not None:
            if tweet['geo'].get('place_id') == place_id:
                tweet_id = tweet.get('id')
                if tweet_id not in tweet_db:
                    save_to_db(tweet_id, 'tweet', tweet, tweet_db)


def search_area(servers):
    """
    find a particular area segment to search tweets in
    params: the number of servers available
    return: the bounding box of a particular area (which is a segment of Melbourne) to search tweets in
    """

    melbourne = [144.593741856, -38.433859306, 145.512528832, -37.5112737225]

    index = int(socket.gethostname()[-1])
    lng_1 = melbourne[0] + round((melbourne[2] - melbourne[0])/servers, 10) * index
    lng_2 = melbourne[0] + round((melbourne[2] - melbourne[0])/servers, 10) * (index + 1)
    melbourne[0] = lng_1
    melbourne[2] = lng_2
    
    return melbourne