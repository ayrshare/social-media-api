import got from "got";

const BASE_URL = "https://api.ayrshare.com/api";
// const BASE_URL = "http://localhost:5001/ayrshare/us-central1/api";
const ERROR_MSG = {
  status: "error",
  message:
    "Wrong parameters. Please check at https://docs.ayrshare.com/rest-api/endpoints"
};

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
    this.profileKey = null;
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`
    };

    if (this.profileKey) {
      headers["Profile-Key"] = this.profileKey;
    }

    return headers;
  }

  setProfileKey(profileKey) {
    this.profileKey = profileKey;
    return this;
  }

  post(data) {
    return doPost("post", data, this.getHeaders());
  }

  delete(data) {
    return doDelete("post", data, this.getHeaders());
  }

  updatePost(data) {
    return doPut("post", data, this.getHeaders());
  }

  retryPost(data) {
    return doPut("post/retry", data, this.getHeaders());
  }

  getPost(data) {
    const { id } = data;
    return doGet(`post/${id}`, this.getHeaders());
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

    return doGet(`history${id ? `/${id}` : ""}`, this.getHeaders(), params);
  }

  media(params) {
    return doGet("media", this.getHeaders(), params);
  }

  verifyMediaExists(params) {
    return doPost("media/urlExists", params, this.getHeaders());
  }

  mediaUploadUrl(params) {
    return doGet("media/uploadUrl", this.getHeaders(), params);
  }

  mediaMeta(params) {
    return doGet("media/meta", this.getHeaders(), params);
  }

  resizeImage(params) {
    return doPost("media/resize", params, this.getHeaders());
  }

  analyticsLinks(params) {
    return doGet("analytics/links", this.getHeaders(), params);
  }

  analyticsPost(data) {
    return doPost("analytics/post", data, this.getHeaders());
  }

  // new - DONE 1
  analyticsSocial(data) {
    return doPost("analytics/social", data, this.getHeaders());
  }

  user(params) {
    return doGet("user", this.getHeaders(), params);
  }

  upload(data) {
    return doPost("upload", data, this.getHeaders());
  }

  shorten(data) {
    return doPost("shorten", data, this.getHeaders());
  }

  feedAdd(data) {
    return doPost("feed", data, this.getHeaders());
  }

  feedDelete(data) {
    return doDelete("feed", data, this.getHeaders());
  }

  feedGet(data) {
    return doGet("feed", data, this.getHeaders());
  }

  feedUpdate(data) {
    return doPut("feed", data, this.getHeaders());
  }

  postComment(data) {
    return doPost("comments", data, this.getHeaders());
  }

  getComments(params) {
    const { id } = params;
    return doGet(`comments/${id}`, this.getHeaders(), params);
  }

  deleteComments(params) {
    const { id } = params;
    return doDelete(`comments/${id}`, params, this.getHeaders());
  }

  replyComment(params) {
    return doPost(`comments/reply`, params, this.getHeaders());
  }

  createProfile(data) {
    return doPost("profiles/profile", data, this.getHeaders());
  }

  deleteProfile(data) {
    return doDelete("profiles/profile", data, this.getHeaders());
  }

  updateProfile(data) {
    return doPut("profiles/profile", data, this.getHeaders());
  }

  getProfiles(params) {
    return doGet("profiles", this.getHeaders(), params);
  }

  generateJWT(data) {
    return doPost("profiles/generateJWT", data, this.getHeaders());
  }

  unlinkSocial(data) {
    return doDelete("profiles/social", data, this.getHeaders());
  }

  setAutoSchedule(data) {
    return doPost("auto-schedule/set", data, this.getHeaders());
  }

  deleteAutoSchedule(data) {
    return doDelete("auto-schedule/delete", data, this.getHeaders());
  }

  listAutoSchedule(params) {
    return doGet("auto-schedule/list", this.getHeaders(), params);
  }

  registerWebhook(data) {
    return doPost("hook/webhook", data, this.getHeaders());
  }

  unregisterWebhook(data) {
    return doDelete("hook/webhook", data, this.getHeaders());
  }

  listWebhooks(params) {
    return doGet("hook/webhook", this.getHeaders(), params);
  }

  getBrandByUser(params) {
    return doGet("brand/byUser", this.getHeaders(), params);
  }

  generatePost(params) {
    return doPost("generate/post", params, this.getHeaders());
  }

  generateRewrite(params) {
    return doPost("generate/rewrite", params, this.getHeaders());
  }

  generateTranscription(params) {
    return doPost("generate/transcription", params, this.getHeaders());
  }

  generateTranslation(params) {
    return doPost("generate/translate", params, this.getHeaders());
  }

  generateAltText(params) {
    return doPost("generate/altText", params, this.getHeaders());
  }

  autoHashtags(params) {
    return doPost("hashtags/auto", params, this.getHeaders());
  }

  recommendHashtags(params) {
    return doGet(`hashtags/recommend`, this.getHeaders(), params);
  }

  checkBannedHashtags(params) {
    return doGet("hashtags/banned", this.getHeaders(), params);
  }

  shortLink(params) {
    return doPost("links", params, this.getHeaders());
  }

  shortLinkAnalytics(params) {
    const { id } = params;
    return doGet(`links/${id}`, this.getHeaders(), params);
  }

  reviews(params) {
    return doGet("reviews", this.getHeaders(), params);
  }

  review(params) {
    const { id } = params;
    return doGet(`reviews/${id}`, this.getHeaders(), params);
  }

  replyReview(params) {
    return doPost("reviews", params, this.getHeaders());
  }

  deleteReplyReview(params) {
    return doDelete("reviews", params, this.getHeaders());
  }
}

export default SocialMediaAPI;