```
$ docker build -t node-example .
$ docker run -d -p 9000:9000 node-example node ./app.js
$ docker exec -it [container_id] /bin/bash
```