import "./style.css";
import { getPdf } from "./pdf-lib";

(async () => {
  document.querySelector("#app").innerHTML = `
<iframe src="${await getPdf()}"></iframe>
`;
})();
