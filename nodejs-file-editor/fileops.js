const fs = require("fs");

const fileOperations = () => {
  const args = process.argv;
  const ops = args[2];
  // read append delete create rename list

  const path = args[3];

  switch (ops) {
    case "read":
      const data = fs.readFileSync(path, { encoding: "utf-8" });
      console.log(data);
      break;
    case "append":
      const content = args[3];
      const _path = args[4];
      fs.appendFileSync(_path, content);
      break;
    case "delete":
      fs.unlinkSync(path);
      console.log("file deleted successfully");
      break;
    case "create":
      fs.openSync(path, "w");
      console.log("file created successfully");
      break;
    case "rename":
      const newPath = args[4];
      fs.renameSync(path, newPath);
      console.log("file renamed successfully");
      break;
    case "list":
      fs.readdirSync(path, { encoding: "utf-8" }).forEach((file) => {
        console.log(file);
      });
      break;
    default:
      console.log("Invalid arguments");
  }
};

fileOperations();
