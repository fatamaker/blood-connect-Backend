const mongoose = require("mongoose");

const donorSchema = mongoose.Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    disease: { type: String, required: false },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    unit: { type: Number, required: true },
    age: { type: Number },
    requestDate: { type: Date}, 
    governorate: { type: String, required: true },
    hospitalName: { type: String, required: true },
    donationType: {
      type: String,
      required: true,
      enum: ["For a Patient", "Free Donation"],
    },
    patientName: {
      type: String,
      required: function () {
        return this.donationType === "For a Patient";
      },
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "Pending"],
      default: "Pending",
    },
  },
  { collection: "Donor", timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
