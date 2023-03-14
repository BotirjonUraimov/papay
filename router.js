const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");
const orderController = require("./controllers/orderController");

/******************************
 *          REST API          *
 *****************************/

//routers that releted to members
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retriveAuthMember,
  memberController.getChosenMember
);

// Product related routers
router.post(
  "/products",
  memberController.retriveAuthMember,
  productController.getAllProducts
);

router.get(
  "/products/:id",
  memberController.retriveAuthMember,
  productController.getChosenProduct
);

// Restaurant  related routers

router.get(
  "/restaurants",
  memberController.retriveAuthMember,
  restaurantController.getRestaurants
);

router.get(
  "/restaurants/:id",
  memberController.retriveAuthMember,
  restaurantController.getChosenRestaurant
);

// Oreders related routers
router.post(
  "/orders/create",
  memberController.retriveAuthMember,
  orderController.createOrder
);

module.exports = router;
