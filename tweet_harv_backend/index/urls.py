from django.urls import path, include
from . import views

app_name = 'index'

urlpatterns = [
    path("hashtag/", views.hashtag),
    # path("opportunity/", views.language_and_birth),
    path("opportunity/language_count/", views.language_count),
    path("opportunity/birth_country/", views.birth_country),
    path("opportunity/language_home/", views.language_at_home),
    path('opportunity/percent/', views.percent),
    path("housing/trend_sentiment/", views.housing_trend_sentiment),
    path("housing/content/", views.housing_content),
    path("cost/trend_sentiment/", views.cost_trend_sentiment),
    path("cost/content/", views.cost_content),
    path("transportation/trend_sentiment/", views.transportation_trend_sentiment),
    path("transportation/content/", views.transportation_content),
    path("map/", views.geojson_map),
]
