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

def top_n_birth_country(file_path, N):
    """
    extract top N non-English-speaking countries where people living in the Greater Melbourne were originally from
    params: path to census data download from AURIN - 'country_of_birth.csv';
            number of non-English-speaking countries to extract
    return: top N non-English-speaking countries' names, total population count, and percentage population
    return type: numpy arrays
    frontend: bar chart/pie chart (colour matching for most tweeted languages/counrty of birth/language spoken at home)
    """
    data = pd.read_csv(file_path)
    
    match_cols = []
    new_cols = []
    col_names = data.columns
    for name in col_names:
        if name.endswith('_p'):
            match_cols.append(name)
            new_cols.append(name.strip())

    ext_data = pd.DataFrame(data[match_cols])
    ext_data.columns = new_cols
    
    grand_total = ext_data['tot_p'].sum(axis = 0)
    country_total = ext_data.sum(axis = 0)
    percentage = country_total/grand_total * 100
    
    birth_country = pd.DataFrame(country_total, columns = ['country_total'])
    birth_country['percentage'] = percentage
    
    drop_columns = ['hong_kong_sar_china_p', 'born_elsewhere_p', 'tot_p', 'os_visitors_p', 'country_birth_not_stated_p', 'australia_p', 'new_zealand_p', 'united_states_america_p', 'united_kingdom_ci_im_p', 'fiji_p', 'south_africa_p']
    
    birth_country.loc['china_excl_sars_taiwan_p'] += birth_country.loc['hong_kong_sar_china_p']
    birth_country = birth_country.T.drop(drop_columns, axis = 1)
    birth_country = birth_country.rename({'china_excl_sars_taiwan_p' : 'china_p', 'sri_lanka_p' : 'srilanka_p'}, axis = 1)
    
    country_names = []
    for item in birth_country.columns:
        item = item.split('_')
        country_names.append(item[0].capitalize())

    birth_country.columns = country_names
    birth_country = birth_country.rename({'Srilanka' : 'Sri Lanka'}, axis = 1).T
    birth_country = birth_country.sort_values(by = ['country_total'], ascending = False)[:N]

    birth = {}
    for i in range(len(birth_country)):
        birth[birth_country.index[i]] = birth_country.country_total.values[i], birth_country.percentage.values[i]
    
    return birth
