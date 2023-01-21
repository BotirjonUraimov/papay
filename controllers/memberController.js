const res = require("express/lib/response");

let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET memberController.home");
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> HOME </span>  page </h1>"
  );
};

memberController.signup = (req, res) => {
  console.log("POST memberController.signup");
  res.send("You are in SIGNUP page");
};

memberController.login = (req, res) => {
  console.log("POST memberController.login");
  res.send("You are in LOGIN page");
};

memberController.logout = (req, res) => {
  console.log("GET memberController.logout");
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> LOGOUT </span>  page </h1>"
  );
};
