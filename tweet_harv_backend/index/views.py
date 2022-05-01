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
    if request.method == 'GET':
        # TODO
        '''
        this section just simply combines three results from ouyang, and dealing them with 
        simple dict structure, converting to json object
        '''
        language_count = top_n_lang_count(tweet_db, langCode_Path, 10)
        birth_country = top_n_birth_country(birth_Path, 10)
        language_at_home = top_n_lang_spoken_at_home(langHome_Path, langCode_Path, 10)
        context = {"language count": language_count, "birth_country": birth_country,
                   "lanuage spoken at home": language_at_home}
        if context:
            return HttpResponse(json.dumps(context))
        else:
            # status code 400
            return HttpResponseBadRequest(context)
    else:
        return HttpResponseBadRequest("Request has some problems here")


def trend(request):
    request_data = json.loads(request.body.decode('utf-8'))
    topics = request_data["topics"]
    for topic in topics:
        try:
            year_topic, year_total, percent = topic_trend(tweet_db, topic)
            context = {"year_topic": year_topic, "year_total": year_total, "percent": percent}
        except Exception as e:
            print(e, "topic: ", topic)
    response_json = json.dumps(context).encode("utf-8")
    return HttpResponse(response_json)


def year_topic(request):
    request_data = json.loads(request.body.decode('utf-8'))
    topics = request_data["topics"]
    for topic in topics:
        try:
            topic_db = db.create_DB(topic + '_text')
            yearly_tweets = topic_wordcloud(topic_db, topic)
        except Exception as e:
            print(e, "topic: ", topic)
    response_json = json.dumps(yearly_tweets).encode("utf-8")
    return HttpResponse(response_json)


def sentiment(request):
    request_data = json.loads(request.body.decode('utf-8'))
    topics = request_data["topics"]
    for topic in topics:
        try:
            yearly_sentiment = topic_sentiment(topic)
        except Exception as e:
            print(e, "topic: ", topic)
    response_json = json.dumps(yearly_sentiment).encode("utf-8")
    return HttpResponse(response_json)