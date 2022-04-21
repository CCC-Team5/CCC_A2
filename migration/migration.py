from migration_funcs import *
from couchdb_settings import *
from functions import db_connect


# link & filename of historic data
url = 'https://www.dropbox.com/s/y4ss9gmw6ykde51/twitter-melb.json.tar.gz?dl=1'
filename = 'twitter-melb.tar.gz'

# EC2 CouchDB file path
# curl -X GET http://admin:123456@localhost:15984/raw_tweets/_all_docs\?include_docs\=true > /Users/Weimin/Desktop/raw_tweets.json
tweets_path = 'raw_tweets.json'
# curl -X GET http://admin:123456@localhost:15984/user_list/_all_docs\?include_docs\=true > /Users/Weimin/Desktop/users.json
user_path = 'users.json'

# download file from dropbox & unzip
historic_data(url, filename)

# historic data file path
historic_path = 'twitter-melb.json'

# connect to MRC CouchDB
tweet_db = db_connect(tweets)
user_db = db_connect(user)

# read & save EC2 tweets
yield_tweets = read_tweets(tweets_path)
migrate_to_db(yield_tweets, 'tweet', tweet_db)

# read & save EC2 userlist
yield_tweets = read_tweets(user_path)
migrate_to_db(yield_tweets, 'doc', user_db)

# read & save historic tweets
yield_tweets = read_tweets(historic_path)
migrate_to_db(yield_tweets, 'tweet', tweet_db)

