const mongoose = require("mongoose");

const rawMaterialsSchema = new mongoose.Schema(
  {
    material_name: {
      type: String,
      required: true,
    },
    material_description: {
      type: String,
    },
    material_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    unit_of_measure: {
      type: String,
      enum: ["kilograms", "litres", "units"],
      default: "units",
    },
    current_stock: {
      type: Number,
      default: 0,
    },
    reorder_level: {
      type: Number,
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    sku_code: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    zoho_item_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create RawMaterials model
const RawMaterials = mongoose.model("RawMaterials", rawMaterialsSchema);

module.exports = RawMaterials;
