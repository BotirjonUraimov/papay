const Definer = require("../lib/misteke");
const MemberModel = require("../schema/member.model");
const assert = require("assert");
class Member {
  constructor() {
    this.memberModel = MemberModel;
  }

  async signupData(input) {
    try {
      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        throw new Error(Definer.auth_err1);
      }
      console.log(result);

      result.mb_password = "";
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        //dindOne methodi objectni argument sifatida qabul qilib. undagi birinchi objecktda databasedagi mb_nick nomi key va foydalanuvchi kiritgan inputdagi malumot kiritiladi va methot ularni solishtirib bizga mos kelsa shu malumotni qaytaradi. ikkin objectdagi 1 qiymatlar majburiy chaqairish hisoblanadi
        .exec();

      assert.ok(member, Definer.auth_err3);

      const isMatch = input.mb_password === member.mb_password;
      assert.ok(isMatch, Definer.auth_err4);

      return await this.memberModel
        .findOne({
          mb_nick: input.mb_nick,
        })
        .exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
