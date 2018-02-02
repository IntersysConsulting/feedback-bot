FROM node:7 
WORKDIR /app
COPY package.json /app
RUN npm install -g hubot coffee-script
RUN npm install
COPY . /app
ENV HUBOT_ADAPTER=slack 
ENV HUBOT_SLACK_TOKEN=xoxp- 
CMD bin/hubot
EXPOSE 8081