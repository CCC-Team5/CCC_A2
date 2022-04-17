import numpy as np
import pandas as pd
import couchdb
from couchdb_settings import *


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


def now_trending(db):
    """
    params: raw_tweets database
    return: top 20 hashtags extracted from tweets made within last 14 days; 
            all hashtags in lowercases;
    return type: dict - {hashtag:count}
    render: wordcloud
    """
    
    hashtags = {}

    for item in db.view('hashtags/trending', group = True, group_level = 1):
        if item.key.lower() not in hashtags.keys():
            hashtags[item.key.lower()] = item.value
        else:
            hashtags[item.key.lower()] += item.value
        
    hashtags = {k: v for k, v in sorted(hashtags.items(), key=lambda item: item[1])[-20:]}

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
    params: raw_tweets database
    return: top N most tweeted languages
    return type: dict - {language code: count}
    render: 
    """

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
    params: census data download from AURIN - 'country_of_birth.csv'
    return: top N non-English-speaking countries' names, total population count, and percentage population
    return type: numpy array
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
    birth_country = birth_country.sort_values(by = ['country_total'], ascending = False)
    
    drop_columns = ['hong_kong_sar_china_p', 'born_elsewhere_p', 'tot_p', 'os_visitors_p', 'country_birth_not_stated_p', 'australia_p', 'new_zealand_p', 'united_states_america_p', 'united_kingdom_ci_im_p', 'fiji_p', 'south_africa_p']
    
    birth_country.loc['china_excl_sars_taiwan_p'] = birth_country.loc['china_excl_sars_taiwan_p'] + birth_country.loc['hong_kong_sar_china_p']
    birth_country = birth_country.T.drop(drop_columns, axis = 1).T[:N].T
    birth_country = birth_country.rename({'china_excl_sars_taiwan_p' : 'china_p', 'sri_lanka_p' : 'srilanka_p'}, axis = 1)
    
    country_names = []
    for item in birth_country.columns:
        item = item.split('_')
        country_names.append(item[0].capitalize())

    birth_country.columns = country_names
    birth_country = birth_country.rename({'Srilanka' : 'Sri Lanka'}, axis = 1).T

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