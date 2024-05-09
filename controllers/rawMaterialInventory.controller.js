const RawMaterialInventory = require("../models/rawMaterialInventory.model");

exports.getAllRawMaterialInventories = async (req, res) => {
  try {
    const AllInventories = await RawMaterialInventory.find({});
    return res.status(200).json({
      success: true,
      data: AllInventories,
      message: "Successfully get All RawMaterial Inventories .",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
