const assert = require("assert");
const Definer = require("../lib/misteke");
const Product = require("../models/Product");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: controller/getAllProducts");
    const product = new Product();
    const result = await product.getAllProductsData(req.member, req.body);
    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, controller/getAllProducts ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.getChosenProduct = async (req, res) => {
  try {
    console.log("GET: controller/getChosenProduct");
    const product = new Product();
    const id = req.params.id;
    const result = await product.getChosenProductData(req.member, id);

    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, controller/getChosenProduct ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

/***********************************
 *      BSSR RELATED METHODS       *
 **********************************/

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: controller/addNewProduct");
    assert(req.files, Definer.genneral_err3);

    const product = new Product();
    let data = req.body;

    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = await product.addNewProductData(data, req.member);

    const html = `<script>alert("new product added successfully");
    window.location.replace('/resto/products/menu'); 
    </script>`;

    res.end(html);
  } catch (err) {
    console.log(`ERROR, controller/addNewProduct ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: controller/updateChosenProduct");
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProduct(
      id,
      req.body,
      req.member._id
    );
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, controller/updateChosenProduct ${err.message}`);
  }
};
