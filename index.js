const got = require("got");

const BASE_URL = "https://app.ayrshare.com/api";
const ERROR_MSG = {
  status: "error",
  message: "Wrong parameters. Please check at https://docs.ayrshare.com",
};

const doPost = (endpoint, data, headers) => {
  return got
    .post(`${BASE_URL}/${endpoint}`, {
      headers,
      json: data,
      responseType: "json",
    })
    .then((res) => res.body)
    .catch(console.error);
};

const doDelete = (endpoint, data, headers) => {
	return got
	  .delete(`${BASE_URL}/${endpoint}`, {
		headers,
		json: data,
		responseType: "json",
	  })
	  .then((res) => res.body)
	  .catch(console.error);
  };

const doGet = (endpoint, headers, params) => {
  return got
    .get(`${BASE_URL}/${endpoint}${params ? `?${params.join("&")}` : ""}`, {
      headers,
      responseType: "json",
    })
    .then((res) => res.body)
    .catch(console.error);
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
    const { id } = data;

    if (!id) {
      return ERROR_MSG;
    }

    return doDelete("delete", data, this.headers);
  }

  history() {
    return doGet("history", this.headers);
  }

  media() {
    return doGet("media", this.headers);
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
}

module.exports.SocialPost = SocialPost;
