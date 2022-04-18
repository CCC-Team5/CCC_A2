import numpy as np
import pandas as pd
import re
import nltk
import string
import couchdb
from couchdb_settings import *
from collections import defaultdict
from nltk.corpus import stopwords
from nltk.tokenize import TweetTokenizer

# username = 'admin'
# password = '123456'
# address = 'localhost:15984'

# testdb = couchdb.Database('http://' + address + '/view-test')
# testdb.resource.credentials = (username, password)


def fetch_DB(username, password, address, dbname):
    """
    connect to CouchDB
    params: credentials, db addressm dbname
    return: the db to establish connection with
    return type: database
    """
    
    db = couchdb.Database('http://' + address + '/' + dbname)
    db.resource.credentials = (username, password)

    return db


def now_trending(db, N):
    """
    Extract top N mostly used hasgtags in tweets from past 14 days
    params: raw_tweets database;
            number of hashtags to extract
    return: top N hashtags extracted from tweets made within last 14 days; 
            all hashtags in lowercases
    return type: dict - {hashtag:count}
    render: wordcloud
    """
    
    hashtags = {}
    # 'geo-test/hash-tags'; db = testdb
    for item in db.view('hashtags/trending', group = True, group_level = 1):
        if item.key.lower() not in hashtags.keys():
            hashtags[item.key.lower()] = item.value
        else:
            hashtags[item.key.lower()] += item.value
        
    hashtags = {k: v for k, v in sorted(hashtags.items(), key=lambda item: item[1])[-N:]}

    return hashtags


def read_langCode(langCode_path):
    """
    param: language code file path
    return: {language_code: language_name} - language code dictionary
    """

    langCode = {}
    with open(langCode_path, 'r', encoding= 'utf-8') as f:
        for line in f:
            (val, key) = line.split()
            langCode[key] = val
    return langCode 


def top_n_lang_count(db, langCode_path, N):
    """
    Extract top N languages other than English in which tweets were made
    params: raw_tweets database;
            path to langCode.json file;
            number of languages to extract
    return: top N most tweeted languages other than English
    return type: dict - {language code: count}
    render: 
    """
    # 'geo-test/lang-count', db = testdb
    for item in db.view('lang/lang-count', group = True, group_level = 1):
        if item.key != 'en':
            if item.key == 'in':
                languages['id'] = item.value
            else:
                languages[item.key] = item.value
            
        languages = {k:v for k, v in sorted(languages.items(), key=lambda item: item[1])[::-1][:N]}
    
    langCode = read_langCode(langCode_path)
    
    languages = {v2: v1 for k1, v1 in languages.items() for k2, v2 in langCode.items() if k1 == k2}
            
    return languages


