"""
Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

Author:

Xinhao Chen 1230696 Melbourne
Weimin Ouyang 340438 Melbourne
Tianqi Yu 1221167 China
Junjie Xia 1045673 China
Yuling Zheng 954408 Melbourne

ASGI config for tweet_harv_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tweet_harv_backend.settings')

application = get_asgi_application()
