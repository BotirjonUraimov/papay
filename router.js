const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

/******************************
 *          REST API          *
 *****************************/

//routers that releted to members
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.post(
  "/member/:id",
  memberController.retriveAuthMember,
  memberController.getChosenMember
);

// other routers
router.get("/menu", function (req, res) {
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> MENU </span>  page </h1>"
  );
});

router.get("/community", function (req, res) {
  res.send(
    "<h1 style = 'text-align:center; margin: 100px;'> You are in  <span style = 'color: green; font-weight: bold;'> COMMUNITY </span>  page </h1>"
  );
});

module.exports = router;
