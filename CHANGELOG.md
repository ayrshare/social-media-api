# Changelog

## [1.3.0] 2026-04-28

- Added `setTwitterBYO(apiKey, apiSecret)` and `clearTwitterBYO()` for X/Twitter Bring-Your-Own-Keys support. When set, every outbound request includes `X-Twitter-OAuth1-Api-Key` and `X-Twitter-OAuth1-Api-Secret` headers — required for posting to X after the March 31, 2026 BYO enforcement date.
- Refactored CommonJS build (`index.cjs`) to share the same `getHeaders()` model as the ESM build, which also brings `setProfileKey` to CJS consumers.

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
