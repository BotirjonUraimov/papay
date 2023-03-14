const Order = require("../models/Order");
const assert = require("assert");
const Definer = require("../lib/misteke");
let orderController = module.exports;

orderController.createOrder = async (req, res) => {
  try {
    console.log("POST: controller/createOrder");
    assert.ok(req.member, Definer.auth_err6);

    const order = new Order();
    const result = await order.createOrderData(req.member, req.body);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: controller/createOrder`, err.message);
    res.json({ state: "failed", message: err.message });
  }
};
