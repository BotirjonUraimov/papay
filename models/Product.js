const assert = require("assert");
const { shapeIntMongooseObjectId } = require("../lib/config");
const ProductModel = require("../schema/product.model");
const Definer = require("../lib/misteke");
const Member = require("./Member");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsData(member, data) {
    try {
      const auth_mb_id = shapeIntMongooseObjectId(member?._id);

      let match = { product_status: "PROCESS" };
      if (data.restaurant_mb_id) {
        match["restaurant_mb_id"] = shapeIntMongooseObjectId(
          data.restaurant_mb_id
        );
        match["product_collection"] = data.product_collection;
      }

      const sort =
        data.order === "product_price"
          ? { [data.order]: 1 }
          : { [data.order]: -1 };

      const result = await this.productModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (data.page * 1 - 1) * data.limit },
          { $limit: data.limit * 1 },
          // todo: check auth member product likes
        ])
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenProductData(member, product_id) {
    try {
      const auth_mb_id = shapeIntMongooseObjectId(member?._id);
      const id = shapeIntMongooseObjectId(product_id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "product");
      }

      const result = await this.productModel
        .aggregate([
          { $match: { _id: id, product_status: "PROCESS" } },
          // todo: check auth member product likes
        ])
        .exec();

      assert.ok(result, Definer.genneral_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllProductsDataResto(member) {
    try {
      member._id = shapeIntMongooseObjectId(member._id);
      const result = await this.productModel.find({
        restaurant_mb_id: member._id,
      });
      assert.ok(result, Definer.genneral_err1);

      //console.log(result);
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
