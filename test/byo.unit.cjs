"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const SocialMediaAPICjs = require("../index.cjs");

const BYO_KEY_HEADER = "X-Twitter-OAuth1-Api-Key";
const BYO_SECRET_HEADER = "X-Twitter-OAuth1-Api-Secret";
const PROFILE_KEY_HEADER = "Profile-Key";

const runSuite = (label, SDK) => {
  test(`${label}: headers absent when BYO never set`, () => {
    const s = new SDK("API_KEY");
    const headers = s.getHeaders();
    assert.equal(headers[BYO_KEY_HEADER], undefined);
    assert.equal(headers[BYO_SECRET_HEADER], undefined);
  });

  test(`${label}: setTwitterBYO injects both headers with correct values`, () => {
    const s = new SDK("API_KEY");
    s.setTwitterBYO("ck_123", "cs_456");
    const headers = s.getHeaders();
    assert.equal(headers[BYO_KEY_HEADER], "ck_123");
    assert.equal(headers[BYO_SECRET_HEADER], "cs_456");
  });

  test(`${label}: clearTwitterBYO removes both headers`, () => {
    const s = new SDK("API_KEY");
    s.setTwitterBYO("ck_123", "cs_456");
    s.clearTwitterBYO();
    const headers = s.getHeaders();
    assert.equal(headers[BYO_KEY_HEADER], undefined);
    assert.equal(headers[BYO_SECRET_HEADER], undefined);
  });

  test(`${label}: setTwitterBYO and clearTwitterBYO are chainable`, () => {
    const s = new SDK("API_KEY");
    assert.equal(s.setTwitterBYO("a", "b"), s);
    assert.equal(s.clearTwitterBYO(), s);
  });

  test(`${label}: BYO coexists with profileKey`, () => {
    const s = new SDK("API_KEY");
    s.setProfileKey("PK").setTwitterBYO("ck", "cs");
    const headers = s.getHeaders();
    assert.equal(headers[PROFILE_KEY_HEADER], "PK");
    assert.equal(headers[BYO_KEY_HEADER], "ck");
    assert.equal(headers[BYO_SECRET_HEADER], "cs");
  });

  test(`${label}: clearTwitterBYO leaves profileKey untouched`, () => {
    const s = new SDK("API_KEY");
    s.setProfileKey("PK").setTwitterBYO("ck", "cs").clearTwitterBYO();
    const headers = s.getHeaders();
    assert.equal(headers[PROFILE_KEY_HEADER], "PK");
    assert.equal(headers[BYO_KEY_HEADER], undefined);
    assert.equal(headers[BYO_SECRET_HEADER], undefined);
  });
};

runSuite("CJS", SocialMediaAPICjs);

test("ESM: headers absent when BYO never set, present when set, gone after clear", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
  s.setTwitterBYO("ck", "cs");
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], "ck");
  assert.equal(s.getHeaders()[BYO_SECRET_HEADER], "cs");
  s.clearTwitterBYO();
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
  assert.equal(s.getHeaders()[BYO_SECRET_HEADER], undefined);
});

test("ESM: setTwitterBYO and clearTwitterBYO are chainable", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  assert.equal(s.setTwitterBYO("a", "b"), s);
  assert.equal(s.clearTwitterBYO(), s);
});

test("ESM: BYO coexists with profileKey and clearTwitterBYO leaves it untouched", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  s.setProfileKey("PK").setTwitterBYO("ck", "cs");
  let headers = s.getHeaders();
  assert.equal(headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(headers[BYO_KEY_HEADER], "ck");
  assert.equal(headers[BYO_SECRET_HEADER], "cs");

  s.clearTwitterBYO();
  headers = s.getHeaders();
  assert.equal(headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(headers[BYO_KEY_HEADER], undefined);
  assert.equal(headers[BYO_SECRET_HEADER], undefined);
});

// Transport-level regression test for the feedGet class of bug:
// confirm that on a real GET method, headers land in the headers slot and
// caller params land in the URL — not the other way around.
test("transport: feedGet sends auth/BYO/Profile-Key as headers, not as URL params", async () => {
  const got = require("got");
  const originalGet = got.get;
  const captured = [];
  got.get = (url, opts) => {
    captured.push({ url, opts });
    return Promise.resolve({ body: { ok: true } });
  };

  try {
    const s = new SocialMediaAPICjs("API_KEY")
      .setProfileKey("PK")
      .setTwitterBYO("ck_123", "cs_456");
    await s.feedGet({ lastRecords: 5 });
  } finally {
    got.get = originalGet;
  }

  assert.equal(captured.length, 1, "got.get should have been called exactly once");
  const { url, opts } = captured[0];

  // Headers slot — auth material must live here.
  assert.equal(opts.headers["Authorization"], "Bearer API_KEY");
  assert.equal(opts.headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(opts.headers[BYO_KEY_HEADER], "ck_123");
  assert.equal(opts.headers[BYO_SECRET_HEADER], "cs_456");

  // URL slot — caller params live here, never auth material.
  assert.ok(url.includes("lastRecords=5"), `expected lastRecords in URL, got ${url}`);
  assert.ok(!url.includes("Bearer"), `URL must not contain bearer token, got ${url}`);
  assert.ok(
    !url.includes("X-Twitter-OAuth1"),
    `URL must not contain BYO header names, got ${url}`
  );
  assert.ok(
    !url.includes("ck_123") && !url.includes("cs_456"),
    `URL must not contain BYO credential values, got ${url}`
  );
  assert.ok(
    !url.includes("Profile-Key=") && !url.includes("PK&") && !url.endsWith("PK"),
    `URL must not contain Profile-Key value as a param, got ${url}`
  );
});
