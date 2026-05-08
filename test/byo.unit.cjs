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

  test(`${label}: setTwitterByo injects both headers with correct values`, () => {
    const s = new SDK("API_KEY");
    s.setTwitterByo("ck_123", "cs_456");
    const headers = s.getHeaders();
    assert.equal(headers[BYO_KEY_HEADER], "ck_123");
    assert.equal(headers[BYO_SECRET_HEADER], "cs_456");
  });

  test(`${label}: clearTwitterByo removes both headers`, () => {
    const s = new SDK("API_KEY");
    s.setTwitterByo("ck_123", "cs_456");
    s.clearTwitterByo();
    const headers = s.getHeaders();
    assert.equal(headers[BYO_KEY_HEADER], undefined);
    assert.equal(headers[BYO_SECRET_HEADER], undefined);
  });

  test(`${label}: setTwitterByo and clearTwitterByo are chainable`, () => {
    const s = new SDK("API_KEY");
    assert.equal(s.setTwitterByo("a", "b"), s);
    assert.equal(s.clearTwitterByo(), s);
  });

  test(`${label}: BYO coexists with profileKey`, () => {
    const s = new SDK("API_KEY");
    s.setProfileKey("PK").setTwitterByo("ck", "cs");
    const headers = s.getHeaders();
    assert.equal(headers[PROFILE_KEY_HEADER], "PK");
    assert.equal(headers[BYO_KEY_HEADER], "ck");
    assert.equal(headers[BYO_SECRET_HEADER], "cs");
  });

  test(`${label}: clearTwitterByo leaves profileKey untouched`, () => {
    const s = new SDK("API_KEY");
    s.setProfileKey("PK").setTwitterByo("ck", "cs").clearTwitterByo();
    const headers = s.getHeaders();
    assert.equal(headers[PROFILE_KEY_HEADER], "PK");
    assert.equal(headers[BYO_KEY_HEADER], undefined);
    assert.equal(headers[BYO_SECRET_HEADER], undefined);
  });

  test(`${label}: setTwitterByo throws TypeError on empty / whitespace / non-string args`, () => {
    const s = new SDK("API_KEY");
    assert.throws(() => s.setTwitterByo("", "cs"), TypeError);
    assert.throws(() => s.setTwitterByo("ck", ""), TypeError);
    // Whitespace-only must be rejected too — common copy/paste footgun.
    assert.throws(() => s.setTwitterByo("   ", "cs"), TypeError);
    assert.throws(() => s.setTwitterByo("ck", "\t\n "), TypeError);
    assert.throws(() => s.setTwitterByo(undefined, "cs"), TypeError);
    assert.throws(() => s.setTwitterByo("ck"), TypeError);
    assert.throws(() => s.setTwitterByo(null, "cs"), TypeError);
    assert.throws(() => s.setTwitterByo(123, "cs"), TypeError);
    assert.throws(() => s.setTwitterByo("ck", { secret: true }), TypeError);
    // After every failed call, BYO state remains unset.
    assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
    assert.equal(s.getHeaders()[BYO_SECRET_HEADER], undefined);
  });

  test(`${label}: two SDK instances have independent BYO state`, () => {
    const a = new SDK("API_KEY_A").setTwitterByo("ck_a", "cs_a");
    const b = new SDK("API_KEY_B");
    // b never called setTwitterByo — must have no BYO headers.
    assert.equal(b.getHeaders()[BYO_KEY_HEADER], undefined);
    assert.equal(b.getHeaders()[BYO_SECRET_HEADER], undefined);
    // a still has its own state.
    assert.equal(a.getHeaders()[BYO_KEY_HEADER], "ck_a");
    assert.equal(a.getHeaders()[BYO_SECRET_HEADER], "cs_a");
    // Mutating b never touches a.
    b.setTwitterByo("ck_b", "cs_b");
    assert.equal(a.getHeaders()[BYO_KEY_HEADER], "ck_a");
    assert.equal(b.getHeaders()[BYO_KEY_HEADER], "ck_b");
    // Clearing b never touches a.
    b.clearTwitterByo();
    assert.equal(a.getHeaders()[BYO_KEY_HEADER], "ck_a");
    assert.equal(b.getHeaders()[BYO_KEY_HEADER], undefined);
  });
};

runSuite("CJS", SocialMediaAPICjs);

test("ESM: headers absent when BYO never set, present when set, gone after clear", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
  s.setTwitterByo("ck", "cs");
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], "ck");
  assert.equal(s.getHeaders()[BYO_SECRET_HEADER], "cs");
  s.clearTwitterByo();
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
  assert.equal(s.getHeaders()[BYO_SECRET_HEADER], undefined);
});

test("ESM: setTwitterByo and clearTwitterByo are chainable", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  assert.equal(s.setTwitterByo("a", "b"), s);
  assert.equal(s.clearTwitterByo(), s);
});

