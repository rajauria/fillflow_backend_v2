const mongoose = require("mongoose");

const rawMaterialPOBatchSchema = new mongoose.Schema(
  {
    po_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterialPurchaseOrders",
      required: true,
    },
    raw_material_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterials",
      required: true,
    },
    batch_number: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const RawMaterialPOBatch = mongoose.model(
  "RawMaterialPOBatchModel",
  rawMaterialPOBatchSchema
);
module.exports = RawMaterialPOBatch;
