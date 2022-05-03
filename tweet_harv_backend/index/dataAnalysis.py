"""
Author
Weimin Ouyang 340438 completing all data analysis section before 2022/4/22
yutianqi 1221167 packaging all functions

Description: data analysis in couchdb database
"""

import pandas as pd
import numpy as np
from .database import CouchDB
import re
import nltk
import string
from collections import defaultdict
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer
from textblob import TextBlob
from geojson import Point, Feature, FeatureCollection, dump


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
        if int(doc['year']) >= 2018:
            doc['_deleted'] = True
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

    for item in db.view('hashtags/trending', group=True, group_level=1):
        if item.key.lower() not in hashtags.keys():
            hashtags[item.key.lower()] = item.value
        else:
            hashtags[item.key.lower()] += item.value

    hashtags = {k: v for k, v in sorted(hashtags.items(), key=lambda item: item[1])[-N:]}

    return hashtags


def read_langCode(db):
    """
    param: langcode database
    return: {language_code: language_name} - language code dictionary
    """

    langCode = {}
    for item in db.view('lang/Code'):
        langCode[item.key] = item.value

    return langCode


def top_n_lang_count(db, langCode_db, N):
    """
    extract top N languages other than English in which tweets were made
    params: raw_tweets database;
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

    langCode = read_langCode(langCode_db)

    languages = {v2: v1 for k1, v1 in languages.items() for k2, v2 in langCode.items() if k1 == k2}

    return languages


def top_n_birth_country(db, N):
    """
    extract top N non-English-speaking countries where people living in the Greater Melbourne were originally from
    params: birthcountry database;
            number of non-English-speaking countries to extract
    return: top N non-English-speaking countries' names, total population count, and percentage population
    return type: dict - {country name: (country total, country percentage)}
    frontend: pie chart (colour matching for most tweeted languages/counrty of birth/language spoken at home)
    """

    birth = {}
    for item in db.view('birth/country'):
        birth[item.key] = item.value

    birth = {k: v for k, v in sorted(birth.items(), key=lambda item: item[1])[-N:]}

    return birth


def top_n_lang_spoken_at_home(db, N):
    """
    extract top N languages other than English spoken at home
    params: langhome database;
            number of languages other than English to extract
    return: names of top N languages other than English spoken at home, total population count, percentage of population count to total SOL population,
            percentage of population count to total population, and percentage of SOL population to total population
    return type: dict - {country name: (language total, language percentage per SOL, langauge percentage per total)}
    frontend: bar pie chart (colour matching for most tweeted languages/counrty of birth/language spoken at home)
    """

    spoken = {}
    for item in db.view('home/lang'):
        spoken[item.key] = item.value

    spoken = {k: v for k, v in sorted(spoken.items(), key=lambda item: item[1])[-N:]}

    return spoken


def topic_switch(topic):
    """
    params: topic of selection
    return: paths to the views relating to the selected topic
    """

    count_view = 'text/' + topic + '-count'
    topic_view = 'text/' + topic

    return count_view, topic_view


def topic_trend(db, topic):
    """
    extract the number and percentage of tweets on the selected topic made each year
    params: raw_tweets database;
            the topic of selection
    return:
    return type: dict - {year : number of tweets on the selected topic made in that year}
                 dict - {year : total number of tweets made in that year}
                 dict - {year : percentage of tweets on selected topic over total number of tweets made in that year}
    frontend: Dual axes, line and column (combine with topic sentiment as the line)
    """

    count_view, _ = topic_switch(topic)

    year_topic = {}
    year_total = {}
    percent = {}

    for item in db.view(count_view, group=True, group_level=1):
        year_topic[item.key] = item.value

    for item in db.view('time/by-year-count', group=True, group_level=1):
        year_total[item.key] = item.value

    for key in year_topic.keys():
        percent[key] = year_topic[key] / year_total[key] * 100

    return year_topic, year_total, percent


def topic_wordcloud_save(query_db, topic, save_db):
    """
    extract topic related wordcloud
    params: raw_tweets database;
            topic of selection
    return: corpus of combined tweets on the selected topic indexed by year;
            all words in lowercases
    return type: dict - {year : corpus as a list}
    frontend: wordcloud
    """

    _, topic_view = topic_switch(topic)

    try:
        delete_docs(topic, save_db)
    except Exception:
        pass

    yearly_tweets = defaultdict(list)
    for item in query_db.view(topic_view):
        if int(item.key) >= 2018:
            yearly_tweets[item.key].append(item.value)

    tokenizer = TweetTokenizer()

    for key, tweet in yearly_tweets.items():
        tweet = [' '.join(re.sub("(@[A-Za-z0-9\_]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", t).split()) for t in tweet]
        tweet = [' '.join(tweet)]
        tweet_tokens = tokenizer.tokenize(tweet[0])
        tweet_clean = []
        for word in tweet_tokens:
            if word.lower() not in stopwords.words('english') and word.lower() not in string.punctuation:
                tweet_clean.append(word.lower())

        yearly_tweets[key] = ' '.join(tweet_clean)

    for k, v in yearly_tweets.items():
        save_db.save({'year': k, 'text': v})


def topic_word_cloud(db, topic):
    """
    extract topic related wordcloud
    params: topic of selection
    return: corpus of combined tweets on the selected topic indexed by year;
            all words in lowercases
    return type: dict - {year : corpus as a list}
    frontend: wordcloud
    """

    yearly_tweets = {}
    for item in db.view(topic + '/text'):
        yearly_tweets[item.key] = item.value

    return yearly_tweets


def topic_sentiment(db, topic):
    """
    extract topic related sentiment
    params: topic of selection
    return: sentiment towards the selected topic indexed by year
    return type: dict - {year : sentiment score}
    frontend: Dual axes, line and column (combine with topic trend as the columns)
    """

    yearly_tweets = {}
    for item in db.view(topic + '/text'):
        yearly_tweets[item.key] = item.value

    yearly_sentiment = {}
    for key, value in yearly_tweets.items():
        blob = TextBlob(value)
        for sentence in blob.sentences:
            sentiment = sentence.sentiment.polarity
            yearly_sentiment[key] = sentiment

    return yearly_sentiment


def geo_LatLong(db):
    """
    extract langitude and longitude information if tweets contain the information
    params: raw_tweets database
    return: coordinates of tweets that contain the information
    return type: geojson
    frontend: map
    """
    features = []
    for item in db.view('geoLocation/new-view'):
        cor = item.key
        features.append(Feature(geometry=Point((cor[0], cor[1]))))

    feature_collection = FeatureCollection(features)
    #     with open('myfile1.geojson', 'w') as f:
    #         dump(feature_collection, f)
    return feature_collection




##########################################################
# For Data Processing ONLY, Do NOT use
# older data analysis version mading by Weimin Ouyang 34043
# def save_langCode(langCode_path):
#     """
#     save language code file to the Couchdb database
#     param: language code file path
#     """
#
#     langCode_db = db_connect('langcode')
#     with open(langCode_path, 'r', encoding='utf-8') as f:
#         for line in f:
#             (val, key) = line.split()
#             langCode_db.save({'code': key, 'language': val})
#
#
# def birth_country(file_path):
#     """
#     save AURIN data regarding non-English-speaking countries where people living in the Greater Melbourne were originally from to the CouchDB
#     params: path to census data download from AURIN - 'country_of_birth.csv';
#     """
#     data = pd.read_csv(file_path)
#
#     match_cols = []
#     new_cols = []
#     col_names = data.columns
#     for name in col_names:
#         if name.endswith('_p'):
#             match_cols.append(name)
#             new_cols.append(name.strip())
#
#     ext_data = pd.DataFrame(data[match_cols])
#     ext_data.columns = new_cols
#
#     grand_total = ext_data['tot_p'].sum(axis=0)
#     country_total = ext_data.sum(axis=0)
#     percentage = country_total / grand_total * 100
#
#     birth_country = pd.DataFrame(country_total, columns=['country_total'])
#     birth_country['percentage'] = percentage
#
#     drop_columns = ['hong_kong_sar_china_p', 'born_elsewhere_p', 'tot_p', 'os_visitors_p', 'country_birth_not_stated_p',
#                     'australia_p', 'new_zealand_p', 'united_states_america_p', 'united_kingdom_ci_im_p', 'fiji_p',
#                     'south_africa_p']
#
#     birth_country.loc['china_excl_sars_taiwan_p'] += birth_country.loc['hong_kong_sar_china_p']
#     birth_country = birth_country.T.drop(drop_columns, axis=1)
#     birth_country = birth_country.rename({'china_excl_sars_taiwan_p': 'china_p', 'sri_lanka_p': 'srilanka_p'}, axis=1)
#
#     country_names = []
#     for item in birth_country.columns:
#         item = item.split('_')
#         country_names.append(item[0].capitalize())
#
#     birth_country.columns = country_names
#     birth_country = birth_country.rename({'Srilanka': 'Sri Lanka'}, axis=1).T
#     birth_country = birth_country.sort_values(by=['country_total'], ascending=False)
#
#     birthcountry_db = db_connect(birth_country)
#     for i in range(len(birth_country)):
#         birthcountry_db.save({'country': birth_country.index[i],
#                               'values': (birth_country.country_total.values[i], birth_country.percentage.values[i])})
#
#
# def lang_spoken_at_home(file_path):
#     """
#     extract top N languages other than English spoken at home
#     params: path to census data download from AURIN - 'lang_at_home.csv';
#             path to langCode.json file;
#             number of languages other than English to extract
#     return: names of top N languages other than English spoken at home, total population count, percentage of population count to total SOL population,
#             percentage of population count to total population, and percentage of SOL population to total population
#     return type: numpy arrays
#     frontend: bar chart/pie chart (colour matching for most tweeted languages/counrty of birth/language spoken at home)
#     """
#
#     data = pd.read_csv(file_path)
#
#     match_cols = []
#     new_cols = []
#     col_names = data.columns
#     for name in col_names:
#         if name.endswith('_P'):
#             match_cols.append(name)
#             new_cols.append(name.strip())
#
#     ext_data = pd.DataFrame(data[match_cols])
#     ext_data.columns = new_cols
#
#     SOL_tot = ext_data['SOL_Tot_P'].sum(axis=0)
#     tot = ext_data['Total_P'].sum(axis=0)
#     SOL_perc = SOL_tot / tot * 100
#
#     drop_columns = ['SOL_Other_P', 'SOL_Samoan_P', 'SOL_Assyrian_P', 'SOL_Iran_Lan_Tot_P',
#                     'SOL_Irani_Lan_Othr_P', 'SOL_Se_As_A_L_Othr_P', 'SOL_Aus_Indig_Lang_P',
#                     'SOL_In_Ar_Lang_Othr_P', 'SOL_In_Ar_Lang_Tot_P', 'SOL_Se_As_A_L_Tot_P',
#                     'Language_spoken_home_ns_P', 'SOL_Tot_P', 'Total_P',
#                     'SOL_Chin_lang_Mand_P', 'SOL_Chin_lang_Other_P', 'SOL_Chin_lang_Cant_P']
#
#     ext_data = ext_data.drop(drop_columns, axis=1)
#     lang_tot = ext_data.sum(axis=0)
#
#     columns = []
#     for index in lang_tot.index:
#         idx = index.split('_')
#         if 'Se_As' in index or 'In_Ar' in index or 'Ir_Lang' in index:
#             columns.append(idx[-2])
#         elif 'Ir_La' in index:
#             columns.append(idx[3])
#         else:
#             columns.append(idx[1])
#
#     lang_tot.index = columns
#     lang_data = pd.DataFrame(lang_tot, columns=['number']).T
#     lang_data = lang_data.rename({'Pe': 'Persian'}, axis=1).T
#     lang_data['percentage_SOL'] = lang_data['number'] / SOL_tot * 100
#     lang_data['percentage_Total'] = lang_data['number'] / tot * 100
#
#     langCode = read_langCode()
#     langdict = {k: v for v in langCode.values() for k in lang_data.index if k in v}
#
#     idx = []
#     for i in lang_data.index:
#         name = langdict[i]
#         idx.append(name)
#
#     lang_data.index = idx
#     lang_data = lang_data.sort_values(by=['number'], ascending=False)[:N]
#
#     homelang_db = db_connect(home_lang)
#     for i in range(len(lang_data)):
#         array = np.array(
#             [lang_data.number.values[i], lang_data.percentage_SOL.values[i], lang_data.percentage_Total.values[i]])
#         values = array.tolist()
#         homelang_db.save({'country': lang_data.index[i], 'values': values})

###########################################################