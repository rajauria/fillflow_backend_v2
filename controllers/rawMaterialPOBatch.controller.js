const RawMaterialPOBatchModel = require("../models/rawMaterialPOBatch.model");

exports.getPOBatchModelsByRawMaterialId = async (req, res) => {
  try {
    const { raw_material_id } = req.params;
    const poBatchModels = await RawMaterialPOBatchModel.find({
      raw_material_id,
    })
      .populate("po_id")
      .populate("raw_material_id");
    res.status(200).json({
      success: true,
      message: "Successfully get PO Batch Models by Raw Material ID",
      data: poBatchModels,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
