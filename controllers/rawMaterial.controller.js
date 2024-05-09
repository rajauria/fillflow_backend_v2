const RawMaterial = require("../models/rawMaterial.model");

exports.createRawMaterial = async (req, res) => {
  const data = req.body;
  try {
    const newRawMaterial = await RawMaterial.create({
      material_name: data.material_name,
      material_description: data.material_description,
      material_category_id: data.material_category_id,
      unit_of_measure: data.unit_of_measure,
      current_stock: data.current_stock,
      reorder_level: data.reorder_level,
      warehouse_id: data.warehouse_id,
      sku_code: data.sku_code,
      unit_price: data.unit_price,
      zoho_item_id: data.zoho_item_id,
    });
    if (!newRawMaterial) {
      return res.status(404).json({
        success: false,
        message: "Raw material is not created.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "SuccessFully created the Raw material",
      data: newRawMaterial,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllRawMaterials = async (req, res) => {
  try {
    // Fetch all raw materials from the database
    const allRawMaterials = await RawMaterial.find().populate(
      "material_category_id"
    );

    // Check if raw materials exist
    if (!allRawMaterials || allRawMaterials.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No raw materials found.",
      });
    }

    // Return success response with raw materials data
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all raw materials",
      data: allRawMaterials,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllRawMaterialsByCategoryId = async (req, res) => {
  try {
    // Extract category ID from request parameters
    const categoryId = req.params.categoryId;
    console.log("categoryId====", categoryId);

    // Fetch all raw materials for the given category ID from the database
    const rawMaterials = await RawMaterial.find({
      material_category_id: categoryId,
    });

    // Check if raw materials exist for the given category ID
    if (!rawMaterials || rawMaterials.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No raw materials found for the given category ID.",
      });
    }

    // Return success response with raw materials data
    return res.status(200).json({
      success: true,
      message: "Successfully retrieved raw materials by category ID",
      data: rawMaterials,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
