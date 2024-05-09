const rawMaterialPO_controller = require("../controllers/rawMaterialPurchaseOrders.controller");
const authValidator = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post(
    "/api/v1/createNewPO",
    [authValidator.isUserAuthenticated],
    rawMaterialPO_controller.createRawMaterialPO
  );

  app.patch(
    "/api/v1/updatePO/:po_id",
    [authValidator.isUserAuthenticated],
    rawMaterialPO_controller.updateRawMaterialPO
  );

  app.get(
    "/api/v1/getAllFulfilledPO",
    [authValidator.isUserAuthenticated],
    rawMaterialPO_controller.getAllFulfilledPO
  );
  app.get(
    "/api/v1/getAllPO",
    [authValidator.isUserAuthenticated],
    rawMaterialPO_controller.getAllPOs
  );
};
