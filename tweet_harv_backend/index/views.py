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

langCode_Path = os.path.join(settings.DATASET, "langCode.json")
file_path = os.path.join(settings.DATASET, "country_of_birth.csv")

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


def lang_spoken_home(request):
    if request.method == 'GET':
        langs = top_n_lang_count(tweet_db, langCode_Path, 10)
        if langs:
            return HttpResponse(json.dumps(langs))
        else:
            return HttpResponseBadRequest(langs)

def hashtag_top_n_birth_country(request):
    if request.method == 'GET':
        langs = top_n_lang_count(file_Path, 10)
        if langs:
            return HttpResponse(json.dumps(langs))
        else:
            return HttpResponseBadRequest(langs)
