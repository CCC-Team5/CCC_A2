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
import os
from django.conf import settings

# Create your views here.

# database in couchdb
tweets = 'raw_tweets'
# reference CouchDB class in databasem, create a instance named db
# then call fetch_DB method to get raw_tweets database
db = CouchDB()
tweet_db = db.fetch_DB(tweets)
topics = ['housing', 'cost', 'transportation']

langCode_Path = os.path.join(settings.DATASET, "langCode.json")
birth_Path = os.path.join(settings.AURIN_DATASET, "country_of_birth.csv")
langHome_Path = os.path.join(settings.AURIN_DATASET, "lang_at_home.csv")


# change hashtag data format {xxx:xxx, yyy:yyy} -> {xxx:xxx}, {yyy:yyy}
def hashtag_formatter(hashtags):
    result_lst = []
    for tag, count in hashtags.items():
        obj = {"name": tag, "weight": count}
        result_lst.append(obj)
    return result_lst


def hashtag(request):
    if request.method == 'GET':
        # filter top-10 topics
        hashtags = now_trending(tweet_db, 10)
        if hashtags:
            return HttpResponse(json.dumps(hashtag_formatter(hashtags), ensure_ascii=False))
        else:
            # status code 400
            return HttpResponseBadRequest(hashtags)


def language_and_birth(request):
    pass