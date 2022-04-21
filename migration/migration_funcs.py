import urllib.request
import tarfile
import json
from couchdb_settings import *
from functions import save_to_db

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
                if data['doc'].get('timeline', None) is not None:
                    save_to_db(doc_id, keyword, data['doc']['timeline'], db)
                elif data['doc'].get('stream', None) is not None:
                    save_to_db(doc_id, keyword, data['doc']['stream'], db)
                elif data['doc'].get('processed', None) is not None:
                    save_to_db(doc_id, keyword, data['doc'], db)
                else:
                    save_to_db(doc_id, 'tweet', data['doc'], db)
        except Exception as e:
            print('Error reading line --ignoring')
            print(line_processed) 