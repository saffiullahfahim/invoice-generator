import fs from "fs";

let token =
  "ya29.a0AbVbY6PWzBcXJfuKw569ipFEepx8KDzo0xFuxo8YHIuNarBrQAY3ZIMa36XOABoGah5haa2dd-o6MN9iUyE0wImT7KIKpcpVJJTAd_abPSY1Ovil-Ywby7dNABYFpN7THhi4IUVo_zyp2RqZgLtfyeE_h_EXE1zsvgoXVm7NaCgYKAT4SARISFQFWKvPlyiry0d75qan5AT-wbsg2CA0175";

let id = "1ythgkAyhcbHlyuf6VDlMWRj0oryN2EbEYGxqEOC-zw0";
fetch("https://docs.googleapis.com/v1/documents/" + id, {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.8",
    authorization: "Bearer " + token,
  },
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fs.writeFileSync("test.json", JSON.stringify(data));
  });
