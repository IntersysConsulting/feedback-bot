FROM node:8.9
WORKDIR /app
COPY package.json /app
RUN npm install -g hubot coffee-script
RUN npm install
COPY . /app
ENV HUBOT_ADAPTER=slack
CMD bin/hubot
EXPOSE 8080