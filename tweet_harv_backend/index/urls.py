from django.urls import path, include
from . import views

app_name = 'index'

urlpatterns = [
    path("hashtag/", views.hashtag),
    path("language_and_home/", views.language_and_birth),
    path("topic_trend/", views.trend),
    path("year_topic/", views.year_topic),
    path("year_sentiment/", views.sentiment),

]
