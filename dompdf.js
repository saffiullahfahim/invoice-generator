// object to formdata
import fs from "fs";
let data = {
  submitCode: "submit",
  inputCode:
    '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n</head>\n<body>\n  hi\n</body>\n</html>',
  inputRemote: "",
  defaultMediaType: "",
  isCssFloatEnabled: "1",
  defaultFont: "",
  isFontSubsettingEnabled: "1",
  fontHeightRatio: "1.1",
  isHtml5ParserEnabled: "1",
  paper: "a4",
  orientation: "",
  dpi: "",
  dompdf_ver: "2.0.3",
  pdf_backend: "cpdf",
  load_method: "1",
  php_ver: "8.1",
};

// const formData = new FormData();
// Object.entries(data).forEach(([key, value]) => {
//   formData.append(key, value);
// });

// object to x-www-form-urlencoded
const formData = Object.entries(data)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");

fetch("https://eclecticgeek.com/dompdf/debug.php", {
  method: "POST",
  headers: {
    // form data
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData,
})
  .then((res) => {
    console.log(res.url)
    return res.text();
  })
  .then((res) => fs.writeFileSync("test.html", res));

// fetch("https://eclecticgeek.com/dompdf/debug.php", {
//   headers: {
//     accept:
//       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//     "accept-language": "en-US,en;q=0.5",
//     "cache-control": "max-age=0",
//     "content-type": "application/x-www-form-urlencoded",
//     "sec-ch-ua": '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Windows"',
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "sec-gpc": "1",
//     "upgrade-insecure-requests": "1",
//     Referer: "https://eclecticgeek.com/dompdf/debug.php",
//     "Referrer-Policy": "strict-origin-when-cross-origin",
//   },
//   body: formData,//"submitCode=submit&inputCode=%3C%21DOCTYPE+html%3E%0D%0A%3Chtml%3E%0D%0A%3Chead%3E%0D%0A++%3Cmeta+http-equiv%3D%22Content-Type%22+content%3D%22text%2Fhtml%3B+charset%3Dutf-8%22%2F%3E%0D%0A%3C%2Fhead%3E%0D%0A%3Cbody%3E%0D%0A++hi+this+is+%0D%0A%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E&inputRemote=&defaultMediaType=&isCssFloatEnabled=1&defaultFont=&isFontSubsettingEnabled=1&fontHeightRatio=1.1&isHtml5ParserEnabled=1&paper=a4&orientation=&dpi=&dompdf_ver=2.0.3&pdf_backend=cpdf&load_method=1&php_ver=8.1",
//   method: "POST",
// })
//   .then((res) => {
//     console.log(res.redirected);
//     return res.text();
//   })
//   .then((res) => fs.writeFileSync("test.html", res));
