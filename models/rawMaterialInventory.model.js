const mongoose = require("mongoose");

const rawMaterialInventorySchema = new mongoose.Schema(
  {
    Warehouse_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    po_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterialPurchaseOrders",
    },
    raw_material_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterials",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    reorder_level: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RawMaterialInventoryModel = mongoose.model(
  "RawMaterialInventoryModel",
  rawMaterialInventorySchema
);

module.exports = RawMaterialInventoryModel;
