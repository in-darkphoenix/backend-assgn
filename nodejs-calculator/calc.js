const crypto = require("crypto");

const calculator = () => {
  const args = process.argv;
  const ops = args[2];
  let res;

  const n1 = Number(args[3]);
  const n2 = Number(args[4]);
  switch (ops) {
    case "add":
      res = n1 + n2;
      break;
    case "sub":
      res = n1 - n2;
      break;
    case "mult":
      res = n1 * n2;
      break;
    case "divide":
      try {
        res = Math.round((n1 / n2) * 100) / 100;
      } catch (err) {
        res = err;
      }
      break;
    case "sin":
      res = Math.sin(n1);
      break;
    case "cos":
      res = Math.cos(n1);
      break;
    case "tan":
      res = Math.tan(n1);
      break;
    case "random":
      res = crypto.randomInt(0, 101);
      break;
    default:
      res = "Invalid argument";
  }

  console.log(res);
};

calculator();
