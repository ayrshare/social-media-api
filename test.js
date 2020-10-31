const SocialPost = require("./index.js");
const API_KEY = require("./api-key.json").API_KEY;  // Add your API Key to a .json file
const social = new SocialPost(API_KEY);

const test = async () => {
  /** Test post */
  const post = await social.post({
    post: "One more time",
    platforms: ["twitter", "facebook", "linkedin"],
    shorten_links: true
  });
  console.log(post);

  /** Test history */
  const history = await social.history({ lastRecords: 2, lastDays: 10 });
  console.log(history);

  /** Test delete */
  const deletePost = await social.delete({ bulk: [post.id] });
  console.log(deletePost);

  /** Test get details on the current user */
  const user = await social.user();
  console.log(user);

  /** Test Add a feed */
  const feedAdd = await social.feedAdd({
    type: "substack",
    url: "https://bankless.substack.com/",
  });
  console.log(feedAdd);

  /** Business Membership - required  ---------------- */
  const createProfile = await social.createProfile({
    title: "Best Profile Title Ever"
  });
  console.log(createProfile);

  const deleteProfile = await social.deleteProfile({
    profileKey: createProfile.profileKey
  });
  console.log(deleteProfile);
  /** ------------------------------------------------ */
};

test();
