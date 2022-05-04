import couchdb
import os
import subprocess
from couchdb import *
import json
import pandas as pd

# couchbd_settings
address = 'localhost:15984'
username = 'admin'
password = '123456'
tweets = 'raw_tweets'

def set_up_db():
    os.system("chmod 0400 CCC.pem")
    arg = "ssh -i CCC.pem -L localhost:15984:172.17.0.2:5984 -N -f ec2-user@ec2-3-25-244-154.ap-southeast-2.compute.amazonaws.com"
    proc=subprocess.Popen(arg.split()).wait()
    if proc != 0:
        print("connection is already established")
        pass

class CouchDBHandler:
    def __init__(self, username, password, address, dbname):
        self.db = couchdb.Server('http://' + username + ':' + password + '@' + address)[dbname]

set_up_db()

db_handler = CouchDBHandler(username, password, address, tweets)
print(db_handler.db)

mango = {"selector": {
    "_id": {"$gt": "1"}},   # {"$eq": "1000116399472132094"}
    "fields": ["_id", "_rev", "stream", "timeline"],
    "limit": 10,
    "skip": 0,
    "execution_stats": True
}
for row in db_handler.db.find(mango):
    try:
        if row["stream"]["lang"] != 'en':
            print("stream:", row['_id'], row["stream"]["lang"])
    except KeyError:
        try:
            if row["timeline"]["lang"] != 'en':
                print("timeline:", row['_id'], row["timeline"]["lang"])
        except KeyError:
            if row["historic"]["lang"] != 'en':
                print("historic:", row['_id'], row["historic"]["lang"])

