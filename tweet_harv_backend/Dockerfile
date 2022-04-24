# Author
# yutianqi 1221167
# 2022/4/24 create docker file and set basic configuration
# Description: docker file for django backend


# syntax=docker/dockerfile:1

# get python3 environment
FROM python:3
# set domain name
ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000

# set python environment variable
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# create code directory and set it to work directory
RUN mkdir /code
WORKDIR /code

COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /code/

CMD [ "python3","manage.py","runserver","0.0.0.0:8000" ]