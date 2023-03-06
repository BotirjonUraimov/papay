class Definer {
  /* General  erros */
  static genneral_err1 = "att: something went wrong!";
  static genneral_err2 = "att: there is no data with that params!";
  static genneral_err3 = "att: file upload error!";

  /* Member auth releted errors */
  static auth_err1 = "att: mongoDB validation is failed";
  static auth_err2 = "att: jwt token creation error";
  static auth_err3 = "att: no member with that member nick";
  static auth_err4 = "att: Your credentials is not match";
  static auth_err5 = "att: jwt token getting process error";

  /* Product auth releted errors */
  static product_err1 = "att: product creation is is failed";
}

module.exports = Definer;
