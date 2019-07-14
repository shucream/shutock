FROM ruby:2.5.3

RUN apt-get update -qq && \
    apt-get install -y build-essential \
                       libpq-dev

RUN mkdir /usr/src/shutock
ENV APP_ROOT /usr/src/shutock
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN gem install bundler -v 1.17.3
RUN bundle _1.17.3_ install
ADD . $APP_ROOT

EXPOSE 3000
ENTRYPOINT ["puma"]
