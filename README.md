How to run in windows 

change the name of the file config-tamplate.json by config.json

Fill the informarion required in the JSON (roomId)

In power shell run this commands (adding you slack token):

[Environment]::SetEnvironmentVariable("HUBOT_ADAPTER", "slack")
[Environment]::SetEnvironmentVariable("HUBOT_SLACK_TOKEN", "")

bin/hubot