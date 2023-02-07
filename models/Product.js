const assert = require("assert");
const { shapeIntMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const Definer = require("../lib/misteke");
const res = require("express/lib/response");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsDataResto(member) {
    try {
      member._id = shapeIntMongooseObjectId(member._id);
      const result = await this.productModel.find({
        restaurant_mb_id: member._id,
      });
      assert.ok(result, Definer.genneral_err1);

      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async addNewProductData(data, member) {
    try {
      data.restaurant_mb_id = shapeIntMongooseObjectId(member._id);
      //console.log(data);

      const new_product = this.productModel(data);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenProduct(id, updated_data, mb_id) {
    try {
      id = shapeIntMongooseObjectId(id);
      const result = await this.productModel
        .findOneAndUpdate(
          //3ta object mavjud
          { _id: id, restaurant_mb_id: mb_id },
          updated_data,
          {
            runValidators: true,
            lean: true,
            returnDocument: "after", // yangilangandan keyin yangilangan malumotni beradi agar before bo'lsa avvalgi malumotni beradi
          }
        )
        .exec();

      assert.ok(result, Definer.genneral_err1);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Product;
