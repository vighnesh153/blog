---
title: "Manual Docker Deployment to EC2"
date: 2020-12-05 20:41
image: "./root-image.png"
description: "In this post, I discuss about how to deploy a docker image/container to AWS EC2 instance."
tags:
- Docker
- AWS
- EC2
---

### Manual deployment on EC2
* Create a new repository in docker hub to push your images.
* In the code directory
```shell
$ docker build -t <USERNAME/REPOSITORY-NAME:TAG> .
$ docker push <USERNAME/REPOSITORY-NAME:TAG>
```
* SSH into the EC2 instance, and run the following commands

```shell
$ sudo nano /etc/environment
# Paste the following:
#
# LC_ALL="en_US.UTF-8"
# LC_CTYPE="en_US.UTF-8"

$ sudo reboot

$ sudo yum update -y

$ sudo amazon-linux-extras install docker

$ sudo service docker start

$ sudo docker run -d --rm -p 80:80 <USERNAME/REPOSITORY-NAME:TAG>
# the app is now running on the instance on port 80
```

* Open the EC2 instance to accept http requests from the world
  - Go to the instances page
  - Check your instance
  - Scroll down and select the `Security` tab which is beside the
     `Details` (default selected) tab.
  - Click the top most security group.
  - Select the `Inbound Rules` tab and click `edit`.
  - Add new, and set type to `Http` rule and set source to `Anywhere` and then `save`.
  - Go to the instances table again and for your instance, either copy the
     `Public IPv4 DNS` value or the `Public IPv4 address` value and test your app on that
     URL.
   
--- 

This approach is not bad and certainly one can use this. But, keep in
mind that by doing this, we need to manage the security, scaling and 
many other things too. I am not an expert in DevOps and if you are not 
too, then believe me, it can be very easy to mis-configure this which 
might lead to excess costs and/or someone might just abuse our service.

There are other Manages Services provided by `AWS` like the `AWS ECS` with 
`AWS Fargate` and the second one is the `AWS EKS`. These two have a lot of 
configuration options and discussing about them in a blog is a bit 
difficult for me. I will, somehow, manage to write a blog about them 
sometime in the future that will at least help you get started with 
them. Meanwhile, you can visit [Containers on AWS](https://aws.amazon.com/containers/) 
to learn more about them.

I hope you liked the post and feel free to share your thoughts in the 
comments section below.
