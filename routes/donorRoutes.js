const express = require('express');
const {
  getDonors,
  addDonor,
  updateDonor,
  deleteDonor,
  getBloodTypes,
} = require('../controllers/donorController');

const router = express.Router();

router.route('/').get(getDonors).post(addDonor);
router.route('/:id').put(updateDonor).delete(deleteDonor);
router.route('/listAll').get(getDonors); 
router.route('/blood-types/listAll').get(getBloodTypes);

module.exports = router;
