---
title: "Redis in NodeJS"
date: 2020-11-29 20:45
image: "./root-image.png"
description: "In this post, I discuss how to use redis in a node application."
tags:
  - Redis
  - Node JS
  - Caching
---

For each query on a server, it is not ideal to fetch data directly from 
the database because we may or may not have an Index for that type of 
query in the DB which may cause the full-scan of the db in the worst case.
So, we need to have some sort of server that will cache the 
responses for a type of query so that next time, the same query is 
requested, we can return the cached response.

Redis is a **in-memory**, **key-value** store which is mostly used for 
caching. In this post, we will see, how we can use **Redis** in a 
**Node** application.

### Prerequisites
* Install Node (either by NVM or global installation)
* Install and setup Docker.

### Installing Redis
Installing redis is not the same for all platforms. So, we are going to 
use docker to run redis on our machine.

```shell script
$ docker run -d -p 6379:6379 --name some-redis redis
```

This will start up the **Redis** server on port $6379$.

### Installing Redis package to interact with the Redis server
```shell script
$ npm install redis
```

### Using Redis in the application
* Storing and Retrieving values

```js
const redis = require("redis");

// Redis connection string
const redisUrl = process.env.REDIS_URL || `redis://localhost:6379`;
// In production, set the "REDIS_URL" environment variable for the redis server.

// Create a connection
const client = redis.createClient(redisUrl);

client.on("connect", () => {
  main();
});

const main = () => {
  // Setting a value
  client.set("hi", "there", redis.print);

  // To get the value
  client.get("hi", (err, value) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(value);
  });
};
```
<br>
* Using hashes

```js
const express = require("express");
const redis = require("redis");

// Redis connection string
const redisUrl = process.env.REDIS_URL || `redis://localhost:6379`;
// In production, set the "REDIS_URL" environment variable for the redis server.

// Create a connection
const client = redis.createClient(redisUrl);

client.on("connect", () => {
  main();
});

const main = () => {
  // Hash set
  // For "user" hash, the following sets 2 properties ["name", "website"]. 
  // You can set multiple key-values (Up to 3 pairs, max, I guess).
  client.hset("user", "name", "vighnesh", "website", "https://vighnesh153.com");

  client.hget("user", "name", redis.print);
  // Reply: vighnesh

  client.hgetall("user", (err, val) => {
      if (err) {console.log(err); return;}
      console.log(val);
  });
  // { name: 'vighnesh', website: 'https://vighnesh153.com' }
};
```
<br>
* Storing JS objects

```js
const express = require("express");
const redis = require("redis");

// Redis connection string
const redisUrl = process.env.REDIS_URL || `redis://localhost:6379`;
// In production, set the "REDIS_URL" environment variable for the redis server.

// Create a connection
const client = redis.createClient(redisUrl);

client.on("connect", () => {
  main();
});

const main = () => {
  // Storing object: We can only store strings or numbers in Redis store.
  client.set("me", JSON.stringify({ name: "Vighnesh", birthYear: "1998" }))

  client.get("me", (err, value) => {
    if (err) {console.log(err); return;}
    const me = JSON.parse(value);
    console.log(me);
  });
  // { name: 'Vighnesh', birthYear: '1998' }
};
```

### Cache Timeout or Expiry
```js
client.set("name", "vighnesh", "EX", 5);  // 5 seconds

// For 5 seconds, `client.get("name")` will resolve to "vighnesh", 
// and after 5 seconds, it will resolve to `null`.
```

### Clear cache
```js
// Clear a specific hash
client.del("key");

// Clear entire cache
client.flushall();
```


### Sample express app using Redis
```js
const util = require("util");

const express = require("express");
const app = express();

const redis = require("redis");
const redisUrl = process.env.REDIS_URL || `redis://localhost:6379`;
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);


app.get("/", async (req, res) => {
    const numbers = await client.get("numbers");
    if (numbers) {
        return res.json(JSON.parse(numbers));
    }

    // Simulate a delay of 5 seconds
    setTimeout(() => {
        const numbers = [1, 2, 3, 4, 5];
        res.json(numbers);
        client.set("numbers", JSON.stringify(numbers));
    }, 5000);
});


app.listen(4200, () => {
    console.log(`Listening on http://localhost:4200`);
});
```

<br><br>

I hope this post helped you to understand how to use redis in a node 
application. Feel free to share your thoughts in the comment 
section below.
