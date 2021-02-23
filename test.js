const SocialPost = require("./index.js");
const API_KEY = require("./api-key.json").API_KEY; // Add your API Key to a .json file
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
    post: "One more time",
    platforms: ["twitter", "facebook", "linkedin"],
    shorten_links: true,
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

const testPostandDelete = async () => {
  const id = await testPost();
  return testDelete(id);
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
/** ------------------------------------------------ */

testPostandDelete();

/*
testHistory();
testUser();
testAutoSchedule();
testFeed();
testPost();
testInstagramPost();
testVideoPost();
*/

/** Business Plan */
// testCreateProfile();
// testCreateandDelete();
