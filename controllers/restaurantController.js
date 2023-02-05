const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController = module.exports;

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: controller/getMyRestaurantProducts");
    // to do: Get my restauranr product
    const product = new Product(); //funcsiya emasku nega qavs bor
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
    console.log("POST: controller/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    //SESSION
    req.session.member = new_member;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR: controller/signup`, err.message);
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
    console.log("POST: controller/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);
    //console.log("body:::", req.body); // member schemadan kelgan ma'lumot ko'rish uchun

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR: controller/login`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET restaurantController.logout");
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> LOGOUT </span>  page </h1>"
  );
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
