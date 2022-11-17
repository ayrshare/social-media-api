const got = require("got");

const BASE_URL = "https://app.ayrshare.com/api";
// const BASE_URL = "http://localhost:5001/ayrshare/us-central1/api";
const ERROR_MSG = {
  status: "error",
  message:
    "Wrong parameters. Please check at https://docs.ayrshare.com/rest-api/endpoints",
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
      responseType: "json",
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
      responseType: "json",
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
      responseType: "json",
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
      value.forEach((value, i) =>
        params.append(`${key}[${i}]`, value.toString())
      );
    } else {
      params.append(key, value.toString());
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
      responseType: "json",
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

class SocialPost {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  }

  post(data) {
    const { post, randomPost, platforms } = data;

    if ((!post && !randomPost) || !platforms || platforms.length === 0) {
      return ERROR_MSG;
    }

    return doPost("post", data, this.headers);
  }

  delete(data) {
    const { id, bulk } = data;

    if (!id && !bulk) {
      return ERROR_MSG;
    }

    return doDelete("post", data, this.headers);
  }

  updatePost(data) {
    const { id } = data;

    if (!id) {
      return ERROR_MSG;
    }

    return doPut("post", data, this.headers);
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

  analyticsLinks(params) {
    return doGet("analytics/links", this.headers, params);
  }

  analyticsPost(data) {
    const { id, platforms } = data;

    if (!id || !platforms) {
      return ERROR_MSG;
    }

    return doPost("analytics/post", data, this.headers);
  }

  // new - DONE 1 
  analyticsSocial(data) {
    const { platforms } = data;

    if (!platforms) {
      return ERROR_MSG;
    }

    return doPost("analytics/social", data, this.headers);
  }

  user(params) {
    return doGet("user", this.headers, params);
  }

  upload(data) {
    const { file } = data;

    if (!file) {
      return ERROR_MSG;
    }

    return doPost("upload", data, this.headers);
  }

  shorten(data) {
    const { url } = data;

    if (!url) {
      return ERROR_MSG;
    }

    return doPost("shorten", data, this.headers);
  }

  feedAdd(data) {
    const { url } = data;

    if (!url) {
      return ERROR_MSG;
    }

    return doPost("feed", data, this.headers);
  }

  feedDelete(data) {
    const { id } = data;

    if (!id) {
      return ERROR_MSG;
    }

    return doDelete("feed", data, this.headers);
  }

  feedGet(data) {
    return doGet("feed", data, this.headers);
  }

  feedUpdate(data) {
    const { id } = data;

    if (!id) {
      return ERROR_MSG;
    }

    return doPut("feed", data, this.headers);
  }

  postComment(data) {
    const { id, platforms, comment } = data;

    if (!id || !platforms || !comment) {
      return ERROR_MSG;
    }

    return doPost("comments", data, this.headers);
  }

  getComments(params) {
    return doGet("comments", this.headers, params);
  }

  createProfile(data) {
    const { title } = data;

    if (!title) {
      return ERROR_MSG;
    }

    return doPost("profiles/profile", data, this.headers);
  }

  deleteProfile(data) {
    const { profileKey } = data;

    if (!profileKey) {
      return ERROR_MSG;
    }

    return doDelete("profiles/profile", data, this.headers);
  }

  updateProfile(data) {
    const { profileKey } = data;

    if (!profileKey) {
      return ERROR_MSG;
    }

    return doPut("profiles/profile", data, this.headers);
  }

  getProfiles(params) {
    return doGet("profiles", this.headers, params);
  }

  generateJWT(data) {
    const { domain, privateKey, profileKey } = data;

    if (!domain || !privateKey || !profileKey) {
      return ERROR_MSG;
    }

    return doPost("profiles/generateJWT", data, this.headers);
  }

  unlinkSocial(data) {
    const { profileKey, platform } = data;

    if (!profileKey || !platform) {
      return ERROR_MSG;
    }

    return doDelete("profiles/social", data, this.headers);
  }

  setAutoSchedule(data) {
    const { schedule } = data;

    if (!schedule) {
      return ERROR_MSG;
    }

    return doPost("auto-schedule/set", data, this.headers);
  }

  deleteAutoSchedule(data) {
    return doDelete("auto-schedule/delete", data, this.headers);
  }

  listAutoSchedule(params) {
    return doGet("auto-schedule/list", this.headers, params);
  }

  registerWebook(data) {
    const { action, url } = data;

    if (!action || !url) {
      return ERROR_MSG;
    }

    return doPost("hook/webhook", data, this.headers);
  }

  unregisterWebhook(data) {
    const { action } = data;

    if (!action) {
      return ERROR_MSG;
    }

    return doDelete("hook/webhook", data, this.headers);
  }

  listWebhooks(params) {
    return doGet("hook/webhook", this.headers, params);
  }

  getBrandByUser(params) {
    const { platforms } = params;

    if (!platforms) {
      return ERROR_MSG;
    }

    return doGet("brand/byUser", this.headers, params);
  }
}

module.exports = SocialPost;
