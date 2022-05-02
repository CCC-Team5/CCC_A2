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


def language_formatter(language):
    result_lst = {'lanuage': []}
    for tag, count in language.items():
        obj = {"name": tag, "count": count}
        result_lst['lanuage'].append(obj)
    return result_lst


def language_and_birth(request):
    if request.method == 'GET':
        result_lst = {'language_count': [], 'birth_country': [], 'language_at_home': []}
        try:
            # top 10 languages other than English in which tweets were made
            language_count = top_n_lang_count(tweet_db, langCode_Path, 10)
            for tag, count in language_count.items():
                obj = {'language name': tag, 'count': count}
                result_lst['language_count'].append(obj)

            # top 10 non-English-speaking countries where people living in the Greater Melbourne were originally from
            birth_country = top_n_birth_country(birth_Path, 10)
            for tag, count in birth_country.items():
                obj = {'country': tag, 'count': count}
                result_lst['birth_country'].append(obj)

            # top N languages other than English spoken at home
            language_at_home = top_n_lang_spoken_at_home(langHome_Path, langCode_Path, 10)
            for tag, count in language_at_home.items():
                obj = {'country': tag, 'count': count}
                result_lst['language_at_home'].append(obj)
        except Exception as e:
            print(e)
            result_lst = None

        if result_lst:
            return HttpResponse(json.dumps(result_lst))
        else:
            # status code 400
            return HttpResponseBadRequest(result_lst)

    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def housing_trend_sentiment(request):
    """
    This function get the information from Database about the housing trand and sentiment
    """
    if request.method == 'GET':
        topic = topics[0]
        try:
            year_topic, year_total, percent = topic_trend(tweet_db, topic)
            years = list(percent)
            percents = list(percent.values())
            percents = [round(i, 2) for i in percents]
            yearly_sentiment = topic_sentiment(topic)
            yearly_sentiment = list(yearly_sentiment.values())
            yearly_sentiment = [round(i, 2) for i in yearly_sentiment]
            context = {"year": years, "percent": percents, "sentiment": yearly_sentiment}
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(context).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")

def housing_content(request):
    if request.method == 'GET':
        return
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")
