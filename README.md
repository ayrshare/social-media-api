# Social Media Posting and Scheduling APIs

<img src="https://www.ayrshare.com/wp-content/uploads/2020/08/ayr-logo-2156-reduced.png" width="400">

Social Post API is a wrapper SDK for [Ayrshare's APIs](https://www.ayrshare.com).

Ayrshare is a powerful set of APIs that enable you to send social media posts, get analytics, and add comments to *Twitter*, *Instagram*, *Facebook*, *LinkedIn*, *YouTube*, *Google My Business*, *Pinterest*, *TikTok*, *Reddit*, and *Telegram* on behalf of your users.

The Ayrshare API handles all the setup and maintenance for the social media networks. One API to rule them all (yeah, went there). See the full list of [full list of features](https://docs.ayrshare.com/rest-api/overview).

Get started with a [free plan](https://www.ayrshare.com/pricing), or if you have a platform or manage multiple users check out the [Business Plan](https://www.ayrshare.com/business-plan-for-multiple-users/).

For more information on setup, see our installation [video](https://youtu.be/WQTQmjvqvMM) or our [Quick Start Guide](https://docs.ayrshare.com/quick-start-guide).

## Installation

`npm i social-post-api`

## Setup

**1.** Create a free [Ayrshare account](https://app.ayrshare.com).

   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/2021/07/ayrshare-login.jpg)

**2.** Enable your social media accounts such as Twitter, Facebook, LinkedIn, Reddit, Instagram, Google My Business, or Telegram in the Ayrshare dashboard.

   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/2021/07/ayrshare-social-linkage-scaled.jpg)
  
**3.** Copy your API Key from the Ayrshare dashboard. Used for authentication.

   ![alt API Key](https://www.ayrshare.com/wp-content/uploads/2021/07/ayrshare-api-key-scaled.jpg)


## Getting Started

### Initialize Social Post API

Create a new Social Post object with your API Key.

``` javascript
const SocialPost = require("social-post-api");
const social = new SocialPost('Your API Key');
```

### History, Post, Delete Example

This simple example shows how to post an image or video, get history, and delete the post. This example assumes you have a free API key from [Ayrshare](https://www.ayrshare.com) and have enabled Twitter, Facebook Pages, Facebook Groups, Instagram, LinkedIn. Note, YouTube, Google My Business, Telegram, TikTok, and Reddit also available.

``` javascript
const SocialPost = require("social-post-api");
const API_KEY = "Your API Key"; // get an API Key at ayrshare.com
const social = new SocialPost(API_KEY);

const run = async () => {
  /** post */
  const post = await social.post({
    post: "Who you gonna call?",
    platforms: ["twitter", "facebook", "fbg", "instagram", "linkedin", "gmb"],
    mediaUrls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"]
  }).catch(console.error);
  console.log(post);

  /** history */
  const history = await social.history()
     .catch(console.error);
  console.log(history);

  /** delete */
  const deletePost = await social.delete({ id: post.id })
     .catch(console.error);
  console.log(deletePost);
};

run();
```


## API

### Post

Published a new post to the specified social networks either immediately or at scheduled future date. Returns a promise that resolves to an object containing the post ID and post status (success, error). See the [post endpoint](https://docs.ayrshare.com/rest-api/endpoints/post) for the full capabilities.

``` javascript
const postResponse = await social.post({
    // Required
    post: "Best post ever!",

    /** 
     * Required: Social media platforms to post. 
     * Accepts an array of strings with values: "facebook", "twitter", "instagram", "linkedin", "youtube", "gmb", "reddit", or "telegram".
     * YouTube requires a video and not shown in the example. See https://docs.ayrshare.com/rest-api/endpoints/post#youtube
     */
    platforms: ["twitter", "facebook", "fbg", "instagram", "linkedin", "gmb", "telegram"],

    // Optional: URLs of images or videos to include in the post
    mediaUrls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"],

    // Optional: Datetime to schedule a future post. 
    // Accepts an ISO-8601 UTC date time in format "YYYY-MM-DDThh:mm:ssZ". Example: 2021-07-08T12:30:00Z
    scheduleDate: "2020-08-07T15:17:00Z",

    // Optional: Shorten links in the post for all platforms similar to bit.ly.
    // Only URLS starting with http or https will be shortened. Default value: true.
    shortenLinks: true,

    // Optional for Business Plans, otherwise remove
    profileKeys: ["Profile API Key 1"];
  }).catch(console.error);
```

### Delete

Delete a post with a given post ID, obtained from the "post" response. Returns a promise with the delete status. Also, can bulk delete multiple IDs at once using the "bulk" key. See the [delete endpoint](https://docs.ayrshare.com/rest-api/endpoints/post#delete-a-post) for more details.

``` javascript
const deleteResponse = await social.delete({
    id: "POST ID",                          // optional, but required if "bulk" not present
    bulk: ["Post ID 1", "Post ID 2", ...]   // optional, but required if "id" not present
  }).catch(console.error);
```

### History

Get a history of all posts and their current status in descending order. Returns a promise that resolves to an array of post objects. See the [history endpoint](https://docs.ayrshare.com/rest-api/endpoints/history) for more details.

``` javascript
const historyResponse = await social.history({
  lastRecords: 10,    // optional: returns the last X number of history records
  lastDays: 30,       // optional: returns the last X number of days of history records. Defaults to 30 if not present.
}).catch(console.error);
```

Get history by post ID

``` javascript
const historyByIdResponse = await social.history({
  id: "pK0j89" // required: Ayrshare top level post ID
}).catch(console.error);
```

### Upload Media

Upload and store a new image. Returns a URL referencing the image. Can be used in "image_url" in "post". See the [media endpoint](https://docs.ayrshare.com/rest-api/endpoints/media) for more details.

``` javascript
const uploadResponse = await social.upload({
    // Required: The image as a Base64 encoded string. Example encoding: https://www.base64-image.de/
    file:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",

    // Optional
    fileName: "test.png",

    // Optional
    description: "best image"
}).catch(console.error);
```

### Get Media

Get all media URLS. Returns a promise that resolves to an array of URL objects. See the [media endpoint](https://docs.ayrshare.com/rest-api/endpoints/media) for more details.

``` javascript
const mediaResponse = await social.media().catch(console.error);
```

### User

Get data about the logged in user, such as post quota, used quota, active social networks, and created date. See the [user endpoint](https://docs.ayrshare.com/rest-api/endpoints/user) for more details.

``` javascript
const user = await social.user().catch(console.error);
```

### Shorten URL

Shorten a URL and return the shortened URL. See the [shorten endpoint](https://docs.ayrshare.com/rest-api/endpoints/shorten) for more details.

``` javascript
const shortenResponse = await social.shorten({
    // Required: URL to shorten
    url: "https://theURLtoShorten.com/whatmore",
  }).catch(console.error);
```

### Analytics

Get analytics on shortened links and shares, likes, shares, and impressions with for a post or at the accounts level. See the [analytics endpoint](https://docs.ayrshare.com/rest-api/endpoints/analytics) for more details.

``` javascript
const analyticsLinks = await social.analyticsLinks({
  // Optional range 1-7, default 1 day.
  lastDays: 3
}).catch(console.error);
```

``` javascript
const analyticsPost = await social.analyticsPost({
  id: "Post ID",
  platforms: ["twitter", "instagram", "facebook", "youtube", "linkedin"]
}).catch(console.error);
```

``` javascript
const analyticsSocial = await social.analyticsSocial({
  platforms: ["twitter", "instagram", "facebook", "youtube", "pinterest"]
}).catch(console.error);
```

### Post a Comment

Add a comment to a post. Currently only on Facebook and Instagram. See the [create comment endpoint](https://docs.ayrshare.com/rest-api/endpoints/comments#post-a-comment) for more details.

``` javascript
const postCommentResponse = await social.postComment({
    id: "Pkdo9sjk2", // required: Post top-level ID.
    platforms: ["instagram", "facebook"], // required: List of platforms to add comments. Currently available platforms: ["facebook", "instagram"]
    comment: "What a comment" //required: Text of the new comment to add to the post.
  }).catch(console.error);
```

### Get Comments

Get comments for a post. Currently only on Facebook and Instagram. See the [get comment endpoint](https://docs.ayrshare.com/rest-api/endpoints/comments#get-comments) for more details.

``` javascript
const getCommentResponse = await social.getComments({
    id: "Pkdo9sjk2", // required: Post top-level ID.
  }).catch(console.error);
```

### Set, Delete, and List Auto Schedule

Set up an auto-post schedule by providing times to send. Post will automatically be sent at the next available time. If no more times are available today, the first available time tomorrow will be used, and so forth. See the [set-auto-schedule endpoint](https://docs.ayrshare.com/rest-api/endpoints/post#set-auto-schedule) for more details.

``` javascript
const setAutoSchedule = await social.setAutoSchedule({
  schedule: ["13:05Z", "20:14Z"],   // required
  title: "Instagram Schedule"       // optional 
}).catch(console.error);
```

``` javascript
const deleteAutoSchedule = await social.deleteAutoSchedule({
  title: "Instagram Schedule" // optional, else default is used
}).catch(console.error);
```

``` javascript
const listAutoSchedule = await social.listAutoSchedule().catch(console.error);
```

### Add an RSS or Substack Feed

Add a new RSS or Substack feed to auto post all new articles. Returns a promise that resolved to an object containing the feed ID. See [How to Automate Your Blog or Newsletter](https://www.ayrshare.com/how-to-automatically-post-your-blog-or-newsletter-to-social-media/) for more info.

``` javascript
const feedResponse = await social.feedAdd({
    url: "https://theRSSFeed", // required: URL to shorten

    // Optional: Value: "rss" or "substack". 
    // If not set, defaults to "rss"
    type: "RSS",
  }).catch(console.error);
```

### Delete an RSS or Substack Feed

Delete an RSS feed for a given ID.

``` javascript
const feedResponse = await social.feedDelete({
    id: "Feed ID", // required: ID of the feed
  }).catch(console.error);
```

## Business Member Functions for Multiple Users - Business or Enterprise Plan Required

The [Business Plan](https://www.ayrshare.com/business-plan-for-multiple-users/) allows you to create, manage, and post on behalf of client profiles via the API or Dashboard GUI. You can [integrate](https://docs.ayrshare.com/multiple-client-accounts/overview) Ayrshare into your platform, product, or agency and give your clients social media capabilites. Please [contact us](mailto:contact@ayrshare.com) with any questions.

### Create Profile

Create a new account profile under the primary account. See the [create profile endpoint](https://docs.ayrshare.com/rest-api/endpoints/profiles#create-a-new-profile) for more details.

``` javascript
const createProfileResponse = await social.createProfile({
    // Required: title
    title: "New Profile Title",
  }).catch(console.error);
```

### Delete Profile

Delete a profile owned by the primary account. See the [delete profile endpoint](https://docs.ayrshare.com/rest-api/endpoints/profiles#delete-a-profile) for more details.

``` javascript
const deleteProfileResponse = await social.deleteProfile({
    // Required: profileKey - the API Key of the profile to delete
    profileKey: "JI9s-kJII-9283-OMKM",
  }).catch(console.error);
```

### Get Profiles

Get all the profiles associated with the Primary account. See the [get profile endpoint](https://docs.ayrshare.com/rest-api/endpoints/profiles#get-profiles) for more details.

``` javascript
const getProfileResponse = await social.getProfiles().catch(console.error);
```

### Generate a JWT Url

Generate a JWT Token and URL used for authorizing a user's access to the Social Account linking page. See the [generate JWT endpoint](https://docs.ayrshare.com/rest-api/endpoints/profiles#generate-a-jwt) for more details.

``` javascript
const generateJWTResponse = await social.generateJWT({
    domain: "ACME", // required
    privateKey: "-----BEGIN RSA PRIVATE KEY...", // required
    profileKey: "PROFILE_KEY", // required
}).catch(console.error);
```

### Register, Unregister, and List Webhooks

A webhook allows you to be notified when certain system actions occur via a call to a URL you provide. Register a webhook by providing your URL and the type of action you wish to be notified. When the action occurs a POST message will be sent to the provided URL. See the [webhooks endpoints](https://docs.ayrshare.com/rest-api/endpoints/webhooks) for more details.

``` javascript
const registerWebhook = await social.registerWebhook({
    action: "social", // required: Available actions: "feed", "social".
    url: "https://myhook", // required: Your URL to be called on action. URL must be in a valid format and begin with https://
}).catch(console.error);
```

``` javascript
const unregisterWebhook = await social.unregisterWebhook({
    action: "social", // required: Available actions: "feed", "social".
}).catch(console.error);
```

``` javascript
const listWebhooks = await social.listWebhooks().catch(console.error);
```

## Other Packages & Integrations

We have other package and integrations such as [Python](https://docs.ayrshare.com/packages/python-pypi), [Bubble.io](https://docs.ayrshare.com/packages/bubble.io), and [Airtable](https://docs.ayrshare.com/packages/airtable) + examples in PHP and Go.


## Additional Information and Support

Additional examples, responses, etc. can be found at:

[RESTful API Endpoint Docs](https://docs.ayrshare.com/rest-api/endpoints)

See our [changelog](https://docs.ayrshare.com/additional-info/whats-new-in-2021) for the latest and greatest.

Please [contact us](mailto:contact@ayrshare.com) with your questions, or just to give us shout-out 📢!
