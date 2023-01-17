const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(
  morgan((tokens, req, res) => {
    return [
      `method: ${tokens.method(req, res)},`,
      `status-code: ${tokens.status(req, res)},`,
      `content-length: ${tokens.res(req, res, "content-length")},`,
      `time-taken: ${tokens["response-time"](req, res)} ms,`,
      `http-version: ${tokens["http-version"](req, res)},`,
      `date: ${tokens.date(req, res)},`,
      `url: ${tokens.url(req, res)}`,
      "\n",
    ].join(" ");
  })
);

app.use(morgan("combined"));
app.use(morgan("common"));
app.use(morgan("dev"));
app.use(morgan("short"));
app.use(morgan("tiny"));

app.get("*", (req, res) => {
  res.send("<h1>Get</h1>");
});

app.post("*", (req, res) => {
  res.send("<h1>Post</h1>");
});

app.put("*", (req, res) => {
  res.send("<h1>Put</h1>");
});

app.patch("*", (req, res) => {
  res.send("<h1>Patch</h1>");
});

app.delete("*", (req, res) => {
  res.send("<h1>Delete</h1>");
});

app.listen(4000, () => {
  console.log("server started at port 4000");
});
