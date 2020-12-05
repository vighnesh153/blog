---
title: "Docker Compose"
date: 2020-12-05 07:49
image: "./root-image.png"
description: "In this post, I discuss about how to easily manage multiple containers using docker-compose."
tags:
- Docker
---

`Docker Compose` is a tool for defining and running multi-container Docker
applications. With Compose, you use a YAML file to configure your
application’s services. Then, with a single command, you create and
start all the services from your configuration.


#### Installation
Check this link: [Docker Compose Install](https://docs.docker.com/compose/install/)


#### Verify installation
In the terminal,
```shell
$ docker-compose --version
```

#### Sample
Create a `docker-compose.yaml` file, usually in the root of the project.
```yaml
# version of docker-compose we want to use
version: 3.8  

# a service is nothing but a container specification
# on how it should work and some configurations.
services:

  my_mongo_db:
    # Docker generates the container name based on this
    # format: project-dir-name_service-name_lowest-number-available.
    # We can override this by specifying a container_name.
    container_name: my_mongo_db

    # use the following image for this container
    image: "mongo:latest"

    volumes: 
      # named volume
      - data:/data/db
      
      # for a bind-mount, we can use a relative 
      # path for the host directory
    
    environment: 
      SOME_VARIABLE: SOME_VALUE
    
    # or, use an env file for environment variables
    env_file: 
      - ./.env

    # we don't need to do this because docker-compose
    # automatically adds all services to a network 
    # which is managed by itself.
    networks:
      - my-network

    # We can have some settings defined in other 
    # file and use them as a base for our 
    # current service. Can be used when we want 
    # to separate the `prod` and `dev` files
    # but have many things in common.
    extends:
      file: ./docker-compose.common.yml
      service: my_mongodb
    

    # Same as providing `-it` to `docker run` command.
    # Not needed for `mongodb`, but adding it here for reference.
    # However, React dev server, running on docker, needs it.
    stdin_open: true
    tty: true


  my_server:
    # This service won't be started until `my_mongo_db` 
    # is up and running
    depends_on: 
      - my_mongo_db

    # We can specify the image like above for our backend, but we 
    # can even skip the build step. Specify the path to the directory
    # which has your entire project (expecting to have the Dockerfile)
    # in the root directory
    build: ./server

    # or, a more detailed object
    build: 
      # dockerfile: Dockerfile-dev
      dockerfile: Dockerfile

      # the context should contain the folder that the Dockerfile can reference.
      # For eg. if in the Dockerfile, we try to access some content, outside of the 
      # `server` directory, that won't work. To make that work, we need to specify the
      # Least-Common-Ancestor directory of all the paths, we can possibly visit from 
      # within the Dockerfile
      context: ./server
      
      # Build args for Dockerfile
      args:
        SOME_ARG: 1
    
    ports: 
      # host_port:container_port
      - "3000:3000"
    
    volumes:
      - logs:/app/logs
      - ./backend:/app



# When we use named volumes, we need to specify it 
# as the following (it is not a syntax error, 
# docker-compose wants it this way) so that 
# the volume can be used across multiple services.
volumes: 
  data:
  logs:

# Bind-mounts and Anonymous volumes need not 
# be added in the above array.

```

> When we create a service like `my_mongo_db`,
the name of the container that will be created will
be `project-directory-name_my_mongo_db_1`, higher
numbers if the containers with same name and lower
numbers exist already. But the key thing is, when we
try to access the containers in other containers
with network requests, we can still use the
`my_mongo_db` name instead of the entire container
name. This is done by `docker-compose` for us.


#### To build images
This will build images for services that
have `build` property in yaml
```shell
$ docker-compose build
```


#### To spin up everything
```shell
$ docker-compose up
# opens, by default, in attached mode
# We can use CTRL+C to come out of the process 
# and stop all containers

$ docker-compose up service_1 service_2 service_4
# start only specific services

$ docker-compose up -d
# In detached mode

$ docker-compose up --build
# This way, we don't need to run `docker-compose build`
# before `docker-compose up` manually, if Dockerfile 
# or code changes
```

> `docker-compose up` runs the `docker-compose build` command
during the first run.

#### To stop everything
```shell
$ docker-compose down
# stop and removes all containers and removes the 
# created network

$ $ docker-compose down -v
# same as above plus `-v` removes all the volumes 
```


#### To start a specific service
Can be used for utility(helper) containers.
```shell
$ docker-compose run --rm my_mongo_db
```


### Conclusion

When we have more than 1 containers for our 
application, it is better to use docker-compose 
for managing all of them.

I hope this was helpful. Feel free to share your 
thoughts in the comments section below.
