FROM python:3.13.2-alpine3.21

RUN apk update && apk upgrade && apk add bash


ENV VIRTUAL_ENV=./.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt /temp/requirements.txt
COPY ponchykBoy /ponchykBoy

WORKDIR /ponchykBoy

EXPOSE 8000

RUN apk add --update py3-pip
RUN pip install -r /temp/requirements.txt
RUN adduser --disabled-password ghoul

USER ghoul

# RUN python3 manage.py createsuperuser --username=ghoul_admn --email=ia.02guzbo@gmail.com

