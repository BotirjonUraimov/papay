const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");

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

module.exports = router;
