const res = require("express/lib/response");
const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/misteke");
let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: controller/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    const token = memberController.createToken(new_member);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "success", data: new_member });
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

    const token = memberController.createToken(result);
    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: controller/login`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET memberController.logout");
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "Logout successfully" });
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET memberController.checkMyAuthentication");
    let token = req.cookies["access_token"];
    //console.log("token::::", token);

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err5);
    res.json({ state: "success", data: member });
  } catch (err) {
    throw err;
  }
};

memberController.getChosenMember = async (req, res) => {
  try {
    console.log("GET memberController.getChosenMember");
    const id = req.params.id;

    const member = new Member();
    const result = await member.getChosenMemberData(req.member, id);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: controller/getChosenMember`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

memberController.retriveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR: controller/retriveAuthMember`, err.message);
    throw err;
  }
};
