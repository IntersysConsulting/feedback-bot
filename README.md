How to run in windows 

change the name of the file config-tamplate.json by config.json

Fill the informarion required in the JSON (roomId)

In power shell run this commands (adding your slack token):

```powershell
[Environment]::SetEnvironmentVariable("HUBOT_ADAPTER", "slack")
[Environment]::SetEnvironmentVariable("HUBOT_SLACK_TOKEN", "")

bin/hubot
```

Run with Docker 

Build
```powershell
docker build -t hubot .
```

Run
```powershell
docker run -it --rm -p 8081:8080 --env HUBOT_SLACK_TOKEN="Slack Token" hubot
```

If you want to use a volume just run:
```powershell
docker run -it --rm -p 8081:8080 -v $pwd/scrips:/app/scripts --env HUBOT_SLACK_TOKEN="Slack Token" hubot
```