const { SocialPost } = require("./index.js");
const API_KEY = require("./api-key.json").API_KEY;
const social = new SocialPost(API_KEY);

const test = async () => {
  /** Test post */
  const post = await social.post({
    post: "One more time",
    platforms: ["twitter"],
  });
  console.log(post);

  /** Test history */
  const history = await social.history();
  console.log(history);

  /** Test delete */
  const deletePost = await social.delete({
    id: post.id,
  });
  console.log(deletePost);
};

test();
