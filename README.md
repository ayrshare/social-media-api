# Social Media APIs for Posting, Scheduling, and Analytics

![Ayrshare logo](https://www.ayrshare.com/wp-content/uploads/2020/08/ayr-logo-2156-reduced.png)

The Social Media API is a Node.js wrapper SDK for [Ayrshare's APIs](https://www.ayrshare.com).

Ayrshare is a powerful set of APIs that enable you to send social media posts, get analytics, and add comments to *X/Twitter*, *Instagram*, *Facebook*, *LinkedIn*, *YouTube*, *Google Business Profile*, *Pinterest*, *TikTok*, *Reddit*, and *Telegram* on behalf of your users or clients.

The Ayrshare Social API handles all the setup and maintenance for the social media networks. One API to rule them all (yeah, went there). See the full list of [full list of features](https://www.ayrshare.com/docs/apis/overview) in our docs.

Get started with a [free plan](https://www.ayrshare.com/pricing), or if you have a platform or manage multiple users check out the [Business Plan](https://www.ayrshare.com/business-plan-for-multiple-users/).

For more information on setup, see our installation [video](https://youtu.be/G8M6DZdtcMc) or our [Quick Start Guide](https://www.ayrshare.com/docs/quickstart).

## Installation

`npm i social-media-api`

## Setup

**1.** Create a free [Ayrshare account](https://app.ayrshare.com).

   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/Ayrshare-login.png)

**2.** Enable your social media accounts such as X/Twitter, Facebook, LinkedIn, Reddit, Instagram, Google Business Profile, Telegram, TikTok, or YouTube in the Ayrshare dashboard.

   ![alt Social Accounts Setup](https://www.ayrshare.com/wp-content/uploads/Ayrshare-social-linking.png)
  
**3.** Copy your API Key from the Ayrshare dashboard. Used for authentication.

   ![alt API Key](https://www.ayrshare.com/wp-content/uploads/Ayrshare-API-key.png)

## Getting Started

### Initialize Social Post API

Create a new Social Media API object with your API Key.

``` javascript
const SocialMediaAPI = require("social-media-api"); // or import SocialMediaAPI from 'social-media-api';
const social = new SocialMediaAPI('Your API Key');
```

### History, Post, Delete Example

This simple example shows how to post an image or video, get history, and delete the post. This example assumes you have a free API key from [Ayrshare](https://www.ayrshare.com) and have enabled X/Twitter, Facebook Pages, Instagram, LinkedIn. Note, YouTube, Google Business Profile, Telegram, TikTok, and Reddit also available.

``` javascript
const SocialMediaAPI = require("social-media-api");
const API_KEY = "Your API Key"; // get an API Key at ayrshare.com
const social = new SocialMediaAPI(API_KEY);

const run = async () => {
  /** post */
  const post = await social.post({
    post: "Who you gonna call?",
    platforms: ["twitter", "facebook", "fbg", "instagram", "linkedin", "gmb"],
    mediaUrls: ["https://img.ayrshare.com/012/gb.jpg"]
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

## Social Media API

The following section details the different functions of the social media API.

### Post

Published a new post to the specified social networks either immediately or at scheduled future date. Returns a promise that resolves to an object containing the post ID and post status (success, error). See the [post endpoint](https://www.ayrshare.com/docs/apis/post/post) for the full capabilities.

``` javascript
const postResponse = await social.post({
    // Required
    post: "Best post ever!",

    /** 
     * Required: Social media platforms to post. 
     * Accepts an array of strings with values: "facebook", "twitter", "instagram", "linkedin", "youtube", "gmb", "reddit", or "telegram".
     * YouTube requires a video and not shown in the example. See https://www.ayrshare.com/docs/apis/post/social-networks/youtube
     */
    platforms: ["twitter", "facebook", "fbg", "instagram", "linkedin", "gmb", "telegram"],

    // Optional: URLs of images or videos to include in the post
    mediaUrls: ["https://img.ayrshare.com/012/gb.jpg"],

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

Delete a post with a given post ID, obtained from the "post" response. Returns a promise with the delete status. Also, can bulk delete multiple IDs at once using the "bulk" key. See the [delete endpoint](https://www.ayrshare.com/docs/apis/post/delete-post) for more details.

``` javascript
const deleteResponse = await social.delete({
    id: "POST ID",                          // optional, but required if "bulk" not present
    bulk: ["Post ID 1", "Post ID 2", ...]   // optional, but required if "id" not present
  }).catch(console.error);
```

### Get Post

Get a post with a given post ID, obtained from the "post" response. Returns a promise that resolves to an array containing the post object. See the [get endpoint](https://www.ayrshare.com/docs/apis/post/get-post) for more details.

``` javascript
const getResponse = await social.getPost({ id }).catch(console.error);
```

### Retry Post

Retry a failed post with a given post ID, obtained from the "post" response. Returns a promise that resolves to an object containing the post status and ID. See the [retry endpoint](https://www.ayrshare.com/docs/apis/post/retry-post) for more details.

``` javascript
const retryResponse = await social.retryPost({ id }).catch(console.error);
```

### History

Get a history of all posts and their current status in descending order. Returns a promise that resolves to an array of post objects. See the [history endpoint](https://www.ayrshare.com/docs/apis/history/get-history) for more details.

``` javascript
const historyResponse = await social.history({
  lastRecords: 10,    // optional: returns the last X number of history records
  lastDays: 30,       // optional: returns the last X number of days of history records. Defaults to 30 if not present.
}).catch(console.error);
```

Get history by post ID. See the [history by ID endpoint](https://www.ayrshare.com/docs/apis/history/get-history-id) for more details.

``` javascript
const historyByIdResponse = await social.history({
  id: "pK0j89" // required: Ayrshare top level post ID
}).catch(console.error);
```

Get history by platform. See the [history by platform endpoint](https://www.ayrshare.com/docs/apis/history/history-platform) for more details.

``` javascript
const historyAllPostsResponse = await social.history({
  platform: "facebook"
}).catch(console.error);
```

### Upload Media

Upload and store a new image. Returns a URL referencing the image. Can be used in "image_url" in "post". See the [media endpoint](https://www.ayrshare.com/docs/apis/media/upload-media) for more details.

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

Get all media URLS. Returns a promise that resolves to an array of URL objects. See the [media endpoint](https://www.ayrshare.com/docs/apis/media/get-media-in-gallery) for more details.

``` javascript
const mediaResponse = await social.media().catch(console.error);
```

### Get Media Upload URL for Large Files

Get a URL to upload large files. Returns a promise that resolves to an object containing an access URL and an upload URL. See the [media upload url endpoint](https://www.ayrshare.com/docs/apis/media/upload-large-media) for more details.

``` javascript
const mediaUploadResponse = await social.mediaUploadUrl({ 
    fileName: "test.png", // required: The name of the file to upload
    contentType: "image/png" // required: The content type of the file
}).catch(console.error);
```

### Verify Media Exists

Verify that the media file exists when uploaded. See the [media verify exists endpoint](https://www.ayrshare.com/docs/apis/media/verify-media-url) for more details.

``` javascript
const verifyMediaResponse = await social.verifyMediaExists({
    mediaUrl: "https://theImage.jpg" // required: URL of the image to verify exists
}).catch(console.error);
```

### Resize Image

Get image resized according to social network requirements. See the [resize image endpoint](https://www.ayrshare.com/docs/apis/media/resize) for more details.

``` javascript
const resizeImageResponse = await social.resizeImage({
    imageUrl: "https://theImage.jpg", // required: URL of the image to resize
    platform: "facebook" // required: Platform to resize the image for. 
    watermarkUrl: "https://theWatermark.png", // optional: URL of the watermark image to add to the image.
    effects: { color: "#A020F0" } // optional: Change opacity, colors, etc. See endpoint for more details.
    dimensions: { width: 1200, height: 628 } // optional: Width and height of the image. Required if platform is not specified.
    mode: "blur" // optional. See endpoint for more details.
}).catch(console.error);
```

### User

Get data about the logged in user, such as post quota, used quota, active social networks, and created date. See the [user endpoint](https://www.ayrshare.com/docs/apis/user/profile-details) for more details.

``` javascript
const user = await social.user().catch(console.error);
```

### Post Analytics

Get analytics on shortened links and shares, likes, shares, and impressions for a post or at the accounts level. See the [post analytics endpoint](https://www.ayrshare.com/docs/apis/analytics/post) for more details.

``` javascript
const analyticsPost = await social.analyticsPost({
  id: "Post ID",
  platforms: ["twitter", "instagram", "facebook", "youtube", "linkedin"]
}).catch(console.error);
```

### Social Media Analytics

Get analytics and demographics on a user’s social profile, such as impressions, views, and followers. See the [social analytics endpoint](https://www.ayrshare.com/docs/apis/analytics/social) for more details.

``` javascript
const analyticsSocial = await social.analyticsSocial({
  platforms: ["twitter", "instagram", "facebook", "youtube", "pinterest", "tiktok", "reddit", "linkedin"]
}).catch(console.error);
```

### Post a Comment

Add a comment to a post. Currently only on Facebook and Instagram. See the [create comment endpoint](https://www.ayrshare.com/docs/apis/comments/post-comment) for more details.

``` javascript
const postCommentResponse = await social.postComment({
    id: "Pkdo9sjk2", // required: Post top-level ID.
    platforms: ["instagram", "facebook"], // required: List of platforms to add comments. Currently available platforms: ["facebook", "instagram"]
    comment: "What a comment" //required: Text of the new comment to add to the post.
  }).catch(console.error);
```

### Get Comments

Get comments for a post. Currently only on Facebook and Instagram. See the [get comment endpoint](https://www.ayrshare.com/docs/apis/comments/get-comments) for more details.

``` javascript
const getCommentResponse = await social.getComments({
    id: "Pkdo9sjk2", // required: Post top-level ID.
  }).catch(console.error);
```

### Delete Comments

Delete either a single comment or all comments under a post that were sent via Ayrshare. Available for Facebook, Instagram, LinkedIn, Reddit, TikTok, X/Twitter, and YouTube. See the [delete comment endpoint](https://www.ayrshare.com/docs/apis/comments/delete-comments) for more details.

``` javascript
const deleteCommentResponse = await social.deleteComments({
    id: "Pkdo9sjk2", // required: Post top-level ID or social comment ID
    platforms: ["instagram", "facebook"], // optional: Required only if using the social comment id.
  }).catch(console.error);
```

### Reply Comment

Reply to a comment. Available for Facebook, Instagram, LinkedIn, TikTok, X/Twitter, and YouTube. See the [reply comment endpoint](https://www.ayrshare.com/docs/apis/comments/reply-to-comment) for more details.

``` javascript
const replyCommentResponse = await social.replyComment({
    commentId: "Pkdo9sjk2", // required: The Ayrshare commentId returned from the POST comment endpoint. Be sure to use the top level commentId.
    platforms: ["instagram", "facebook"], // required: Array of platforms to post the reply. Values: facebook, instagram, linkedin, tiktok, twitter, youtube
    comment: "What a comment" // required: The reply to add to the comment.
  }).catch(console.error);
```

### Set, Delete, and List Auto Schedule

Auto scheduling allows you to create and manage pre-defined posting schedules. See the [auto-schedule endpoints](https://www.ayrshare.com/docs/apis/auto-schedule/overview) for more details.

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

Delete an RSS feed for a given ID. See the [delete feed endpoint](https://www.ayrshare.com/docs/apis/feeds/delete-feed) for more details.

``` javascript
const feedResponse = await social.feedDelete({
    id: "Feed ID", // required: ID of the feed
  }).catch(console.error);
```

### Get Feeds

Get all registered RSS feeds. Returns a promise that resolves to an array of feed objects. See the [get feeds endpoint](https://www.ayrshare.com/docs/apis/feeds/get-feeds) for more details.

``` javascript
const feedsResponse = await social.feedGet().catch(console.error);
```

### Update Feed

Update an RSS feed for a given ID. Returns a promise that resolves to an object containing the feed ID. See the [update feed endpoint](https://www.ayrshare.com/docs/apis/feeds/update-feed) for more details.

``` javascript
const feedResponse = await social.feedUpdate({
    id: "Feed ID", // required: ID of the feed
    useFirstImage: true, // optional: Use the first image in the article to add to the post.
    autoHashtag: true, // optional: Automatically add hashtags to the post.
  }).catch(console.error);
```

## Business Functions for Multiple Users - Business or Enterprise Plan Required

The [Business Plan](https://www.ayrshare.com/business-plan-for-multiple-users/) allows you to create, manage, and post on behalf of client profiles via the API or Dashboard GUI. You can [integrate](https://www.ayrshare.com/docs/multiple-users/business-plan-overview) Ayrshare into your platform, product, or agency and give your clients social media capabilites. Please [contact us](mailto:contact@ayrshare.com) with any questions.

A User Profile PROFILE_KEY can be set with the `setProfileKey` function.

``` javascript
const social = new SocialMediaAPI(API_KEY);
social.setProfileKey(PROFILE_KEY);
```

Replace PROFILE_KEY with the Profile Key of the user you want to use.

Please see the [Authorization](https://www.ayrshare.com/docs/apis/overview#authorization) docs for more details.

### Create Profile

Create a new account profile under the primary account. See the [create profile endpoint](https://www.ayrshare.com/docs/apis/profiles/create-profile) for more details.

``` javascript
const createProfileResponse = await social.createProfile({
    // Required: title
    title: "New Profile Title",
  }).catch(console.error);
```

### Delete Profile

Delete a profile owned by the primary account. See the [delete profile endpoint](https://www.ayrshare.com/docs/apis/profiles/delete-profile) for more details.

``` javascript
const deleteProfileResponse = await social.deleteProfile({
    // Required: profileKey - the API Key of the profile to delete
    profileKey: "JI9s-kJII-9283-OMKM",
  }).catch(console.error);
```

### Update Profile

Update a profile owned by the primary account. See the [update profile endpoint](https://www.ayrshare.com/docs/apis/profiles/update-profile) for more details.

``` javascript
const updateProfileResponse = await social.updateProfile({
    // Required: profileKey - the API Key of the profile to update
    profileKey: "JI9s-kJII-9283-OMKM",
    title: "This is a greate new title"
  }).catch(console.error);
```

### Get Profiles

Get all the profiles associated with the primary account. See the [get profile endpoint](https://www.ayrshare.com/docs/apis/profiles/get-profiles) for more details.

``` javascript
const getProfileResponse = await social.getProfiles().catch(console.error);
```

### Unlink Social Network

Unlink a social account for a given user profile owned by the primary account. See the [unlink social network endpoint](https://www.ayrshare.com/docs/apis/profiles/unlink-social-network) for more details.

``` javascript
const unlinkResponse = await social.unlinkSocial({
    // Required: profileKey - the API Key of the profile to delete
    profileKey: "JI9s-kJII-9283-OMKM",
    platform: "facebook"
  }).catch(console.error);
```

### Generate a JWT Url

Generate a JWT Token and URL used for authorizing a user's access to the Social Account linking page. See the [generate JWT endpoint](https://www.ayrshare.com/docs/apis/profiles/generate-jwt) for more details.

``` javascript
const generateJWTResponse = await social.generateJWT({
    domain: "ACME", // required
    privateKey: "-----BEGIN RSA PRIVATE KEY...", // required
    profileKey: "PROFILE_KEY", // required
}).catch(console.error);
```

### Get Brand Info on a User

Get brand information on users and companies public social media accounts. See the [brand endpoint](https://www.ayrshare.com/docs/apis/brand/brand-user) for more details.

``` javascript
const brandResponse = await social.getBrandByUser({
    platforms: ["instagram", "facebook"],
    instagramUser: "@ayrshare",
    facebookUser: "ayrshare",
  }).catch(console.error);
```

### Register, Unregister, and List Webhooks

A webhook allows you to be notified when certain system actions occur via a call to a URL you provide. Register a webhook by providing your URL and the type of action you wish to be notified. When the action occurs a POST message will be sent to the provided URL. See the [webhooks endpoints](https://www.ayrshare.com/docs/apis/webhooks/overview) for more details.

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

### Auto Hashtags

Automatically add hashtags to your post. See the [auto hashtags endpoint](https://www.ayrshare.com/docs/apis/hashtags/auto-hashtags) for more details.

``` javascript
const autoHashtagsResponse = await social.autoHashtags({
    post: "I love social media", // required: Post text to add hashtags for.
    position: "auto" // optional: Position of the hashtags. Values: "auto", "end". Default: "auto".
    max: 2 // optional: Maximum number of hashtags to add, ranging 1-5. Default: 2.
}).catch(console.error);
```

### Recommend Hashtags

Get suggestions for hashtags based on a keyword. See the [recommend hashtags endpoint](https://www.ayrshare.com/docs/apis/hashtags/recommend-hashtags) for more details.

``` javascript
const recommendHashtagsResponse = await social.recommendHashtags({
    keyword: "social media", // required: Keyword to get hashtags for.
}).catch(console.error);
```

### Check Banned Hashtags

Check if a hashtag is banned on Instagram or other social networks. See the [check banned hashtags endpoint](https://www.ayrshare.com/docs/apis/hashtags/check-hashtags) for more details.

``` javascript
const checkBannedHashtagsResponse = await social.checkBannedHashtags({
    hashtag: "socialmedia", // required: Hashtag to check.
}).catch(console.error);
```

### Get All Reviews

Retrieve all the reviews for the specified platform. See the [get all reviews endpoint](https://www.ayrshare.com/docs/apis/reviews/get-reviews) for more details.

``` javascript
const allReviewsResponse = await social.reviews({
    platform: "facebook", // required: Platform to get reviews for. Currently available: "facebook", "gmb"
}).catch(console.error);
```

### Get Single Review

Retrieve a single review. See the [get single review endpoint](https://www.ayrshare.com/docs/apis/reviews/get-one-review) for more details.

``` javascript
const singleReviewResponse = await social.review({
    id: "Review ID", // required
    platform: "gmb", // required: Platform to get review for. Currently available: "gmb"
}).catch(console.error);
```

### Reply to Review

Reply to a review. See the [reply to review endpoint](https://www.ayrshare.com/docs/apis/reviews/reply-review) for more details.

``` javascript
const replyReviewResponse = await social.replyReview({
    reviewId: "Review ID", // required: Review ID to reply to.
    platform: "facebook", // required: Platform to reply to review for. Currently available: "facebook", "gmb"
    reply: "Thank you for the review" // required: Text of the reply to the review.
}).catch(console.error);
```

### Delete Review Reply

Delete a review reply. See the [delete review reply endpoint](https://www.ayrshare.com/docs/apis/reviews/delete-review-reply) for more details.

``` javascript
const deleteReplyReviewResponse = await social.deleteReplyReview({
    reviewId: "Review ID", // required: Review ID to delete reply for.
    platform: "gmb", // required: Platform to delete reply for. Currently available: "gmb"
}).catch(console.error);
```

## Max Pack Required

### Generate Post

Generate a new social post using ChatGPT. Token limits applicable. See the [generate post endpoint](https://www.ayrshare.com/docs/apis/generate/post-text) for more details.

``` javascript
const generatePostResponse = await social.generatePost({
    text: "I love social media", // required: Description of what the post should be about. 
    hashtags: true, //optional: Include hashtags in the post. Default: true
    emojis: true, // optional: Include emojis in the post. Default: false
    twitter: true, // optional: Construct a post 280 or few characters. Default: false
}).catch(console.error);
```

### Generate Rewrite

Generate variations of a social media post using ChatGPT. Token limits applicable. See the [generate rewrite endpoint](https://www.ayrshare.com/docs/apis/generate/rewrite-post) for more details.

``` javascript
const generateRewriteResponse = await social.generateRewrite({
    post: "I love social media", // required: The post text to be rewritten. 
    emojis: true, // optional: Include emojis in the post. Default: false
    hashtags: true, // optional: Include hashtags in the post. Default: false
    twitter: true, // optional: Construct a post 280 or few characters. Default: false
    rewrites: 5, // optional: Number of rewrites to generate. Default: 5
}).catch(console.error);
```

### Generate Transcription

Provide a transcription of a video file. See the [generate transcription endpoint](https://www.ayrshare.com/docs/apis/generate/transcribe-video) for more details.

``` javascript
const generateTranscriptionResponse = await social.generateTranscription({
    videoUrl: "https://theVideo.mp4", // required: URL encoded video URL. The video must be hosted by Ayrshare.
}).catch(console.error);
```

### Generate Translation

Translate text for a post to over 100 different languages. See the [generate translation endpoint](https://www.ayrshare.com/docs/apis/generate/translate-post) for more details.

``` javascript
const generateTranslationResponse = await social.generateTranslation({
    text: "I love social media", // required: The text to be translated.
    lang: "es", // required: The language code to translate the text to. 
}).catch(console.error);
```

### Generate Alt Text

Create AI-generated alt text for your images.  See the [generate alt text endpoint](https://www.ayrshare.com/docs/apis/generate/image-alt-text) for more details.

``` javascript
const generateAltTextResponse = await social.generateAltText({
    url: "https://theImage.jpg", // required: URL of the image to generate alt text for.
    keywords: ["social media", "ayrshare"], // optional: Keywords to help the AI generate better alt text.
    lang: "en" // optional: The language code to generate the alt text in. Default: "en"
}).catch(console.error);
```

### Shorten link

Provide a URL and a shortened link will be returned. See the [shorten link endpoint](https://www.ayrshare.com/docs/apis/links/create-short-link) for more details.

``` javascript
const shortenLinkResponse = await social.shortLink({
    url: "https://theURL.com", // required: URL to shorten.
    utmId: "1234", // optional: UTM ID to track the link. See more details about utm parameters at endpoint link above.
    utmSource: "source", // optional
    utmMedium: "medium", // optional
    utmCampaign: "campaign", // optional
    utmTerm: "term", // optional
    utmContent: "content", // optional
}).catch(console.error);
```

### Analytics for Shortened Links

Return analytics for all shortened links or a single link for a given link ID. See the [analytics link endpoint](https://www.ayrshare.com/docs/apis/links/link-analytics) for more details.

``` javascript
const analyticsLinkResponse = await social.shortLinkAnalytics({
    id: "Link ID", // optional: Link ID to get analytics for.
    fromCreatedDate: "2023-07-08T12:30:00Z", // optional: Get history of links shortened after this date.
    toCreatedDate: "2023-07-08T12:30:00Z", // optional: Get history of links shortened before this date.
    fromClickDate: "2023-07-08T12:30:00Z", // optional: Get history of links clicked after this date.
    toClickDate: "2023-07-08T12:30:00Z", // optional: Get history of links clicked before this date.
}).catch(console.error);
```

## Other Packages & Integrations

We have other package and integrations such as [Python](https://www.ayrshare.com/docs/packages-guides/python), [Bubble.io](https://www.ayrshare.com/docs/packages-guides/bubble), and [Airtable](https://www.ayrshare.com/docs/packages-guides/airtable) + examples in PHP and Go.

## Additional Information and Support

Additional examples, responses, etc. can be found at:

[RESTful API Endpoint Docs](https://www.ayrshare.com/docs/apis/overview)

See our [changelog](https://www.ayrshare.com/docs/whatsnew/latest) for the latest and greatest.

Please [contact us](mailto:support@ayrshare.com) with your questions, or just to give us shout-out 📢!
