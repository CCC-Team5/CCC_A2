"""
Author
yutianqi 1221167

Description: packaging data analysis data in json and dealing with
             request and response
"""

from django.shortcuts import render
from .dataAnalysis import *
from .database import CouchDB
from django.http import HttpResponse, HttpResponseBadRequest
import json
# Create your views here.

# database in couchdb
tweets = 'raw_tweets'


def hashtag(request):
    db = CouchDB()
    tweet_db = db.fetch_DB(tweets)
    if request.method == 'GET':
        # filter top-20 topics
        hashtags = now_trending(tweet_db, 20)
        if hashtags:
            return HttpResponse(json.dumps(hashtags, ensure_ascii=False))
        else:
            # status code 400
            return HttpResponseBadRequest(hashtags)
