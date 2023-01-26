const res = require("express/lib/response");
const Member = require("../models/Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: controller/signup");
    const data = req.body;
    const member = new Member();
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun
    const new_member = await member.signupData(data);

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR: controller/signup`, err.message);
    res.json({ state: "failed", message: err.message });
  }
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
