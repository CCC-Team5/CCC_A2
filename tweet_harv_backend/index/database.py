"""
Author
Weimin Ouyang 340438
yutianqi 1221167

2022/4/24
Description: basic operations on couchdb, like connect, create
"""
import couchdb

DB_INFO = {
    "address": "172.26.134.35:5984",
    "username": "grp5admin",
    "password": "password",
    "database": "raw_tweets"}


class CouchDB(object):
    url = ""
    connected = True
    server = None

    def __init__(self, db_info=None):
        if db_info is None:
            db_info = DB_INFO
        self.url = "http://" + db_info["username"] + ':' + db_info["password"] + '@' + db_info["address"]
        try:
            self.server = couchdb.Server(self.url)
            self.connected = True
            print('CouchDB has been successfully connected: {', self.url, '}')
        except Exception:
            self.server = None
            self.connected = False
            print('Connection with CouchDB is failed: {', self.url, '}')

    def create_DB(self, dbName):
        if self.connected is True:
            if dbName in self.server:
                return self.server[dbName]
            else:
                return self.server.create(dbName)
        return None

    def fetch_DB(self, dbName):
        """
            connect to CouchDB
            params: credentials, db addressm dbname
            return: the db to establish connection with
            return type: database
        """
        db = couchdb.Database('http://' + DB_INFO["address"] + '/' + dbName)
        db.resource.credentials = (DB_INFO["username"], DB_INFO["password"])

        return db
