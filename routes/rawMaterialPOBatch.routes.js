const rawMaterialPOBatch_controller = require("../controllers/rawMaterialPOBatch.controller");
const authValidator = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get(
    "/api/v1/getRawMaterialPoBatchById/:raw_material_id",
    [authValidator.isUserAuthenticated],
    rawMaterialPOBatch_controller.getPOBatchModelsByRawMaterialId
  );
};
