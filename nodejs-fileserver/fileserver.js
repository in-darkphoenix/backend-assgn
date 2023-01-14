const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const path = req.url;
  const pathSplit = path.split("/");
  let filePath = "./";
  let data = "";

  if (pathSplit.length != 1 && !pathSplit.includes("favicon.ico")) {
    pathSplit.forEach((arg, i) => {
      if (i != 0) {
        filePath += arg + "/";
      }
    });
  }
  fs.readdirSync(filePath, { encoding: "utf-8" }).forEach((file) => {
    data += file + "\n";
  });
  res.end(data.toString());
});

server.listen(4000);
