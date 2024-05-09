const rawMaterialController = require("../controllers/rawMaterial.controller");
const authValidator = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post(
    "/api/v1/creatRawMaterial",
    [authValidator.isUserAuthenticated],
    rawMaterialController.createRawMaterial
  );
  app.get(
    "/api/v1/getAllRawMaterials",
    [authValidator.isUserAuthenticated],
    rawMaterialController.getAllRawMaterials
  );
  app.get(
    "/api/v1/getRawMaterialByCatId/:categoryId",
    [authValidator.isUserAuthenticated],
    rawMaterialController.getAllRawMaterialsByCategoryId
  );
};
