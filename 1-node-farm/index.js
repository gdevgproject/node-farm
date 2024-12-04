import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import { openAsBlob, readFile, readFileSync } from "fs";
import url from "url";
import { replaceTemplate } from "./modules.js/replaceTemplate.js";
// SERVER

const __dirname = (relativePath) =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), relativePath);

const tempOverview = readFileSync(
  __dirname("./templates/template-overview.html"),
  "utf-8"
);
const tempCard = readFileSync(
  __dirname("./templates/template-card.html"),
  "utf-8"
);
const tempProduct = readFileSync(
  __dirname("./templates/template-product.html"),
  "utf-8"
);

const data = readFileSync(__dirname("./dev-data/data.json"), "utf-8");
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    console.log(query);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is running on http://localhost:3000");
});
