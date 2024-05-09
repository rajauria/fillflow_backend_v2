const RawMaterialPO = require("../models/RawMaterialPurchaseOrders.model");
const Vendor = require("../models/vendor.model");
const RawMaterial = require("../models/rawMaterial.model");
const RawMaterialInventory = require("../models/rawMaterialInventory.model");
const RawMaterialPOBatchModel = require("../models/rawMaterialPOBatch.model");

function generateGRN() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateBatchNumber() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

exports.createRawMaterialPO = async (req, res) => {
  const data = req.body;
  try {
    const currentUserInfo = req.user;
    // console.log("currentUserInfo===", currentUserInfo);

    // if (!currentUserInfo?.firstName) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User information is incomplete or missing warehouseId",
    //   });
    // }

    const vendorDetail = await Vendor.findOne({ _id: data.vendor_id });
    console.log("vendorDetail====", vendorDetail);

    const vendorNamePrefix = vendorDetail.vendor_name.slice(0, 4).toUpperCase();
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const po_number = `${vendorNamePrefix}/PO/${formattedDate}`;

    const newPO = await RawMaterialPO.create({
      grn_number: generateGRN(),
      po_number,
      vendor_id: data.vendor_id,
      warehouse_id: currentUserInfo?.data?.warehouseId[0],
      raw_material_id: data.raw_material_id,
      quantity: data.quantity,
      unit_price: data.unit_price,
      total_amount: data?.quantity * data?.unit_price,
      status: data.status,
      created_by: currentUserInfo?.data?._id,
    });

    if (!newPO) {
      return res.status(404).json({
        success: false,
        message: "PO is not created",
      });
    }
    return res.status(200).json({
      success: true,
      message: "SuccessFully created the PO",
      data: newPO,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateRawMaterialPO = async (req, res) => {
  try {
    const { po_id } = req.params;
    const updateData = req.body;

    // Find the PO data by ID
    const PO_data = await RawMaterialPO.findById(po_id);

    // Check if the PO data exists
    if (!PO_data) {
      return res.status(404).json({
        success: false,
        message: "PO not found",
      });
    }

    // Update the PO data
    const updatedPO = await RawMaterialPO.findByIdAndUpdate(po_id, updateData, {
      new: true,
    });

    // Check if the PO is updated
    if (!updatedPO) {
      return res.status(404).json({
        success: false,
        message: "Failed to update PO",
      });
    }

    // If the status is not "fulfilled", update RawMaterial's current_stock
    if (PO_data.status !== "fulfilled") {
      // Find the corresponding RawMaterial
      const rawMaterial = await RawMaterial.findById(PO_data.raw_material_id);

      // Check if the RawMaterial exists
      if (rawMaterial) {
        // Update current_stock of the RawMaterial
        rawMaterial.current_stock += updatedPO.quantity;
        await rawMaterial.save();

        // create a new Raw Material PO Batch entry
        await RawMaterialPOBatchModel.create({
          po_id: updatedPO._id,
          raw_material_id: updatedPO.raw_material_id,
          batch_number: generateBatchNumber(),
        });

        // Create a new inventory entry
        // await RawMaterialInventory.create({
        //   Warehouse_ID: updatedPO.warehouse_id,
        //   po_id: updatedPO._id,
        //   raw_material_id: updatedPO.raw_material_id,
        //   quantity: updatedPO.quantity,
        //   unit_price: updatedPO.unit_price,
        //   total: updatedPO.total_amount,
        //   reorder_level: rawMaterial.reorder_level,
        // });
      } else {
        console.error("RawMaterial not found");
      }
    }

    return res.status(200).json({
      success: true,
      message: "PO updated successfully",
      data: updatedPO,
    });
  } catch (error) {
    console.error("Error updating PO:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllFulfilledPO = async (req, res) => {
  try {
    // Find all POs with status "fulfilled"
    const fulfilledPOs = await RawMaterialPO.find({
      status: "fulfilled",
    }).populate("created_by");

    return res.status(200).json({
      success: true,
      data: fulfilledPOs,
      message: "Successfully find the POs.",
    });
  } catch (error) {
    console.error("Error fetching fulfilled POs:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllPOs = async (req, res) => {
  try {
    // Find all POs with status "fulfilled"
    const allPOs = await RawMaterialPO.find()
      .populate("vendor_id")
      .populate("raw_material_id")
      .populate("created_by");

    return res.status(200).json({
      success: true,
      data: allPOs,
      message: "Successfully find the POs.",
    });
  } catch (error) {
    console.error("Error fetching fulfilled POs:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