test("ESM: BYO coexists with profileKey and clearTwitterByo leaves it untouched", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  s.setProfileKey("PK").setTwitterByo("ck", "cs");
  let headers = s.getHeaders();
  assert.equal(headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(headers[BYO_KEY_HEADER], "ck");
  assert.equal(headers[BYO_SECRET_HEADER], "cs");

  s.clearTwitterByo();
  headers = s.getHeaders();
  assert.equal(headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(headers[BYO_KEY_HEADER], undefined);
  assert.equal(headers[BYO_SECRET_HEADER], undefined);
});

test("ESM: setTwitterByo throws TypeError on empty / whitespace / non-string args", async () => {
  const { default: SDK } = await import("../index.js");
  const s = new SDK("API_KEY");
  assert.throws(() => s.setTwitterByo("", "cs"), TypeError);
  assert.throws(() => s.setTwitterByo("ck", ""), TypeError);
  assert.throws(() => s.setTwitterByo("   ", "cs"), TypeError);
  assert.throws(() => s.setTwitterByo("ck", "\t\n "), TypeError);
  assert.throws(() => s.setTwitterByo(undefined, "cs"), TypeError);
  assert.throws(() => s.setTwitterByo(null, "cs"), TypeError);
  assert.throws(() => s.setTwitterByo(123, "cs"), TypeError);
  assert.equal(s.getHeaders()[BYO_KEY_HEADER], undefined);
});

test("ESM: two SDK instances have independent BYO state", async () => {
  const { default: SDK } = await import("../index.js");
  const a = new SDK("API_KEY_A").setTwitterByo("ck_a", "cs_a");
  const b = new SDK("API_KEY_B");
  assert.equal(b.getHeaders()[BYO_KEY_HEADER], undefined);
  assert.equal(a.getHeaders()[BYO_KEY_HEADER], "ck_a");
  b.setTwitterByo("ck_b", "cs_b");
  assert.equal(a.getHeaders()[BYO_KEY_HEADER], "ck_a");
  assert.equal(b.getHeaders()[BYO_KEY_HEADER], "ck_b");
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
      .setTwitterByo("ck_123", "cs_456");
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

// X-bound endpoints other than /post must also carry BYO. Server returns
// 419 x_credentials_required if they don't, so every path matters — not
// just the post path.
test("transport: history sends BYO + Profile-Key headers (non-/post X-bound endpoint)", async () => {
  const got = require("got");
  const originalGet = got.get;
  const captured = [];
  got.get = (url, opts) => {
    captured.push({ url, opts });
    return Promise.resolve({ body: { status: "success", history: [] } });
  };

  try {
    const s = new SocialMediaAPICjs("API_KEY")
      .setProfileKey("PK")
      .setTwitterByo("ck_999", "cs_888");
    await s.history({ lastDays: 7, platform: "twitter" });
  } finally {
    got.get = originalGet;
  }

  assert.equal(captured.length, 1);
  const { url, opts } = captured[0];

  // BYO + Profile-Key + Authorization all in headers slot.
  assert.equal(opts.headers["Authorization"], "Bearer API_KEY");
  assert.equal(opts.headers[PROFILE_KEY_HEADER], "PK");
  assert.equal(opts.headers[BYO_KEY_HEADER], "ck_999");
  assert.equal(opts.headers[BYO_SECRET_HEADER], "cs_888");

  // history(...) routes to /history/<platform> when platform is provided.
  assert.ok(url.startsWith("https://api.ayrshare.com/api/history/twitter?"),
    `expected /history/twitter path, got ${url}`);
  assert.ok(url.includes("lastDays=7"));
  assert.ok(!url.includes("Bearer"));
  assert.ok(!url.includes("X-Twitter-OAuth1"));
});

// 419 x_credentials_required is the error users hit during the BYO migration
// when they forget the headers entirely. The SDK swallows transport errors
// and returns the response body to the caller — confirm the body surfaces
// unchanged so callers can self-diagnose on `code` / `action` / `message`.
test("transport: SDK surfaces 419 x_credentials_required body unchanged", async () => {
  const got = require("got");
  const originalGet = got.get;
  const errorBody = {
    action: "x_credentials_required",
    status: "error",
    code: 419,
    message:
      "X/Twitter operations require your own API credentials. Missing: " +
      "X-Twitter-OAuth1-Api-Key, X-Twitter-OAuth1-Api-Secret. Please " +
      "provide your X Developer App credentials in the request headers. " +
      "See https://docs.ayrshare.com/x-api-setup for setup instructions.",
    resolution: { docs: "https://docs.ayrshare.com/x-api-setup" },
    platform: "twitter"
  };
  got.get = () => {
    // Mirror got@11's HTTPError shape: rejected with a response object
    // whose body is the parsed JSON error payload.
    return Promise.reject({
      response: { statusCode: 419, body: errorBody }
    });
  };

  let result;
  try {
    // Caller forgot to call setTwitterByo — exactly the migration footgun.
    const s = new SocialMediaAPICjs("API_KEY");
    result = await s.history({ platform: "twitter" });
  } finally {
    got.get = originalGet;
  }

  // SDK must not swallow / repackage these fields — caller needs them
  // to programmatically detect the missing-BYO case.
  assert.equal(result.code, 419);
  assert.equal(result.action, "x_credentials_required");
  assert.equal(result.status, "error");
  assert.equal(result.platform, "twitter");
  assert.match(result.message, /X-Twitter-OAuth1-Api-Key/);
  assert.match(result.message, /X-Twitter-OAuth1-Api-Secret/);
  assert.equal(result.resolution.docs, "https://docs.ayrshare.com/x-api-setup");
});
