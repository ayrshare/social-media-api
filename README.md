# Automated Social Media Posting APIs

<img src="https://www.ayrshare.com/wp-content/uploads/2020/08/ayr-logo-2156-reduced.png" width="400">

Social Post API is a client for [Ayrshare's](https://www.ayrshare.com) APIs. Ayrshare is a powerful set of APIs that enable you to automate server-side social media posts to Twitter, Facebook, LinkedIn, Reddit, and Telegram. The Ayrshare API handles all the setup and maintenance for the social media networks. One API to rule them all (yeah, went there).

Ayrshare also provides data integrations such as RSS and [Substack](https://www.ayrshare.com/substack) to automated the creation of content.

## Installation

`npm i social-post-api`

## Setup

1. Create a free [Ayrshare account](https://app.ayrshare.com).
   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/2020/09/ayrshare-login.jpg)
2. Enable your social media accounts such as Twitter, Facebook, LinkedIn, Reddit, or Telegram in the Ayrshare dashboard.
   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/2020/09/ayrshare-social-scaled.jpg)
3. Copy your API Key from the Ayrshare dashboard. Used for authentication.
   ![alt API Key](https://www.ayrshare.com/wp-content/uploads/2020/09/ayrshare-api-key-scaled.jpg)

## Getting Started

### Initialize Social Post API

Create a new Social Post object with your API Key.

``` javascript
const SocialPost = require("social-post-api");
const social = new SocialPost(API_KEY);
```

### History, Post, Delete Example

This example shows how to post, get history, and delete the post. This example assumes you have a free API key from [Ayrshare](https://www.ayrshare.com) and have enabled Twitter, Facebook, and LinkedIn.

``` javascript
const SocialPost = require("social-post-api");
const API_KEY = "8jKj782Aw8910dCN"; // get an API Key at ayrshare.com
const social = new SocialPost(API_KEY);

const run = async () => {
  /** post */
  const post = await social.post({
    post: "One more time",
    platforms: ["twitter", "facebook", "linkedin"],
  });
  console.log(post);

  /** history */
  const history = await social.history();
  console.log(history);

  /** delete */
  const deletePost = await social.delete({ id: post.id });
  console.log(deletePost);
};

run();
```

## API

### Post

Published a new post to the specified social networks either immediately or at scheduled future date. Returns a promise the resolves to an object containing the post ID and post status (success, error).

``` javascript
const postResponse = await social.post({
    // Required
    post: "Best post ever!",

    // Required: Social media platforms to post. Accepts an array of strings with values: "facebook", "twitter", "linkedin", "reddit", or "telegram".
    platforms: ["twitter", "facebook", "linkedin", "telegram", "reddit"],

	// Optional: URLs of images to include in the post
	media_urls: ["https://my.com/image.png"],

	// Optional: Datetime to schedule a future post. Accepts an ISO-8601 UTC date time in format "YYYY-MM-DDThh:mm:ssZ". Example: 2021-07-08T12:30:00Z
	scheduleDate: "2020-08-07T15:17:00Z",

	// Required if platform includes "reddit." Title of Reddit post
	title: "My Reddit Post",

	// Required if platform includes "reddit." Subreddit to post to
	subreddit: "test",

	// Optional: Shorten links in the post for all platforms similar to bit.ly. Only URLS starting with http or https will be shortened. Default value: true.
	shorten_links: true
  });
```

### Delete

Delete a post with a given post ID, obtained from teh "post" response. Returns a promise with the delete status.

``` javascript
const deleteResponse = await social.delete({
    // Required
    id: "POST ID",
  });
```

### History

Get a history of all posts and their current status. Returns a promise that resolves to an array of post objects.

``` javascript
const historyResponse = await social.history();
```

### Upload Media

Upload and store a new image. Returns a URL referencing the image. Can be used in "image_url" in "post".

``` javascript
const uploadResponse = await social.upload({
	// Required: The image as a Base64 encoded string. Example encoding: https://www.base64-image.de/
	file:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",

	// Optional
	fileName: "test.png",

	// Optional
    description: "best image"
});
```

### Get Media

Get all media URLS. Returns a promise that resolves to an array of URL objects.

``` javascript
const mediaResponse = await social.media();
```

### Shorten URL

Shorten a URL and return the shortened URL.

``` javascript
const shortenResponse = await social.shorten({
    // Required: URL to shorten
    url: "https://theURLtoShorten.com/whatmore",
  });
```

### Add an RSS or Substack Feed

Add a new RSS or Substack feed to auto posting. Returned a promise that resolved to an object containing the feed ID.

``` javascript
const feedResponse = await social.feedAdd({
	// Required: URL to shorten
	url: "https://theRSSFeed",

    // Optional: Value: "rss" or "substack". If not present, default to "rss"
    type: "RSS",
  });
```

### Delete an RSS or Substack Feed

Delete an RSS feed for a given ID.

``` javascript
const feedResponse = await social.feedDelete({
	// Required: ID of the feed
	id: "Feed ID",
  });
```

## Additional Information

Additional examples, responses, etc can be found at:

[API REST Endpoint Docs](https://docs.ayrshare.com/rest-api/endpoints)
