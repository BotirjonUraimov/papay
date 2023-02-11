const assert = require("assert");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/misteke");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET: controller/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR: controller/home`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: controller/getMyRestaurantProducts");
    // to do: Get my restauranr product
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR: controller/getMyRestaurantProducts`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: controller/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR: controller/getSignupMyRestaurant`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: controller/signupProcess");
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR: controller/signupProcess`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: controller/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR: controller/getLoginMyRestaurant`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: controller/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR: controller/loginProcess`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  try {
    console.log("GET restaurantController.logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "Fail",
      error: "Only Authenticated member with restaurant type",
    });
};

restaurantController.checkSession = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "Failed", message: "You are not autenticated member" });
  }
};
