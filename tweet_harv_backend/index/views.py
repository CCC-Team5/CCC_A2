"""
Author
yutianqi 1221167
Junjie Xia 1045673

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
birth_country = 'birthcountry'
lang_code = 'langcode'
home_lang = 'homelang'
# reference CouchDB class in databasem, create a instance named db
# then call fetch_DB method to get raw_tweets database
db = CouchDB()
# connect to different dbs
tweet_db = db.fetch_DB(tweets)
language_db = db.fetch_DB(lang_code)
birth_db = db.fetch_DB(birth_country)
langhome_db = db.fetch_DB(home_lang)
housing_text_db = db.fetch_DB('housing_text')
cost_text_db = db.fetch_DB('cost_text')
transportation_text_db = db.fetch_DB('transportation_text')
geo_db = db.fetch_DB('top_lat_long_live_hist')
topics = ['housing', 'cost', 'transportation']


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
        result_lst = {'language_count': [], 'birth_country': [], 'language_at_home': []}
        try:
            # top 10 languages other than English in which tweets were made
            language_count = top_n_lang_count(tweet_db, language_db, 10)
            for tag, count in language_count.items():
                obj = {'language_name': tag, 'count': count}
                result_lst['language_count'].append(obj)

            # top 10 non-English-speaking countries where people living in the Greater Melbourne were originally from
            birth_country = top_n_birth_country(birth_db, 10)
            for tag, count in birth_country.items():
                obj = {'country': tag, 'count': count}
                result_lst['birth_country'].append(obj)

            # top N languages other than English spoken at home
            language_at_home = top_n_lang_spoken_at_home(langhome_db, 10)
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


def percent(request):
    result_lst = {'language_count': [], 'birth_country': [], 'language_at_home': []}
    if request.method == 'GET':
        try:
            language_count = top_n_lang_count_2(tweet_db, language_db, 10)
            result_lst['language_count'].append(language_count)
            birth_country = top_n_birth_country_2(birth_db, 10)
            result_lst['birth_country'].append(birth_country)
            language_at_home = top_n_lang_spoken_at_home_2(langhome_db, 10)
            result_lst['language_at_home'].append(language_at_home)
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
            yearly_sentiment = topic_sentiment(housing_text_db, topic)
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
        topic = topics[0]
        try:
            yearly_tweets = topic_word_cloud(housing_text_db, topic)
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(yearly_tweets).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def cost_trend_sentiment(request):
    """
    This function get the information from Database about the cost of living trand and sentiment
    """
    if request.method == 'GET':
        topic = topics[1]
        try:
            year_topic, year_total, percent = topic_trend(tweet_db, topic)
            years = list(percent)
            percents = list(percent.values())
            percents = [round(i, 2) for i in percents]
            yearly_sentiment = topic_sentiment(cost_text_db, topic)
            yearly_sentiment = list(yearly_sentiment.values())
            yearly_sentiment = [round(i, 2) for i in yearly_sentiment]
            context = {"year": years, "percent": percents, "sentiment": yearly_sentiment}
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(context).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def cost_content(request):
    if request.method == 'GET':
        topic = topics[1]
        try:
            yearly_tweets = topic_word_cloud(cost_text_db, topic)
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(yearly_tweets).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def transportation_trend_sentiment(request):
    """
    This function get the information from Database about the transportation of living trand and sentiment
    """
    if request.method == 'GET':
        topic = topics[2]
        try:
            year_topic, year_total, percent = topic_trend(tweet_db, topic)
            years = list(percent)
            percents = list(percent.values())
            percents = [round(i, 2) for i in percents]
            yearly_sentiment = topic_sentiment(transportation_text_db, topic)
            yearly_sentiment = list(yearly_sentiment.values())
            yearly_sentiment = [round(i, 2) for i in yearly_sentiment]
            context = {"year": years, "percent": percents, "sentiment": yearly_sentiment}
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(context).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def transportation_content(request):
    if request.method == 'GET':
        topic = topics[2]
        try:
            yearly_tweets = topic_word_cloud(transportation_text_db, topic)
        except Exception as e:
            print(e, "topic: ", topic)
        response_json = json.dumps(yearly_tweets).encode("utf-8")
        return HttpResponse(response_json)
    else:
        return HttpResponseBadRequest("Please sending a GET request, other methods cannot be accepted!")


def geojson_map(request):
    if request.method == 'GET':
        geo_map = geo_LatLong(geo_db)
        if geo_map:
            return HttpResponse(json.dumps(geo_map))
        else:
            # status code 400
            return HttpResponseBadRequest(geo_map)
