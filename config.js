// Sibling of Python's API-KEY.json — same fields, JS module form.
// Keep this file out of source control (already in .gitignore).
//
// X/Twitter posting requires BYO consumer credentials on the request
// (`setTwitterByo`). See:
// https://www.ayrshare.com/docs/dashboard/connect-social-accounts/x-twitter-byo-keys
export default {
  API_KEY: "API_KEY",
  PROFILE_KEY: "PROFILE_KEY",
  // Optional — only needed if you exercise X/Twitter in the smoke tests.
  // Both must be set together; the SDK throws if only one is provided.
  TWITTER_CONSUMER_KEY: "",
  TWITTER_CONSUMER_SECRET: "",
  // Optional — Business Plan, only used by testGenerateJWT.
  DOMAIN: ""
};
