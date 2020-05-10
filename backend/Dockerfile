FROM ruby:2.6.4
ENV LANG C.UTF-8
ENV TZ='Asia/Tokyo'

RUN apt-get update -qq && apt-get install -y build-essential nodejs
RUN gem install bundler
RUN mkdir /app

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install
COPY . /app