const Definer = require("../lib/misteke");
const MemberModel = require("../schema/member.model");
const assert = require("assert");
const { shapeIntMongooseObjectId } = require("../lib/config");

class Restaurant {
  constructor() {
    this.memberModel = MemberModel;
  }
  async getAllRestaurantsData() {
    try {
      let result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();

      assert(result, Definer.genneral_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateRestaurantByAdminData(updated_data) {
    try {
      const id = shapeIntMongooseObjectId(updated_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, updated_data, {
          runValidators: true,
          lean: true,
          returnDocument: "after",
        })
        .exec();
      assert.ok(result, Definer.genneral_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Restaurant;
