const express = require("express");
const {
  addHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
  getHospitalsByStatus,
} = require("../controllers/hopitalController");
const router = express.Router();

router.route("/").get(getHospitals).post(addHospital);
router.route("/:id").put(updateHospital).delete(deleteHospital);
router.route("/listAll").get(getHospitals);
router.route("/status").get(getHospitalsByStatus);

module.exports = router;