def top_n_birth_country(file_path, N):
    """
    Extract top N non-English-speaking countries where people living in the Greater Melbourne were originally from
    params: path to census data download from AURIN - 'country_of_birth.csv';
            number of non-English-speaking countries to extract
    return: top N non-English-speaking countries' names, total population count, and percentage population
    return type: numpy arrays
    render: 
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

    # if render with variable radius pie
    """
    results = []
    for i in range(len(birth_country)):
        entry = {}
        e = birth_country.iloc[i]
        entry['name'] = e.name
        entry['y'] = e.country_total
        entry['z'] = e.percentage
        results.append(entry)
    """
    
    return birth_country.index, birth_country.country_total.values, birth_country.percentage.values
    # return results


def top_n_lang_spoken_at_home(file_path, langCode_path, N):
    """
    Extract top N languages other than English spoken at home
    params: path to census data download from AURIN - 'lang_at_home.csv';
            path to langCode.json file;
            number of languages other than English to extract
    return: names of top N languages other than English spoken at home, total population count, percentage of population count to total SOL population, 
            percentage of population count to total population, and percentage of SOL population to total population
    return type: numpy arrays
    render: 
    """
    
    data = pd.read_csv(file_path)

    match_cols = []
    new_cols = []
    col_names = data.columns
    for name in col_names:
        if name.endswith('_P'):
            match_cols.append(name)   
            new_cols.append(name.strip())

    ext_data = pd.DataFrame(data[match_cols])
    ext_data.columns = new_cols

    SOL_tot = ext_data['SOL_Tot_P'].sum(axis = 0)
    tot = ext_data['Total_P'].sum(axis = 0)
    SOL_perc = SOL_tot/tot * 100

    drop_columns = ['SOL_Other_P', 'SOL_Samoan_P', 'SOL_Assyrian_P','SOL_Iran_Lan_Tot_P', 
                    'SOL_Irani_Lan_Othr_P', 'SOL_Se_As_A_L_Othr_P', 'SOL_Aus_Indig_Lang_P', 
                    'SOL_In_Ar_Lang_Othr_P', 'SOL_In_Ar_Lang_Tot_P', 'SOL_Se_As_A_L_Tot_P', 
                    'Language_spoken_home_ns_P', 'SOL_Tot_P', 'Total_P', 
                    'SOL_Chin_lang_Mand_P', 'SOL_Chin_lang_Other_P', 'SOL_Chin_lang_Cant_P']
    
    ext_data = ext_data.drop(drop_columns, axis = 1)
    lang_tot = ext_data.sum(axis = 0)
    
    columns = []
    for index in lang_tot.index:
        idx = index.split('_')
        if 'Se_As' in index or 'In_Ar' in index or 'Ir_Lang' in index:
            columns.append(idx[-2])
        elif 'Ir_La' in index:
            columns.append(idx[3])
        else:
            columns.append(idx[1])

    lang_tot.index = columns
    lang_data = pd.DataFrame(lang_tot, columns = ['count']).T
    lang_data = lang_data.rename({'Pe' : 'Persian'}, axis = 1).T
    lang_data['percentage_SOL'] = lang_data['count']/SOL_tot * 100
    lang_data['percentage_Total'] = lang_data['count']/tot * 100

    langCode = read_langCode(langCode_path)
    langdict = {k:v for v in langCode.values() for k in lang_data.index if k in v}

    idx = []
    for i in lang_data.index:
        name = langdict[i]
        idx.append(name)

    lang_data.index = idx
    lang_data = lang_data.sort_values(by = ['count'], ascending = False)[:N]

    return lang_data.index, lang_data.count.values, lang_data.percentage_SOL.values, lang_data.percentage_Total.values, SOL_perc


def topic_switch(topic):
    """
    params: topic of selection
    return: paths to views relating to the selected topic 
    """

    if topic == 'housing':
        count_view = 'text/housing-count'
        topic_view = 'text/housing'
    if topic == 'transportation':
        count_view = 'text/transportation-count'
        topic_view = 'text/transportation'
    if topic == 'cost':
        count_view = 'text/cost-count'
        topic_view = 'text/cost'

    """
    for use with test db

    # if topic == 'housing':
    #     count_view = 'geo-test/text-housing-count'
    #     topic_view = 'geo-test/text-housing'
    # if topic == 'transportation':
    #     count_view = 'geo-text/text-transportation-count'
    #     topic_view = 'geo-text/text-transportation'
    # if topic == 'cost':
    #     count_view = 'geo-test/text-cost-count'
    #     topic_view = 'geo-test/text-cost'
    """
    return count_view, topic_view


def trend_per_topic(db, topic):
    """
    Extract the number and percentage of tweets on the selected topic made each year
    params: raw_tweets database;
            the topic of selection
    return:  
    return type: dict - {year : number of tweets on the selected topic made in that year}
                 dict - {year : total number of tweets made in that year}
                 dict - {year : percentage of tweets on selected topic over total number of tweets made in that year}
    render: bar charts/line graphs
    """

    #db = testdb
    count_view, _ = topic_switch(topic)
    
    year_topic = {}
    year_total = {}
    percent = {}

    for item in db.view(count_view, group = True, group_level = 1):
        year_topic[item.key] = item.value

    for item in db.view('time/by-year-count', group = True, group_level = 1):
        year_total[item.key] = item.value

    for key in year_topic.keys():
        if key in year_total.keys():
            percent[key] = year_topic[key]/year_total[key] * 100
            
    return year_topic, year_total, percent


def topic_wordcloud(db, topic):
    """
    Extract topic related wordcloud
    params: raw_tweets database;
            topic of selection
    return: corpus of combined tweets on the selected topic indexed by year; 
            all words in lowercases
    return type: dict - {year : corpus}
    render: wordcloud
    """

    _, topic_view = topic_switch(topic)

    yearly_tweets = defaultdict(list)
    for item in db.view(topic_view):
        yearly_tweets[item.key].append(item.value)
    
    tokenizer = TweetTokenizer()
    
    for key, tweet in yearly_tweets.items():
        tweet = [' '.join(re.sub("(@[A-Za-z0-9\_]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",t).split()) for t in tweet]
        tweet = [' '.join(tweet)]
        tweet_tokens = tokenizer.tokenize(tweet[0])
        tweet_clean = []
        for word in tweet_tokens:
            if word.lower() not in stopwords.words('english') and word.lower() not in string.punctuation:
                tweet_clean.append(word.lower())
                
        yearly_tweets[key] = ' '.join(tweet_clean)
    
    return yearly_tweets



