const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");

const server = http.createServer(async (req, res) => {
  const path = req.url;
  if (path.includes("favicon")) {
    return;
  }
  const ps = path.split("/").pop();
  console.time(ps);

  if (path.includes("textsync")) {
    const data = fs.readFileSync("./cat.txt", { encoding: "utf-8" });
    res.end(data);
  } else if (path.includes("textasync")) {
    fs.readFile("./cat.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        res.end(err);
      } else {
        res.end(data);
      }
    });
  } else if (path.includes("textstream")) {
    const dataStream = fs.createReadStream("./cat.txt", { encoding: "utf-8" });
    dataStream.on("close", () => {
      res.end();
    });
    dataStream.pipe(res);
  } else if (path.includes("textpromise")) {
    const data = await fsp.readFile("./cat.txt", { encoding: "utf-8" });
    res.end(data);
  } else {
    res.end("CATS LOVE ME");
  }
  console.timeEnd(ps);
});

server.listen(4000);
