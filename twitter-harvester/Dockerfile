FROM python:latest

WORKDIR /usr/src/app
COPY . /usr/src/app

# set python environment variable
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD [ "python", "main.py"]
