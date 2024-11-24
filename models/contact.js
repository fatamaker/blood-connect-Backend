// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  replyMessage: { type: String},
  replied: { 
    type: String, 
    enum: ['Pending', 'Replied' , 'Rejected'],
    default: 'Pending'
  },
},
{ collection: "Contact", timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
