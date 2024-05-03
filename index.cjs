'use strict';

var got = require('got');

const BASE_URL = "https://api.ayrshare.com/api";

const preProcess = (data) => {
  data.source = "npm";

  return data;
};

const doPost = (endpoint, data, headers) => {
  return got
    .post(`${BASE_URL}/${endpoint}`, {
      headers,
      json: preProcess(data),
      responseType: "json"
    })
    .then((res) => res.body)
    .catch((err) => {
      if (err && err.response && err.response.body) {
        return err.response.body;
      } else {
        return err;
      }
    });
};

const doDelete = (endpoint, data, headers) => {
  return got
    .delete(`${BASE_URL}/${endpoint}`, {
      headers,
      json: preProcess(data),
      responseType: "json"
    })
    .then((res) => res.body)
    .catch((err) => {
      if (err && err.response && err.response.body) {
        return err.response.body;
      } else {
        return err;
      }
    });
};

const doPut = (endpoint, data, headers) => {
  return got
    .put(`${BASE_URL}/${endpoint}`, {
      headers,
      json: preProcess(data),
      responseType: "json"
    })
    .then((res) => res.body)
    .catch((err) => {
      if (err && err.response && err.response.body) {
        return err.response.body;
      } else {
        return err;
      }
    });
};

const buildParams = (data) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value, i) => params.append(`${key}[${i}]`, value));
    } else {
      params.append(key, value);
    }
  });

  return params.toString();
};

const doGet = (endpoint, headers, params) => {
  const url = `${BASE_URL}/${endpoint}?${
    params ? buildParams(preProcess(params)) : "source=npm"
  }`;

  return got
    .get(url, {
      headers,
      responseType: "json"
    })
    .then((res) => res.body)
    .catch((err) => {
      if (err && err.response && err.response.body) {
        return err.response.body;
      } else {
        return err;
      }
    });
};

class SocialMediaAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    };
  }

  post(data) {
    return doPost("post", data, this.headers);
  }

  delete(data) {
    return doDelete("post", data, this.headers);
  }

  updatePost(data) {
    return doPut("post", data, this.headers);
  }

  retryPost(data) {
    return doPut("post/retry", data, this.headers);
  }

  getPost(data) {
    const { id } = data;
    return doGet(`post/${id}`, this.headers);
  }

  /**
   * Handle history, history by id, and get all history
   */
  history(params) {
    const id =
      params && params.id
        ? params.id
        : params && params.platform
        ? params.platform
        : null;

    return doGet(`history${id ? `/${id}` : ""}`, this.headers, params);
  }

  media(params) {
    return doGet("media", this.headers, params);
  }

  verifyMediaExists(params) {
    return doPost("media/urlExists", params, this.headers);
  }

  mediaUploadUrl(params) {
    return doGet("media/uploadUrl", this.headers, params);
  }

  mediaMeta(params) {
    return doGet("media/meta", this.headers, params);
  }

  resizeImage(params) {
    return doPost("media/resize", params, this.headers);
  }

  analyticsLinks(params) {
    return doGet("analytics/links", this.headers, params);
  }

  analyticsPost(data) {
    return doPost("analytics/post", data, this.headers);
  }

  // new - DONE 1
  analyticsSocial(data) {
    return doPost("analytics/social", data, this.headers);
  }

  user(params) {
    return doGet("user", this.headers, params);
  }

  upload(data) {
    return doPost("upload", data, this.headers);
  }

  shorten(data) {
    return doPost("shorten", data, this.headers);
  }

  feedAdd(data) {
    return doPost("feed", data, this.headers);
  }

  feedDelete(data) {
    return doDelete("feed", data, this.headers);
  }

  feedGet(data) {
    return doGet("feed", data, this.headers);
  }

  feedUpdate(data) {
    return doPut("feed", data, this.headers);
  }

  postComment(data) {
    return doPost("comments", data, this.headers);
  }

  getComments(params) {
    const { id } = params;
    return doGet(`comments/${id}`, this.headers, params);
  }

  deleteComments(params) {
    const { id } = params;
    return doDelete(`comments/${id}`, params, this.headers);
  }

  replyComment(params) {
    return doPost(`comments/reply`, params, this.headers);
  }

  createProfile(data) {
    return doPost("profiles/profile", data, this.headers);
  }

  deleteProfile(data) {
    return doDelete("profiles/profile", data, this.headers);
  }

  updateProfile(data) {
    return doPut("profiles/profile", data, this.headers);
  }

  getProfiles(params) {
    return doGet("profiles", this.headers, params);
  }

  generateJWT(data) {
    return doPost("profiles/generateJWT", data, this.headers);
  }

  unlinkSocial(data) {
    return doDelete("profiles/social", data, this.headers);
  }

  setAutoSchedule(data) {
    return doPost("auto-schedule/set", data, this.headers);
  }

  deleteAutoSchedule(data) {
    return doDelete("auto-schedule/delete", data, this.headers);
  }

  listAutoSchedule(params) {
    return doGet("auto-schedule/list", this.headers, params);
  }

  registerWebhook(data) {
    return doPost("hook/webhook", data, this.headers);
  }

  unregisterWebhook(data) {
    return doDelete("hook/webhook", data, this.headers);
  }

  listWebhooks(params) {
    return doGet("hook/webhook", this.headers, params);
  }

  getBrandByUser(params) {
    return doGet("brand/byUser", this.headers, params);
  }

  generatePost(params) {
    return doPost("generate/post", params, this.headers);
  }

  generateRewrite(params) {
    return doPost("generate/rewrite", params, this.headers);
  }

  generateTranscription(params) {
    return doPost("generate/transcription", params, this.headers);
  }

  generateTranslation(params) {
    return doPost("generate/translate", params, this.headers);
  }

  generateAltText(params) {
    return doPost("generate/altText", params, this.headers);
  }

  autoHashtags(params) {
    return doPost("hashtags/auto", params, this.headers);
  }

  recommendHashtags(params) {
    return doGet(`hashtags/recommend`, this.headers, params);
  }

  checkBannedHashtags(params) {
    return doGet("hashtags/banned", this.headers, params);
  }

  shortLink(params) {
    return doPost("links", params, this.headers);
  }

  shortLinkAnalytics(params) {
    const { id } = params;
    return doGet(`links/${id}`, this.headers, params);
  }

  reviews(params) {
    return doGet("reviews", this.headers, params);
  }

  review(params) {
    const { id } = params;
    return doGet(`reviews/${id}`, this.headers, params);
  }

  replyReview(params) {
    return doPost("reviews", params, this.headers);
  }

  deleteReplyReview(params) {
    return doDelete("reviews", params, this.headers);
  }
}

module.exports = SocialMediaAPI;
