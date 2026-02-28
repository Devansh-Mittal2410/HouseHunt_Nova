const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addPropertyController, getAllOwnerPropertiesController, handleAllBookingstatusController, deletePropertyController, updatePropertyController, getAllBookingsController } = require("../controllers/ownerController");


const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${baseName}${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postproperty",
  upload.array("propertyImages"),
  authMiddleware,
  addPropertyController
);

router.get("/getallproperties", authMiddleware, getAllOwnerPropertiesController);

router.get("/getallbookings", authMiddleware, getAllBookingsController);

router.post("/handlebookingstatus", authMiddleware, handleAllBookingstatusController);

router.delete(
  "/deleteproperty/:propertyid",
  authMiddleware,
  deletePropertyController
);

router.patch(
  "/updateproperty/:propertyid",
  upload.single("propertyImage"),
  authMiddleware,
  updatePropertyController
);

module.exports = router;
