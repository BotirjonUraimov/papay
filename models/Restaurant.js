const Definer = require("../lib/misteke");
const MemberModel = require("../schema/member.model");
const assert = require("assert");

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
}
module.exports = Restaurant;
