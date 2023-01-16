const express = require("express");
const fs = require("fs/promises");
const cowsay = require("cowsay");
const dns = require("dns");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO EMPLOYEE MANAGEMENT SYSTEM </h1>");
});

app.get("/writeinfile", async (req, res) => {
  try {
    await fs.writeFile("employee.txt", "Employee names are as follows:");

    res.send("<h1>Data has been written in the file</h1>");
  } catch (err) {
    console.error(err);
    res.send("<h1>Error found while creating file</h1>");
  }
});

app.get("/enternames", async (req, res) => {
  try {
    const names = ["Aman", "Albert", "Varun", "Rajat", "Nrupul"];
    let data = "";

    names.forEach((elem) => {
      data += "\n" + elem;
    });

    fs.appendFile("employee.txt", data);

    res.send("<h1>All the names added in the file</h1>");
  } catch (err) {
    console.error(err);
    res.send("<h1>Error found while appending in file</h1>");
  }
});

app.get("/alldetails", async (req, res) => {
  try {
    const data = await fs.readFile("employee.txt", { encoding: "utf-8" });

    console.log(
      cowsay.say({
        text: data,
      })
    );

    res.send("<h1>All details read successfully</h1>");
  } catch (err) {
    console.error(err);
    res.send("<h1>Error found while reading from file</h1>");
  }
});

app.get("/delete", async (req, res) => {
  try {
    await fs.unlink("employee.txt");
    res.send("<h1>File has been deleted</h1>");
  } catch (err) {
    console.error(err);
    res.send("<h1>Error found while deleting file</h1>");
  }
});

app.get("/address", (req, res) => {
  try {
    const url = process.argv[2];
    dns.resolve(url, (err, addresses) => {
      console.log(addresses);
      res.send(`<h3>The IP Address is ${addresses[0]}</h3>`);
    });
  } catch (err) {
    console.error(err);
    res.send("<h1>Error found while looking up an Ip Address</h1>");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("<h1>Invalid Endpoint Request</h1>");
});

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
