// Sibling of the Python SDK's API-KEY.json — same fields, JS module form.
//
// USAGE:
//   cp config.example.js config.js
//   # then fill in the values below
//
// `config.js` is gitignored; `config.example.js` is the tracked template.
// Never commit real credentials.
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
