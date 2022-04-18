import urllib.request
import tarfile
import json
from Twitter_Harvester.couchdb_settings import *
from Twitter_Harvester.functions import save_to_db

def historic_data(url, filename): 

    urllib.request.urlretrieve(url, filename)

    if filename.endswith('tar.gz'):
        tar = tarfile.open(filename, 'r:gz')
        tar.extractall()
        tar.close()


def read_tweets(twitter_path):

    with open(twitter_path, 'r', encoding = 'utf-8') as f:
        for line in f:
            yield line


def proc_line(line):
    line = line.strip('\r\n')
    line = line.strip('')
    if line.endswith (','):
        line = line[:-1]
    if line.endswith (']}'): 
        line = line[:-2]
    return line


def migrate_to_db(generator, keyword, db):
    for line in generator:
        line_processed = proc_line(line)
        try:
            data = json.loads(line_processed)
            doc_id = data['id']
            if doc_id not in db:
                save_to_db(doc_id, keyword, data['doc'], db)
        except Exception as e:
            print('Error reading line --ignoring')
            print(line_processed) 


def migrate_historic(generator, db):
    for line in generator:
        line_processed = proc_line(line)
        try:
            data = json.loads(line_processed)
            if data['doc']['place']['id'] == '01864a8a64df9dc4':
                tweet_id = data['id']
                if tweet_id not in db:
                    save_to_db(tweet_id, 'tweet', data['doc'], db)
        except Exception as e:
            print('Error reading line --ignoring')
            print(line_processed) 