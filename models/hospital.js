const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    adresse: { type: String, required: true },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    units: { type: Number, required: true },
    age: { type: Number },
    requestDate: { type: String },
    governorate: { type: String, required: true },
    hospitalName: { type: String, required: true },
    requestingDepartment: { type: String },
    date: { type: String },
    reason: { type: String },
    patientName: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Donation", "Request"],
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "Pending"],
      default: "Pending",
    },
  },
  { collection: "Hospital", timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
