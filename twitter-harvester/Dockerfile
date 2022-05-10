FROM python:latest

WORKDIR /usr/src/app
COPY . /usr/src/app

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD [ "python", "main.py"]
