"""
Author
Weimin Ouyang 340438 completing all data analysis section before 2022/4/22
yutianqi 1221167 packaging all functions

Description: data analysis in couchdb database
"""

import pandas as pd
import numpy as np
import re
import nltk
import string
from collections import defaultdict
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer
from textblob import TextBlob


def delete_docs(topic, save_db):
    """
    delete existing data in DB (to replace previous data analyses results)
    params: the topic to look at (one of housing, cost or transportation);
            the database where the particular topic results were saved in
    """

    # use this after DB is completely ready
    docs = []
    for row in save_db.view(topic + '/all', include_docs=True):
        doc = row['doc']
        if int(doc['year']) >=2018:
            doc['_deleted']=True
            docs.append(doc)
        save_db.update(docs)


def now_trending(db, N):
    """
    extract top N mostly used hasgtags in tweets from past 14 days
    params: raw_tweets database;
            number of hashtags to extract
    return: top N hashtags extracted from tweets made within last 14 days;
            all hashtags in lowercases
    return type: dict - {hashtag:count}
    frontend: wordcloud
    """

    hashtags = {}
    # using hashtags/trending view map/reduce data to generate result
    for item in db.view('hashtags/trending', group=True, group_level=1):
        if item.key.lower() not in hashtags.keys():
            hashtags[item.key.lower()] = item.value
        else:
            hashtags[item.key.lower()] += item.value

    hashtags = {k: v for k, v in sorted(hashtags.items(), key=lambda item: item[1])[-N:]}

    return hashtags


def read_langCode(langCode_path):
    """
    read languages abbreviation from Data/langCode.json, not hard code
    param: language code file path
    return: {language_code: language_name} - language code dictionary
    """

    langCode = {}
    with open(langCode_path, 'r', encoding='utf-8') as f:
        for line in f:
            (val, key) = line.split()
            # set abbreviation as key, language as value
            langCode[key] = val
    return langCode


def top_n_lang_count(db, langCode_path, N):
    """
    extract top N languages other than English in which tweets were made
    params: raw_tweets database;
            path to langCode.json file;
            number of languages to extract
    return: top N most tweeted languages other than English
    return type: dict - {language code: count}
    frontend: bar chart/pie chart (colour matching for most tweeted languages/counrty of birth/language spoken at home)
    """
    languages = {}

    for item in db.view('lang/lang-count', group=True, group_level=1):
        if item.key != 'en':
            if item.key == 'in':
                languages['id'] = item.value
            else:
                languages[item.key] = item.value

        languages = {k: v for k, v in sorted(languages.items(), key=lambda item: item[1])[::-1][:N]}

    langCode = read_langCode(langCode_path)

    languages = {v2: v1 for k1, v1 in languages.items() for k2, v2 in langCode.items() if k1 == k2}

    return languages
