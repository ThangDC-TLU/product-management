const express = require("express");
const router = express.Router();
const multer = require("multer");
// const storageMulter = require("../../helpers/storageMulter");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middelware");

const upload = multer();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.product);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.createProduct
);

router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.editProduct
);

router.get("/detail/:id", controller.detail);
module.exports = router;
