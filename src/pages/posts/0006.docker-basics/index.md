---
title: "Docker Basics"
date: 2020-12-02 08:33
image: "./root-image.png"
description: "In this post, I discuss what docker is and how to use it along with Docker images and containers."
tags:
- Docker
---

### What is Docker?

Docker is a container technology: A tool for creating
and managing containers.

> Container is a standardized unit of software. A
package of code and a set of dependencies, requied to
run that code.

The same container always yields the exact same
application and execution behavior, no matter where
or by whom it might be executed.


### Why Containers?

We often have different environments for development
and production. Also, if multiple developers are working
on a same project, then it is common to forget about
some dependency or environment variable or installing
different version of a dependency, etc. Not just while,
development, it is also possible that this issue comes
in production as well. You might have also heard the
phrase, ***"It works on my machine!"***, a lot.

To avoid all these kinds of conflicts, containers were
born.


### Virtual Machines vs Docker Containers

Docker Containers are kind of like Virtual machines, but
a lot lot light weight. Virtual machines have a lot of
overhead like GUI, RAM usage, ROM Usage, Power
consumption, and a lot more CPU consumption to run a
single machine. A rough comparison, on a standard
machine, we can run 2-3 virtual machines
simultaneously, or we could run around 10-30 different
containers simultaneously.


### Docker Images

Images are the actual bundled code and dependencies and
can be used as Template for the container. For reference,
you can think of Docker image as a Virtual machine's
image that we use to install a Virtual Machine.

Key takeaways:
* Images do not run themselves, instead, they can be
  executed as containers.
* Images are either pre-built (e.g. official Images
  you find on DockerHub) or you build your own
  Images by defining a Dockerfile.


### Installing Docker

There is no standard way to install Docker on Linux,
Windows, or Mac and even different versions of the OS.
So, please follow
[this](https://docs.docker.com/get-docker/) link to
install docker on your machine and come back once you
are sure that docker is configured and running
correctly.

To check if docker is configured and running,
```shell
$ docker run hello-world
```

> If your system doesn't meet the docker requirements,
then you can use the
[Online Playground](https://labs.play-with-docker.com/)
to learn docker.


### Dockerfile

A file that is used to build a Docker image.

Example: Creating a Dockerfile for a mongodb from 
scratch 
```Dockerfile
# step 1: Setup OS from a base image
FROM alpine



# step 2: Install software
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

RUN apk update
RUN apk add mongodb=3.4.4-r0



# step 2.5: Configure software
# basically, mkdir -p /data/db, but this is persistent.
# We can attach to this volume from different container as well.
# https://stackoverflow.com/questions/34809646/what-is-the-purpose-of-volume-in-dockerfile
VOLUME [ "/data/db" ]

# set the current working directory to /data
WORKDIR /data

# expose
EXPOSE 27017


# step 3: Set default commands
CMD [ "mongod" ]



# Docker ignore
# Create a .dockerignore file in the same directory to add files and directories to that.
# These files won't be considered by docker for any purpose.
```

Sample `Dockerfile` for a Node.js app:
```Dockerfile
# Base image for our image (alpine versions should 
# be used to reduce the image size)
FROM node:14


# Set the working directory for our app. 
# Default is the root directory.
WORKDIR /app


# We do this first because docker does caching at
# all layers and if docker detects that the layer has 
# not changed, then it uses artifacts from the cache
# which was created during the previous run.
COPY package.json /app
COPY package-lock.json /app


# Install all the dependencies.
# RUN command runs the specified instructions 
# when creating the image.
RUN npm install


# Copy all the project files to the working 
# directory in our image.
COPY . /app


# Our app is running on port 3030. This 
# exposes the container's 3030 port to the 
# outside world
EXPOSE 3030


# A command that will run our server file. 
# CMD is used when we want the command to 
# run when the container is running and 
# not while creating the image.
# A Docker should have exactly one CMD command.
CMD [ "node", "app.js" ]
```


### Key Docker commands

|Table of contents|
|:---------------:|
|[Build image](#build-an-image)|
|[Run an image](#run-a-docker-image)|
|[Tag an image](#tag-an-image)|
|[List all locally stored images](#list-all-locally-stored-images)|
|[Remove an image](#remove-an-image)|
|[Remove all images](#remove-all-images)|
|[Start a container](#start-a-container)|
|[Stop a container](#stop-a-container)|
|[Stop all containers](#stop-all-containers)|
|[List all containers](#list-all-containers)|
|[Remove a container](#remove-container)|
|[Remove all containers](#remove-all-containers)|
|[Push image to a registry](#push-image-to-a-registry)|
|[Pull image from a registry](#pull-an-image-from-the-registry)|


#### Build an image
```shell
$ docker build .
# `.` is the directory that contains the 
# Dockerfile.
```

Options:
* `-t NAME:TAG` : Assign a `NAME` and a 
    `TAG` to an image

Examples:
* `docker build -t username/friendlyhello:tag .`


#### Run a Docker image
```shell
$ docker run <IMAGE-NAME>
```

Options:
* `--name NAME` : Assign a `NAME` to the 
  container.
* `-d` : Run the container in **detached** 
  mode.
* `-it` : Run the container in **interactive** 
  mode and enable **TTY**.
* `--rm` : Automatically **remove** the 
  container when it's stopped.


#### Tag an image
```shell
$ docker tag <image> username/repository:tag
```


#### List all locally stored images
```shell
$ docker image ls
```


#### Remove an image
```shell
$ docker image rm <IMAGE-ID>
$ docker image rm <IMAGE-NAME>
```


#### Remove all images
```shell
$ docker image prune
# Removes all dangling images (untagged images)

$ docker image rm $(docker image ls -a -q)
# Remove all images
```

Options:
* `-a` : Remove all locally stored images



#### Start a container
```shell
$ docker start <CONTAINER-ID>
$ docker start <CONTAINER-NAME>
```


#### Stop a container
```shell
$ docker stop <CONTAINER-ID>
$ docker stop <CONTAINER-NAME>

$ docker container kill <CONTAINER-ID>
# Force shutdown of the specified container
```


#### Stop all containers
```shell
$ docker container stop $(docker container ls -a -q)
```


#### List all containers
```shell
$ docker container ls
```

Options:
* `-a` : List all containers - including
  **stopped** ones.


#### Remove container
```shell
$ docker container rm <CONTAINER-ID>
$ docker container rm <CONTAINER-NAME>
```


#### Remove all containers
```shell
$ docker container prune
# Remove all stopped containers

$ docker container rm $(docker container ls -a -q)
# remove all containers
```


#### Push image to a registry
```shell
$ docker push IMAGE
# Push an image to DockerHub (or another 
# registry) - the image name/tag must 
# include the repository name/ url
```


#### Pull an image from the registry
```shell
$ docker pull IMAGE
# this is done automatically if you just 
# `docker run IMAGE` and the image wasn't 
# pulled before.
```


I hope this post helped you understand basics of 
docker. Feel free to share your thoughts in the 
comment section below.
