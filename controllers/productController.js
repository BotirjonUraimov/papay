let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: controller/getAllProducts");
  } catch (err) {
    console.log(`ERROR, controller/getAllProducts ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: controller/addNewProduct");

    // TODO ptoduct creation develop

    res.json({ test: "ok" });
  } catch (err) {
    console.log(`ERROR, controller/addNewProduct ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: controller/updateChosenProduct");
  } catch (err) {
    console.log(`ERROR, controller/updateChosenProduct ${err.message}`);
  }
};
