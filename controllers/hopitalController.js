const Hospital = require('../models/Hospital');

// Get all hospitals
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find(); // Fetch all hospital records
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new hospital
const addHospital = async (req, res) => {
  try {
    const hospital = new Hospital(req.body); // Create a new hospital from request body
    const savedHospital = await hospital.save(); // Save hospital to the database
    res.status(201).json(savedHospital); // Respond with the saved hospital
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
};

// Update a hospital
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true }); // Update hospital by ID
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital); // Respond with the updated hospital
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a hospital
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findByIdAndDelete(id); // Delete hospital by ID
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json({ message: 'Hospital deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hospitals by their status (approved, rejected, or Pending)
const getHospitalsByStatus = async (req, res) => {
  const { status } = req.query; // Get the status from query params
  try {
    const hospitals = await Hospital.find({ status }); // Find hospitals by status
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getHospitals,
  addHospital,
  updateHospital,
  deleteHospital,
  getHospitalsByStatus,
};
