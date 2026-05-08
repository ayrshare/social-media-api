# Changelog

## [1.3.0] 2026-04-28

- Added `setTwitterBYO(apiKey, apiSecret)` and `clearTwitterBYO()` for X/Twitter Bring-Your-Own-Keys support. Both are chainable. When set, every outbound request includes `X-Twitter-OAuth1-Api-Key` and `X-Twitter-OAuth1-Api-Secret` headers — required for X/Twitter operations through Ayrshare as of the March 31, 2026 BYO enforcement. Headers are injected on every X-bound endpoint (post, history, delete, analytics, comments, etc.), not only on `post`.
- Refactored CommonJS build (`index.cjs`) to share the same dynamic `getHeaders()` model as the ESM build. CJS consumers also get `setProfileKey` for the first time (previously ESM-only).
- Fixed `feedGet` argument order in both `index.js` and `index.cjs`. The call was passing the headers object as the URL params slot, which serialized `Authorization` and `Profile-Key` (and any future BYO headers) into the request URL while sending no auth at all. Auth material no longer leaks into URLs or access logs.
- README: documented BYO setup, multi-tenant rotation, the recommendation to verify with `analyticsSocial`, the credential-handling guidance (env vars / secret manager), and that `generateJWT` accepts the same headers. Added a deprecation notice that RSS auto-posting to X/Twitter ended on March 31, 2026 (other platforms unaffected).
- Tests: added 6 unit tests via `node:test` covering CJS + ESM parity (absent / set / cleared / chainable / coexists with `Profile-Key` / clearing BYO leaves `Profile-Key` intact) plus a transport-level regression test that mocks `got.get` and asserts auth and BYO headers land in the headers slot — never in the URL — for `feedGet`.

## [1.2.6] 2024-12-16

- Updated to Profile Key for Business Plan.

## [1.2.5] 2024-11-27

- More updates to new API [docs](https://www.ayrshare.com/docs/apis/)

## [1.2.4] 2024-11-21

- Update to new API [docs](https://www.ayrshare.com/docs/apis/)

## [1.2.3] 2024-05-03

- Added new endpoints with examples including resize, verify, webhooks, and more. Please see ReadMe for details.
- Added new test cases.
- Switch endpoint calls from app.ayrshare.com to api.ayrshare.com.
- Moved code to support ES Module, but also still CommonJS.
- Updated packages.

### Breaking Changes

- Renamed the package from `social-post-api` to `social-media-api`. Be sure to update your package require/import.
- Class export changed from `SocialPost` to `SocialMediaAPI`.

Why the change? Because as Ayrshare has matured we've gone well beyond just posting.

## [1.1.1] 2022-11-17

- Added new functions: `updateProfile`, `unlinkSocial`, `getBrandByUser`.
- Added `history` get all posts.
- Updated code examples and docs.

No breaking changes.
