---
title: "NodeJS: Scalable Image Upload to S3"
date: 2020-12-01 10:33
image: "./root-image.png"
description: "In this post, I discuss how to upload image to S3 in Node JS in a scalable way."
tags:
- Node JS
- AWS
- S3
---

> This approach will work with almost all types of files by doing some 
  small tweaks.

Having an app that has image uploads features is quite common, these days. 
And in other languages like Java, C++, golang, you might find direct 
library to upload images directly to S3. However, in NodeJS, this requires 
a few lines to code to get set up.

There are multiple ways to upload files to S3. The popular way, that you 
see in many online tutorials is the 2-hop approach. What happens here is 
that we upload the image to the server first, then, we upload the image to 
S3 from the server. The benefit of this approach, that people claim, is that 
this approach is easy and handling authorization is also simple. That may 
be true, but there is also one downside to this approach. When you upload 
an image to Node Server, it almost consumes around 10% of the CPU usage 
of the machine. So, one server would only be able to handle around 5-8 
image uploads at a given moment. This is not good. If we have thousands of 
users, heck even hundreds of users, we have to host a lot of servers 
just to support a single image-upload functionality. This will certainly 
drain your pocket.

<br>

Instead of a 2-hop approach, we are going to let users upload files to S3 
directly. But then anyone would be able to upload a file to S3, right? 
Not exactly. Let me first explain the flow.
* User lets our server know that he/she is going to upload a file. User 
  also sends the metadata of the file to be uploaded.
* Server then decides if the users should be allowed to upload or not. If 
  yes, then the server forwards the request to S3, and S3 sends back a 
  `pre-signed URL` back to the server. This URL has all the information of the 
  file, with the help of metadata, like the name of the file, bucket to 
  upload the file, signature, Access Key Id, Url expiry time, etc.
* The server then replies to the client with the pre-signed URL.
* The client now directly uploads the file to the pre-signed URL.

The pros of this approach are
* Write access to the bucket is turned off and a pre-signed URL has a 
  temporary write access to the bucket.
* The pre-signed URL can only be generated if a secret key is passed and 
  only our server has the secret key. So, only our server can create a 
  pre-signed URL.
* To restrict users from uploading unlimited files, we can add 
  rate-limiting to the endpoint that initiates the pre-signed URL generation 
  request.

<br>

Lets see this in action.


### Preparing the front end
We are using react js, but this approach will work with any JS framework 
or even Vanilla JS.

```js
function ImageUpload() {
  const [file, setFile] = useState(null);
  
  const uploadFile = async () => {
    // To be filled later
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <React.Fragment>
      <h6>Add an image</h6>
      <input 
        onChange={handleFileChange}
        type="file" 
        accept="image/*" 
      />
      <button onClick="uploadFile">Upload</button>
    </React.Fragment>
  );
}
```

<br> 

