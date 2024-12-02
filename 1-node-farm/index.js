import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import { readFile, readFileSync } from "fs";

const __dirname = (relativePath) =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), relativePath);

const data = readFileSync(__dirname("dev-data/data.json"), "utf-8");
const dataObj = JSON.parse(data);

const server = createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");

    // Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    // API
  } else if (pathName === "/api") {
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
