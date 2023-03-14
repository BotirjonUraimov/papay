const Definer = require("../lib/misteke");
const MemberModel = require("../schema/member.model");
const assert = require("assert");
const Member = require("./Member");
const { shapeIntMongooseObjectId } = require("../lib/config");

class Restaurant {
  constructor() {
    this.memberModel = MemberModel;
  }

  async getRestaurantsData(member, data) {
    try {
      const auth_mb_id = shapeIntMongooseObjectId(member?.id);
      let match = { mb_type: "RESTAURANT", mb_status: "ACTIVE" };
      let aggregationQuery = [];
      data.limit = data["limit"] * 1;
      data.page = data["page"] * 1;

      switch (data.order) {
        case "top":
          match["mb_top"] = "Y";
          aggregationQuery.push({ $match: match });
          aggregationQuery.push({ $sample: { size: data.limit } });
          aggregationQuery.push({ $unset: "mb_password" });
          break;
        case "random":
          aggregationQuery.push({ $match: match });
          aggregationQuery.push({ $sample: { size: data.limit } });
          aggregationQuery.push({ $unset: "mb_password" });
          break;
        default:
          aggregationQuery.push({ $match: match });
          const sort = { [data.order]: -1 };
          aggregationQuery.push({ $sort: sort });
          aggregationQuery.push({ $unset: "mb_password" });
          break;
      }

      aggregationQuery.push({ $skip: (data.page - 1) * data.limit });
      aggregationQuery.push({ $limit: data.limit });

      // todo: check auth member liked teh chosen member

      const result = await this.memberModel.aggregate(aggregationQuery).exec();
      assert(result, Definer.genneral_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenRestaurantData(member, id) {
    try {
      id = shapeIntMongooseObjectId(id);

      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "member");
      }

      const result = await this.memberModel
        .findOne({
          _id: id,
          mb_status: "ACTIVE",
        })
        .exec();

      assert(result, Definer.genneral_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllRestaurantsData() {
    try {
      let result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();
      assert(result, Definer.genneral_err2);

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