### Acquiring AWS Credentials
* Sign in to [AWS Console](https://console.aws.amazon.com/).
* Go to [S3 Bucket service](https://s3.console.aws.amazon.com/).
* Create a bucket with default selected, i.e., block all public access, if asked.
* In a new tab, go to [IAM service](https://console.aws.amazon.com/iam)
* In the left sidebar, under `Access Management`, 
  click on [Policies](https://console.aws.amazon.com/iam/home?#/policies).
* Click [Create Policy](https://console.aws.amazon.com/iam/home?#/policies$new?step=edit)
* In the `Visual editor` tab, select the following: 
    - Service - S3
    - Actions - Check all S3 actions (You can fine grain later, when deploying to prod)
    - Resources (Expand the tab)
        * bucket - Click `Add ARN` -> Enter the bucket name -> Click Add
        * object - Click `Add ARN` -> Enter bucket name and for `object name`, check the `Any` checkbox -> Click Add
* Click `Review Policy`, choose name, and then click`Create policy`.
* The policy that we created above, allows IAM users to perform actions in 
  the specified bucket.
* We will now create a new user for our application. 
* In the left sidebar, under `Access Management`, 
  click on [Users](https://console.aws.amazon.com/iam/home?#/users).
* Give a name, check only `Programmatic access` checkbox and click 
  `Next:Permissions`.
* Select `Attach existing policies directly` tab and check our 
  created policy.
* Click `Next:Tags` (we don't need any tags) -> `Next:Review` -> `Create user`.
* You will be presented with a screen that shows your `Access Key Id` and 
  `Secret Access Key`. Note them down and make sure you don't expose them.

There you have it. Your AWS S3 credentials.

> There are a lot more configurations that you can do to fine grain the 
  security like setting the `Source IPs` and limiting S3 access in the 
  policy depending on the permissions you need. This is just a bare 
  minimum config that we need. And, it is recommended that you don't skip
  the other configurations when generating keys for production. Learn 
  more about how to manage access to S3 
  [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-walkthroughs-managing-access.html). 

<br>

### Server setup
* Install [aws-sdk](https://www.npmjs.com/package/aws-sdk).
```shell
$ npm install aws-sdk uuid
```
* Sample Code (Assuming you have setup express)

```js
const AWS = require("aws-sdk");
const uuid = require("uuid/v1");

// Set the values of "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" 
// in the environment

const bucketRegion = 'ap-south-1';        // your bucket region
const bucketName = "<YOUR-BUCKET-NAME>";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',   
    region: bucketRegion,
});

app.post("/api/upload", (req, res) => {
  // Authorization checks if needed
  let not_allowed = true;  // Maybe have a middleware
  if (not_allowed) {
    return res.sendStatus(403);
  }
  
  const { fileType } = req.body;

  // Identifier for your image 
  const imageIdentifier = `images/${uuid()}`;

  const params = {
    Bucket: bucketName,
    ContentType: fileType,
    Expires: 60,
    Key: imageIdentifier,
  };

  s3.getSignedUrl('putObject', params, (err, signedURL) => {
    if (err) {
      return res.status(500).json({
        error: "Couldn't create signed URL.",
      });
    }

    res.json({ imageIdentifier, signedURL });
  });
});
```

### Bucket CORS config
* Go to your `YOUR-BUCKET` and select the `Permissions` tab.
* In the `Permissions` tab, you will find a `CORS` section. 
* Edit that and add the following JSON
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```
> In production, do change the `AllowedOrigins` to your frontend host's 
  IP or URL and remove the "*", so that you have some CORS 
  protection enabled.


<br>

### Continuing with the frontend
```js
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const uploadFile = async () => {
    const { data } = await axios.post("/api/upload", { 
      fileType: file.type 
    });
    
    // Name of the file in S3
    const imageIdentifier = data.imageIdentifier;
    
    // The signed URL
    const signedURL = data.signedURL;
    
    // Upload image directly to S3
    await axios.put(signedURL, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    const bucketName = "<YOUR-BUCKET-NAME>";
    const bucketRegion = "<YOUR-BUCKET-REGION>";
    
    // URL of the image
    const imageURL = 
            `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/` + 
            imageIdentifier;
    
    // Save the path of the image in some DB
  };
  
  return (
    <React.Fragment>
      <h6>Add an image</h6>
      <input 
        onChange={handleFileChange}
        type="file" 
        accept="image/*" 
      />
      <button onClick="uploadFile">Upload</button>
    </React.Fragment>
  );
}
```

<br>

So we finally setup uploading of images to the S3 bucket. This approach 
is scalable and also the authorization of users to upload files can 
be implemented very easily as a middleware in the route. 

<br>

### Public image access through URL 

One thing that is left is that the bucket's public access is locked. So, 
even if we upload the images, we won't be able to view them with their URL. 
So, we are going to give our bucket, a public GET policy, so that anyone 
can view the images in the S3. To do that, 
* Go to `<BUCKET-NAME>` -> `Permissions` tab and navigate to `Bucket Policy`
* Click on the `Policy Generator`
* Set the following choices:
  - Type of Policy: S3 Bucket Policy
  - Effect: Allow
  - Principal: `*`
  - AWS Service: Amazon S3
  - Actions: check `GetObject`
  - Amazon Resource Name (ARN): `arn:aws:s3:::<YOUR-BUCKET-NAME>/*`
* Click `Add Statement` and then `Generate Policy`.
* Copy the Policy code and paste it into your bucket's policy text field.
  
Now, anyone can view the image by visiting the image's URL


## Conclusion
We learnt how we can upload images to S3 in Node JS in a scalable and 
secure way. The main idea of this post was to focus on security and 
scalability of image uploads to S3. Our uploaded images can be viewed by 
anyone if they have the URL. Restricting the access to view images based 
on user, would require a dedicated blog to that. Also, our images are 
directly viewed from S3, which is not bad, but is a bit slow. We can 
add a `Cloudfront` service to serve the images from our bucket. That 
way, we can benefit from the Amazon's CDN servers from across the world 
to serve our images very fast. And if you want to explore how to restrict 
visiting images through URL to user, then you can look into adding 
`Lambda@Edge` functions. These functions are deployed in the Edge nodes, 
i.e., the CDN servers, and when someone requests to view an image, our 
`CloudFront` service will first call the `Lambda@Edge` function to check 
if the user can access it or not. We will just have to implement the 
`Lambda@Edge` function and connect it to `CloudFront`. If we use 
`AWS Cognito`, then our work is reduced even further.

<br>

I hope this post helped you to implement image uploads in a node
application in a scalable and secure way. Feel free to share your 
thoughts in the comment section below.
