const Donor = require('../models/Donor');

// Get all donors
const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();  // Ensure this is working by checking the database connection and schema
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new donor
const addDonor = async (req, res) => {
    try {
      const donor = new Donor(req.body); // Create a new donor from the request body
      const savedDonor = await donor.save(); // Save the donor to the database
      res.status(201).json(savedDonor); // Respond with the saved donor
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle errors
    }
  };

// Update a donor
const updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findByIdAndUpdate(id, req.body, { new: true });  // Find and update donor by ID
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);  // Return the updated donor
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a donor
const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findByIdAndDelete(id);  // Delete donor by ID
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get blood type statistics with sum of units
const getBloodTypes = async (req, res) => {
  try {
    const bloodTypes = await Donor.aggregate([
      {
        $match: { status: "approved" }, // Filter only approved donors
      },
      {
        $group: {
          _id: "$bloodGroup", // Group by blood group
          count: { $sum: 1 }, // Count the number of donors in each blood group
          totalUnits: { $sum: "$unit" }, // Sum up the units (correct field name is 'unit')
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id", // Rename _id to type
          count: 1, // Include count of donors
          totalUnits: 1, // Include sum of donated units
        },
      },
    ]);
    res.json(bloodTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getDonors,
  addDonor,
  updateDonor,
  deleteDonor,
  getBloodTypes,
};
