from django.urls import path, include
from . import views

app_name = 'index'

urlpatterns = [
    path("hashtag/", views.hashtag),
    path("opportunity/", views.language_and_birth),
    path("housing/trend_sentiment/", views.housing_trend_sentiment),
    path("housing/content/", views.housing_content),
    path("cost/trend_sentiment/", views.cost_trend_sentiment),
    path("cost/content/", views.cost_content),
    path("transportation/trend_sentiment/", views.transportation_trend_sentiment),
    path("transportation/content/", views.transportation_content),
    path("map/", views.geojson_map),
]
