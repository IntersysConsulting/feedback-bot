@echo off

call npm install
SETLOCAL
SET PATH=node_modules\.bin;node_modules\hubot\node_modules\.bin;%PATH%
SET HUBOT_ADAPTER=slack
SET HUBOT_SLACK_TOKEN=fill-please

node_modules\.bin\hubot.cmd --name "intersys-mdc-hubot" %* 
