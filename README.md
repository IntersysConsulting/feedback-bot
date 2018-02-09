How to run in windows 

change the name of the file config-tamplate.json by config.json

Fill the informarion required in the JSON (roomId)

In [`hubot.cmd`](bin/hubot.cmd) file, please fill the **HUBOT_SLACK_TOKEN** with your slack token:

```
SET HUBOT_SLACK_TOKEN=00000-00000-000-000000-000000
```

And if you want to run it on powershell just run the next command:
```powershell
bin/hubot
```

Or if you want to use docker:

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
docker run -it --rm -p 8081:8080 -v $pwd/scripts:/app/scripts --env HUBOT_SLACK_TOKEN="Slack Token" hubot
```