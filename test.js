const SocialPost = require("./index.js");
const API_KEY = require("./api-key.json").API_KEY;  // Add your API Key to a .json file
const social = new SocialPost(API_KEY);

const test = async () => {
  /** Test post */
  const post = await social.post({
    post: "One more time",
    platforms: ["twitter"],
  });
  console.log(post);

  /** Test history */
  const history = await social.history({ lastRecords: 2, lastDays: 10 });
  console.log(history);

  /** Test delete */
  const deletePost = await social.delete({ bulk: [post.id] });
  console.log(deletePost);

  const user = await social.user();
  console.log(user);

  const feedAdd = await social.feedAdd({
    type: "substack",
    url: "https://bankless.substack.com/",
  });
  console.log(feedAdd);
};

test();
