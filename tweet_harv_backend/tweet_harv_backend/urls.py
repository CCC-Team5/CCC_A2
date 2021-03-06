
"""

Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

Author:

Xinhao Chen 1230696 Melbourne
Weimin Ouyang 340438 Melbourne
Tianqi Yu 1221167 China
Junjie Xia 1045673 China
Yuling Zheng 954408 Melbourne


tweet_harv_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('index/', include('index.urls', namespace='index')),
]
