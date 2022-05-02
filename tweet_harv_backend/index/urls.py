from django.urls import path, include
from . import views

app_name = 'index'

urlpatterns = [
    path("hashtag/", views.hashtag),
    path("opportunity/", views.language_and_birth),
    path("housing/trend_sentiment/", views.housing_trend_sentiment),
]
