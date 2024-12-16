// npx rollup index.js --file index.cjs --format cjs

import SocialMediaAPI from "./index.js";
/**
 * Add your API Key to a config.js file, Profile Key (Business Plan), and Domain (Business Plan)
 * {
 *  "API_KEY": "your api key",
 *  "PROFILE_KEY": "user profile key",
 *  "DOMAIN": "Business Plan domain"
 * }
 */
import config from "./config.js";
const { API_KEY, PROFILE_KEY, DOMAIN } = config;

const social = new SocialMediaAPI(API_KEY);
social.setProfileKey(PROFILE_KEY);

/** Test history */
const testHistory = async (platform, id) => {
  const history = await social.history(
    platform ? { platform } : id ? { id } : null
  );
  console.log("testHistory:", history);
};

/** Test get details on the current user */
const testUser = async () => {
  const user = await social.user();
  console.log("testUser:", user);
};

/** Test Add a feed */
const testFeed = async () => {
  const feedAdd = await social.feedAdd({
    type: "substack",
    url: "https://bankless.substack.com/"
  });
  console.log("testFeed:", feedAdd);
};

/** Test Auto Schedule */
const testAutoSchedule = async () => {
  const setAutoSchedule = await social.setAutoSchedule({
    schedule: ["13:05Z", "20:14Z"],
    title: "test"
  });
  console.log("testAutoSchedule:", setAutoSchedule);
};

/** Test delete */
const testDelete = async (id) => {
  const deletePost = await social.delete({ id });
  console.log("testDelete:", deletePost);
};

/** Test post 
 * Uncomment the platforms you want to post to and/or include the random video.
*/
const testPost = async () => {
  const post = await social.post({
    randomPost: true,
    // platforms: ["twitter", "facebook", "linkedin", "instagram", "tiktok"],
    platforms: ["twitter"],
    randomMediaUrl: true,
    // isLandscapeVideo: true,
    shortenLinks: true,
    // requiresApproval: true
  });
  console.log("testPost: ", JSON.stringify(post, null, 2));

  return post.id;
};

const testGetPost = async (id) => {
  const post = await social.getPost({ id });
  console.log("testGetPost: ", post);
};

const testRetryPost = async (id) => {
  const post = await social.retryPost({ id });
  console.log("testRetryPost: ", post);
};

/** Test Post Update */
const testPostUpdate = async (id) => {
  const post = await social.updatePost({
    id,
    approved: true
  });
  console.log("test post update: ", post);

  return post.id;
};

/** Test Instagram post */
const testInstagramPost = async () => {
  const postInstagram = await social.post({
    randomPost: true,
    platforms: ["instagram"],
    media_urls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"],
    tagged: ["@ayrshare"],
    shorten_links: true
  });
  console.log("testInstagramPost:", postInstagram);
};

/** Test Upload -  Video required*/
const testVideoPost = async () => {
  const datauri = require("datauri");
  const content = await datauri("./test-video.mp4");
  const upload = await social.upload({
    file: content,
    fileName: "Test.mp4",
    description: "A great test"
  });
  console.log("testVideoPost:", upload);
};

const testAnalytics = async (id) => {
  const analytics = await social.analyticsPost({
    id,
    // platforms: ["facebook", "instagram", "twitter", "linkedin"],
    platforms: ["facebook"]
  });
  return console.log("testAnalytics:", analytics);
};

const testAnalyticsSocial = async (platforms) => {
  const analytics = await social.analyticsSocial({
    platforms
  });
  return console.log("testAnalyticsSocial:", analytics);
};

const testGetComments = async (id) => {
  const analytics = await social.getComments({
    id
  });
  return console.log("testGetComments:", analytics);
};

const testListWebhooks = async () => {
  const listWebhooks = await social.listWebhooks();
  console.log("testListWebhooks:", listWebhooks);
};

