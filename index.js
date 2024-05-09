const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// importing routes
const warehouseRoutes = require("./routes/warehouse.routes");
const authRoutes = require("./routes/auth.routes");
const vendorRoutes = require("./routes/vendor.routes");
const categoryRoutes = require("./routes/category.routes");
const rawMaterialRoutes = require("./routes/rawMaterial.routes");
const rawMaterialPORoutes = require("./routes/rawMaterial_PO.routes");
const rawMaterialInventoryRoutes = require("./routes/rawMaterialInventory.routes");
const rawMaterialPOBatchRoutes = require("./routes/rawMaterialPOBatch.routes");

app.use(bodyParser.json());
app.use(cors());

// calling routes here
warehouseRoutes(app);
authRoutes(app);
vendorRoutes(app);
categoryRoutes(app);
rawMaterialRoutes(app);
rawMaterialPORoutes(app);
rawMaterialInventoryRoutes(app);
rawMaterialPOBatchRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(process.env.MONGO_URL).then(
    () => {
      console.log("Mongodb connected...");
      // cronJob.start();
    },

    (err) => {
      console.log("Error occurred:", err);
    }
  );
});
