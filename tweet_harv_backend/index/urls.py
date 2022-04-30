from django.urls import path, include
from . import views

app_name = 'index'

urlpatterns = [
    path("hashtag/", views.hashtag),
    path("language_at_home/", views.lang_spoken_home),
    path("hashtag_top_n_birth_country/", views.hashtag_top_n_birth_country),
]
