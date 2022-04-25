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

    for item in db.view('hashtags/trending', group=True, group_level=1):
        if item.key.lower() not in hashtags.keys():
            hashtags[item.key.lower()] = item.value
        else:
            hashtags[item.key.lower()] += item.value

    hashtags = {k: v for k, v in sorted(hashtags.items(), key=lambda item: item[1])[-N:]}

    return hashtags