const testPostComment = async (id) => {
  const analytics = await social.postComment({
    id,
    platforms: ["facebook", "instagram"],
    comment: "My thoughts exactly"
  });
  return console.log("testPostComment:", analytics);
};

/** Business Plan Membership - required  ---------------- */
const testCreateProfile = async () => {
  const createProfile = await social.createProfile({
    title: "Best Profile Title Ever"
  });
  console.log(createProfile);

  return createProfile.profileKey;
};

const testDeleteProfile = async (profileKey) => {
  const deleteProfile = await social.deleteProfile({
    profileKey: profileKey
  });
  console.log("testDeleteProfile:", deleteProfile);
};

const testCreateandDelete = async () => {
  const profileKey = await testCreateProfile();
  return testDeleteProfile(profileKey);
};

const testGenerateJWT = async () => {
  const fs = require("fs");
  const privateKey = fs.readFileSync(`./private.key`, "utf8");

  const jwt = await social.generateJWT({
    domain: DOMAIN,
    privateKey,
    profileKey: PROFILE_KEY
  });

  return console.log("testGenerateJWT", jwt);
};

const testUpdateProfile = async (profileKey) => {
  const updateProfile = await social.updateProfile({
    profileKey,
    title: "A Nice Title"
  });
  console.log("UpdateProfile:", updateProfile);
};

const testUnlinkSocial = async (profileKey, platform) => {
  const unlinkSocial = await social.unlinkSocial({ profileKey, platform });
  console.log("testUnlinkSocial:", unlinkSocial);
};

const testGetBrandByUser = async (platforms, username) => {
  const getBrandByUser = await social.getBrandByUser({
    platforms,
    instagramUser: username
  });
  console.log("testGetBrandByUser:", getBrandByUser);
};

const testVerifyMediaExists = async (mediaUrl) => {
  const verifyMediaExists = await social.verifyMediaExists({
    mediaUrl
  });
  console.log("testVerifyMediaExists:", verifyMediaExists);
};

const testMediaMeta = async (url) => {
  const mediaMeta = await social.mediaMeta({
    url
  });
  console.log("testMediaMeta:", mediaMeta);
};

const testMediaUploadUrl = async (fileName, contentType) => {
  const mediaMeta = await social.mediaUploadUrl({
    fileName,
    contentType
  });
  console.log("testMediaUploadUrl:", mediaMeta);
};

const testResizeImage = async (imageUrl, platform) => {
  const resizeImage = await social.resizeImage({
    imageUrl,
    platform
  });
  console.log("testResizeImage:", resizeImage);
};

const testAutoHashtags = async (post) => {
  const autoHashtags = await social.autoHashtags({
    post
  });
  console.log("testAutoHashtags:", autoHashtags);
};

const testRecommendHashtags = async (keyword) => {
  const recommendHashtags = await social.recommendHashtags({
    keyword
  });
  console.log("testRecommendHashtags:", recommendHashtags);
};

const testCheckBannedHashtags = async (hashtag) => {
  const checkBannedHashtags = await social.checkBannedHashtags({
    hashtag
  });
  console.log("testCheckBannedHashtags:", checkBannedHashtags);
};

const testReviews = async (platform) => {
  const reviews = await social.reviews({ platform });
  console.log("testReviews:", reviews);
};

const testReview = async (id, platform) => {
  const review = await social.review({
    id,
    platform
  });
  console.log("testReview:", review);
};

const testReplyReview = async (reviewId, platform, reply) => {
  const replyReview = await social.replyReview({
    reviewId,
    platform,
    reply
  });
  console.log("testReplyReview:", replyReview);
};

const testDeleteReplyReview = async (reviewId, platform) => {
  const deleteReplyReview = await social.deleteReplyReview({
    reviewId,
    platform
  });
  console.log("testDeleteReplyReview:", deleteReplyReview);
};

const testDeleteComments = async (id) => {
  const deleteComment = await social.deleteComments({
    id
  });
  console.log("testDeleteComment:", deleteComment);
};

