const SocialPost = require("./index.js");
/**
 * Add your API Key to a .json file, Profile Key (Business Plan), and Domain (Business Plan)
 * {
 *  "API_KEY": "your api key",
 *  "PROFIL_KEY": "user profile key",
 *  "DOMAIN": "Business Plan domain"
 * }
 */
const { API_KEY, PROFILE_KEY, DOMAIN } = require("./config.json");
const social = new SocialPost(API_KEY);

/** Test history */
const testHistory = async () => {
  const history = await social.history({ lastRecords: 2, lastDays: 10 });
  console.log(history);
};

/** Test get details on the current user */
const testUser = async () => {
  const user = await social.user();
  console.log(user);
};

/** Test Add a feed */
const testFeed = async () => {
  const feedAdd = await social.feedAdd({
    type: "substack",
    url: "https://bankless.substack.com/",
  });
  console.log(feedAdd);
};

/** Test Auto Schedule */
const testAutoSchedule = async () => {
  const setAutoSchedule = await social.setAutoSchedule({
    schedule: ["13:05Z", "20:14Z"],
    title: "test",
  });
  console.log(setAutoSchedule);
};

/** Test delete */
const testDelete = async (id) => {
  const deletePost = await social.delete({ id });
  console.log(deletePost);
};

/** Test post */
const testPost = async () => {
  const post = await social.post({
    post: "What a wonderful post!",
    platforms: ["twitter", "facebook", "linkedin", "instagram"],
    mediaUrls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"],
    shortenLinks: true,
  });
  console.log(post);

  return post.id;
};

/** Test Instagram post */
const testInstagramPost = async () => {
  const postInstagram = await social.post({
    post: "One more time",
    platforms: ["instagram"],
    media_urls: ["https://images.ayrshare.com/imgs/GhostBusters.jpg"],
    tagged: ["@ayrshare"],
    shorten_links: true,
  });
  console.log(postInstagram);
};

/** Test Upload -  Video required*/
const testVideoPost = async () => {
  const datauri = require("datauri");
  const content = await datauri("./test-video.mp4");
  const upload = await social.upload({
    file: content,
    fileName: "Test.mp4",
    description: "A great test",
  });
  console.log(upload);
};

const testAnalytics = async (id) => {
  const analytics = await social.analyticsPost({
    id,
    platforms: ["facebook", "instagram", "twitter", "linkedin"],
  });
  return console.log("Analytics:", analytics);
};

const testGetComments = async (id) => {
  const analytics = await social.getComments({
    id,
  });
  return console.log("Comments:", analytics);
};

const testPostComment = async (id) => {
  const analytics = await social.postComment({
    id,
    platforms: ["facebook", "instagram"],
    comment: "My thoughts exactly",
  });
  return console.log("Comments:", analytics);
};

/** Business Plan Membership - required  ---------------- */
const testCreateProfile = async () => {
  const createProfile = await social.createProfile({
    title: "Best Profile Title Ever",
  });
  console.log(createProfile);

  return createProfile.profileKey;
};

const testDeleteProfile = async (profileKey) => {
  const deleteProfile = await social.deleteProfile({
    profileKey: profileKey,
  });
  console.log(deleteProfile);
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
    profileKey: PROFILE_KEY,
  });

  return console.log("JWT", jwt);
};
/** ------------------------------------------------ */

const run = async () => {
  const id = await testPost();
  await testPostComment(id);
  await testAnalytics(id);
  await testGetComments(id);
  return testDelete(id);
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
*/

/** Business Plan */
// testCreateProfile();
// testCreateandDelete();
// testGenerateJWT();

run();
