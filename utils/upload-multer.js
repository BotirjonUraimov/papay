const path = require("path");
const multer = require("multer");
const uuid = require("uuid");
const moment = require("moment/moment");

/********************************
 *     MULTER IMAGES UPLODER    *
 *******************************/
function getTargetStorage(address) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      const extention = path.parse(file.originalname).ext;
      const random_name =
        uuid.v4() + "_" + moment().format("YYYYMMDDhhmmss") + extention;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address) => {
  const storage = getTargetStorage(address);
  return multer({ storage: storage });
};

module.exports = makeUploader;
//const product_storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/products");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const extention = path.parse(file.originalname).ext;
//     const random_name = uuid.v4() + extention;

//     cb(null, random_name);
//   },
// });
//module.exports.uploadProductImage = multer({ storage: product_storage });
