const got = require("got");

const BASE_URL = "https://app.ayrshare.com/api";

const ERROR_MSG = {
  status: "error",
  message: "Wrong parameters. Please check at https://docs.ayrshare.com/rest-api/endpoints",
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

const doGet = (endpoint, headers, params) => {
  return got
    .get(
      `${BASE_URL}/${endpoint}?${
        params ? `${new URLSearchParams(preProcess(params)).toString()}` : "source=npm"
      }`,
      {
        headers,
        responseType: "json",
      }
    )
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
    const { post, platforms } = data;

    if (!post || !platforms || platforms.length === 0) {
      return ERROR_MSG;
    }

    return doPost("post", data, this.headers);
  }

  delete(data) {
    const { id, bulk } = data;

    if (!id && !bulk) {
      return ERROR_MSG;
    }

    return doDelete("delete", data, this.headers);
  }

  history(params) {
    return doGet("history", this.headers, params);
  }

  media(params) {
    return doGet("media", this.headers, params);
  }

  analytics(params) {
    return doGet("analytics", this.headers, params);
  }

  user(params) {
    return doGet("user", this.headers, params);
  }

  upload(data) {
    const { file, fileName, description } = data;

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

  createProfile(data) {
    const { title } = data;

    if (!title) {
      return ERROR_MSG;
    }

    return doPost("create-profile", data, this.headers);
  }

  deleteProfile(data) {
    const { profileKey } = data;

    if (!profileKey) {
      return ERROR_MSG;
    }

    return doDelete("delete-profile", data, this.headers);
  }

  setAutoSchedule(data) {
    const { schedule } = data;

    if (!schedule) {
      return ERROR_MSG;
    }

    return doPost("set-auto-schedule", data, this.headers);
  }
}

module.exports = SocialPost;
