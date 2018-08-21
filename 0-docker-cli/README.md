Is docker working?
```
$ docker run hello-world
```

Pull down and run latest (lts) ubuntu image
```
$ docker run ubuntu:latest
```

Enter ubuntu and explore the file system
```
$ docker run -it ubuntu:latest /bin/bash
$ cat /etc/*-release
```
