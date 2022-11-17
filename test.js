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
    url: "https://bankless.substack.com/",
  });
  console.log("testFeed:", feedAdd);
};

/** Test Auto Schedule */
const testAutoSchedule = async () => {
  const setAutoSchedule = await social.setAutoSchedule({
    schedule: ["13:05Z", "20:14Z"],
    title: "test",
  });
  console.log("testAutoSchedule:", setAutoSchedule);
};

/** Test delete */
const testDelete = async (id) => {
  const deletePost = await social.delete({ id });
  console.log("testDelete:", deletePost);
};

/** Test post */
const testPost = async () => {
  const post = await social.post({
    randomPost: true,
    // platforms: ["twitter", "facebook", "linkedin", "instagram"],
    platforms: ["twitter"],
    randomMediaUrl: true,
    shortenLinks: true,
    requiresApproval: true,
  });
  console.log("testPost: ", post);

  return post.id;
};

/** Test Post Update */
const testPostUpdate = async (id) => {
  const post = await social.updatePost({
    id,
    approved: true,
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
    shorten_links: true,
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
    description: "A great test",
  });
  console.log("testVideoPost:", upload);
};

const testAnalytics = async (id) => {
  const analytics = await social.analyticsPost({
    id,
    // platforms: ["facebook", "instagram", "twitter", "linkedin"],
    platforms: ["facebook"],
  });
  return console.log("testAnalytics:", analytics);
};

const testAnalyticsSocial = async (platforms) => {
  const analytics = await social.analyticsSocial({
    platforms,
  });
  return console.log("testAnalyticsSocial:", analytics);
};

const testGetComments = async (id) => {
  const analytics = await social.getComments({
    id,
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
    comment: "My thoughts exactly",
  });
  return console.log("testPostComment:", analytics);
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
    profileKey: PROFILE_KEY,
  });

  return console.log("testGenerateJWT", jwt);
};

const testUpdateProfile = async (profileKey) => {
  const updateProfile = await social.updateProfile({
    profileKey,
    title: "A Nice Title",
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
    instagramUser: username,
  });
  console.log("testGetBrandByUser:", getBrandByUser);
};
/** ------------------------------------------------ */

const run = async () => {
  const id = await testPost();
  // const update = await testPostUpdate(id);
  // await testPostComment(id);
  // await testAnalytics("lZDx0mCKwpgCHGp9gLy5");
  // await testGetComments(id);
  // testDelete(id);
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
*/

/** Business Plan */
/*
  testCreateProfile();
  testCreateandDelete();
  testGenerateJWT();
  testUnlinkSocial(PROFILE_KEY, "twitter");
  testGetBrandByUser(["instagram"], "@ayrshare");
  testUpdateProfile(PROFILE_KEY);
*/

run();
