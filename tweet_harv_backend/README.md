# Getting Started with Django Backend

## Installation and Configuration
### Linux && Windows
1. ```cd tweet_harv_backend```
2. ```python -m venv venv```
3. ```cd venv```
4. ```cd Scripts```
5. ```activate```
6. ```pip install -r requirements.txt```
7. ```python manage.py runserver```

### Generate requirements.txt
1. ```pip freeze > requirements.txt```

## Project Structure
```yaml
/index django app
    - dataAnalysis.py  
      - functions to analyze data from CouchDB
    - database.py  
      - connect to CouchDB
    - urls.py  
      - provide url to views
    - views.py  
      - render and format data
/tweet_harv_backend project
    - urls.py  
      - provide url
    - settings.py  
      - configurations
```
### API
| Urls                                   | Request Method | Views                          |
| -------------------------------------- | -------------- | ------------------------------ |
| /index/hashtag/                        | GET            | hashtag                        |
| /index/opportunity/language_count/     | GET            | language_count                 |
| /index/opportunity/birth_country/      | GET            | birth_country                  |
| /index/opportunity/language_home/      | GET            | language_at_home               |
| /index/opportunity/percent/            | GET            | percent                        |
| /index/housing/trend_sentiment/        | GET            | housing_trend_sentiment        |
| /index/housing/content/                | GET            | housing_content                |
| /index/housing/price/                  | GET            | housing_price                  |
| /index/cost/trend_sentiment/           | GET            | cost_trend_sentiment           |
| /index/cost/content/                   | GET            | cost_content                   |
| /index/transportation/trend_sentiment/ | GET            | transportation_trend_sentiment |
| /index/transportation/content/         | GET            | transportation_content         |
| /index/map                             | GET            | geojson_map                    |

## Reference
[Django Documentation](https://docs.djangoproject.com/en/4.0/)

[Compose and Django](https://docs.docker.com/samples/django/)

[Python connect to CouchDB](https://couchdb-python.readthedocs.io/en/latest/)

[Cross Origin Resource Sharing](https://pypi.org/project/django-cors-headers/)

[Django Rest Framework](https://pypi.org/project/django-cors-headers/)