const testReplyComment = async (commentId, platforms, comment) => {
  const replyComment = await social.replyComment({
    commentId,
    platforms,
    comment
  });
  console.log("testReplyComment:", replyComment);
};

/** ------------------------------------------------ */

/** Max Pack - required  ---------------- */
const testGeneratePost = async (text) => {
  const generatePost = await social.generatePost({
    text
  });
  console.log("testGeneratePost:", generatePost);
};

const testGenerateRewrite = async (post) => {
  const generateRewrite = await social.generateRewrite({
    post
  });
  console.log("testGenerateRewrite:", generateRewrite);
};

const testGenerateTranscription = async (videoUrl) => {
  const generateTranscription = await social.generateTranscription({
    videoUrl
  });
  console.log("testGenerateTranscription:", generateTranscription);
};

const testGenerateTranslation = async (text, lang) => {
  const generateTranslation = await social.generateTranslation({
    text,
    lang
  });
  console.log("testGenerateTranslation:", generateTranslation);
};

const testGenerateAltText = async (url) => {
  const generateAltText = await social.generateAltText({
    url
  });
  console.log("testGenerateAltText:", generateAltText);
};

const testShortLink = async (url) => {
  const shortLink = await social.shortLink({
    url
  });
  console.log("testShortLink:", shortLink);
};

const testShortLinkAnalytics = async (id) => {
  const shortLinkAnalytics = await social.shortLinkAnalytics({
    id
  });
  console.log("testShortLinkAnalytics:", shortLinkAnalytics);
};

/** ------------------------------------------------ */

const testWithProfileKey = async () => {
  social.setProfileKey(PROFILE_KEY);
  
  const post = await social.post({
    randomPost: true,
    platforms: ["twitter"],
    shortenLinks: true
  });
  console.log("testWithProfileKey post:", post);
};

const run = async () => {
  const id = await testPost();
  // await testGetPost(id);
  // await testRetryPost(id);
  // const update = await testPostUpdate(id);
  // await testPostComment(id);
  // await testAnalytics("lZDx0mCKwpgCHGp9gLy5");
  // await testGetComments(id);
  // testDelete(id);
  // await testWithProfileKey();
};

/*
testHistory();
testUser();
testAutoSchedule();
testFeed();
testPost();
testInstagramPost();
testVideoPost();
testAnalytics(id);
testComments();
testListWebhooks();
testAnalyticsSocial(["facebook"]);
testMediaMeta("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg");
testDeleteComment("XOVUGutufIy5UZFb01e0");
testReplyComment(
  "Nsa2SWqt32BuY4ooeh7Au",
  ["instagram"],
  "Thank you for the comment!"
);
*/

/** Business Plan */
/*
  testCreateProfile();
  testCreateandDelete();
  testGenerateJWT();
  testUnlinkSocial(PROFILE_KEY, "twitter");
  testGetBrandByUser(["instagram"], "@ayrshare");
  testUpdateProfile(PROFILE_KEY);
  testMediaUploadUrl("tree.jpg", "jpeg");
  testVerifyMediaExists(
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
  );
  testResizeImage(
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "facebook"
  );
  testAutoHashtags("This is a test post");
  testRecommendHashtags("post");
  testCheckBannedHashtags("instagram");
  testReviews("facebook");
  testReview("10114455408676943", "facebook");
  testReplyReview("10114455408676943", "facebook", "Thank you for the review!");
  testDeleteReview("10114455408676943", "facebook");
*/

/* Max Pack */
/*
  testGeneratePost("This is a test post");
  testGenerateRewrite("This is a test post");
  testGenerateTranscription("https://img.ayrshare.com/random/landscape5.mp4");
  testGenerateTranslation("This is a test post", "fr");
  testGenerateAltText("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg");
  testShortLink("https://www.ayrshare.com/");
  testShortLinkAnalytics("qR--d8");
*/

run();
