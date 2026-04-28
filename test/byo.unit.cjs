"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const SocialMediaAPICjs = require("../index.cjs");

const BYO_KEY_HEADER = "X-Twitter-OAuth1-Api-Key";
const BYO_SECRET_HEADER = "X-Twitter-OAuth1-Api-Secret";

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
    assert.equal(headers["Profile-Key"], "PK");
    assert.equal(headers[BYO_KEY_HEADER], "ck");
    assert.equal(headers[BYO_SECRET_HEADER], "cs");
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
