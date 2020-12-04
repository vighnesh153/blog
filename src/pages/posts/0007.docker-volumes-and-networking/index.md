---
title: "Docker: Volumes and Networking"
date: 2020-12-04 12:45
image: "./root-image.png"
description: "In this post, I discuss about what volumes and bind-mounts are in docker and also, how a container can communicate with the world."
tags:
- Docker
---

## Volumes

Volumes are a way to store, connect or map the
data from the container to the host machine.

#### Anonymous volume
How to create?
* `-v /app/src` flag with docker run
* `VOLUME [ "/app/src" ]` in docker file

Not used usually because when we create a new
container, a new anonymous volume will be created
and we won't have the data from the previous
container's volume.

#### Named volume
How to create?
* `-v src:/app/src` flag with docker run

It will create a mapping of `/app/src` in the
container to the `src` name in the host machine.
The path of the volume on the host machine will
be the default path of volumes in the docker.

And if we specify the same name `src` for multiple
containers, they will access the same volume on
then host machine.

#### Bind Mounts
How to create?
* `-v /absolute/path/to/dir/in/host/src:/app/src` with docker run

It's functionality is same as that of a Named volume,
but in this case, we will know exactly where the volume
is in our local system. We can use this to listen to
the code changes on our system and have a watch mode
setup in the container to re-build the changes.

### Metadata of volumes

#### To list all volumes
```shell
$ docker volume ls
```

#### Information of volumes
```shell
$ docker volume inspect <VOLUME-HASH>
$ docker volume inspect <VOLUME-NAME>
```

### Ignore files when copying
Create a `.dockerignore` file. It is similar to the
`.gitignore` file. When we run `COPY . .` in our
Dockerfile, docker won't copy files mentioned in the
`.dockerignore` file.

Sample .dockerignore
```gitignore
node_modules/

Dockerfile

.git/

.env
```

### Environment variables
Using environment variables
```dockerfile
EXPOSE $PORT
```

#### Setting Environment variables In a Dockerfile
```dockerfile
ENV PORT 80
```
#### Setting Environment variables In CLI
```shell
$ docker run -d -p 3000:4242 -e PORT=4242 some-image
```
#### Read Environment Variables from a .env file
```shell
$ docker run -d -p 3000:4242 --env-file ./.env some-image
```

### Arguments
Arguments are build time arguments that can be used
inside the Dockerfile.

```dockerfile

ARG DEFAULT_PORT=4224

ENV PORT $DEFAULT_PORT

```

Usage:
```shell
$ docker build --build-arg DEFAULT_PORT=9999 .
# port will be 9999

$ docker build .
# port will be 4224
```


## Networking

### Requests to World Wide Web
This works out-of-the-box inside a container.

### Request to services running on host machine
Replace `localhost` with `host.docker.internal`.
Docker translates `host.docker.internal` to the IP
address of the container's host machine as seen
from inside the container.

### Requests to another container
There are multiple ways to do this
1. We can use `docker container inspect <CONTAINER-ID>`
   to get the IP of the container and use that instead
   of `localhost`.
1. Bind all containers to ports on the host machine
   and use `host.docker.internal` to communicate. But
   this will consume the ports of the host machine.
1. A better way would be to use docker networks
* Create a network
  ```shell
  $ docker network create my-network
  ```
* List all network
  ```shell
  $ docker network ls
  ```
* Create/Run all containers with the network
  specified. And then, use the names of the
  containers in-place of `localhost` to
  communicate with that container.
  ```shell
  $ docker run -d --rm --network my-network <SOME-IMAGE>
  ```

### Docker network drivers
Docker Networks actually support different kinds of
"**Drivers**" which influence the behavior of the Network.

The default driver is the "**bridge**" driver -
Containers can find each other by name if they are
in the same Network.

The driver can be set when a Network is created, simply by
adding the `--driver` option.

```shell
$ docker network create --driver bridge my-net
```

*Of course, if you want to use the "**bridge**" driver,
you can simply omit the entire option since "**bridge**"
is the default anyways.*

Docker also supports these alternative drivers -
though you will use the "**bridge**" driver in most cases:

* **host**: For standalone containers, isolation between
  container and host system is removed (i.e. they share
  localhost as a network)

* **overlay**: Multiple Docker daemons (i.e. Docker running
  on different machines) are able to connect with each other.
  Only works in "**Swarm**" mode which is a dated / almost
  deprecated way of connecting multiple containers

* **macvlan**: You can set a custom MAC address to a container -
  this address can then be used for communication with that container

* **none**: All networking is disabled.

Third-party plugins: You can install third-party plugins which
then may add all kinds of behaviors and functionalities.

