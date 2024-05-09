const mongoose = require("mongoose");

const rawMaterialPurchaseOrdersSchema = new mongoose.Schema(
  {
    grn_number: {
      type: String,
    },
    po_number: {
      type: String,
      required: true,
    },
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    raw_material_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawMaterials",
    },
    order_date_time: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
    },
    unit_price: {
      type: Number,
    },
    total_amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "fulfilled"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const RawMaterialPurchaseOrders = mongoose.model(
  "RawMaterialPurchaseOrders",
  rawMaterialPurchaseOrdersSchema
);

module.exports = RawMaterialPurchaseOrders;
