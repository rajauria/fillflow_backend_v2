const rawMaterialInventoryController = require("../controllers/rawMaterialInventory.controller");
const authValidator = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post(
    "/api/v1/getAllInventories",
    [authValidator.isUserAuthenticated],

    rawMaterialInventoryController.getAllRawMaterialInventories
  );
};
