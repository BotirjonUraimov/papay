const res = require("express/lib/response");
const Member = require("../models/Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: controller/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR: controller/signup`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: controller/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR: controller/login`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET memberController.logout");
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> LOGOUT </span>  page </h1>"
  );
};
