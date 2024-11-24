const Contact = require("../models/contact");
const sendMail = require("../utils/sendMail");

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new message
const addMessage = async (req, res) => {
  try {
    const message = new Contact(req.body);
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a message

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Body:", req.body); // Make sure the body contains the correct field

    // Ensure you're updating the 'replied' field, not 'status'
    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { replied: req.body.status },
      { new: true }
    );

    console.log("updatedMessage:", updatedMessage);

    if (!updatedMessage)
      return res.status(404).json({ message: "Message not found" });

    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Contact.findByIdAndDelete(id);
    if (!deletedMessage)
      return res.status(404).json({ message: "Message not found" }); // Handle not found
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages by their replied status
const getMessagesByRepliedStatus = async (req, res) => {
  const { replied } = req.query;
  try {
    const messages = await Contact.find({ replied });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addReplyMessage = async (req, res) => {
  try {
    const { contactId, replyMessage } = req.body;
    
    const updatedMessage = await Contact.findByIdAndUpdate(
      contactId,
      {
        replyMessage: replyMessage,
        replied: 'Replied',
      },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const subject = "Thank You for Contacting Us!";
    const htmlMessage = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        /* General Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
    
        /* Body Styles */
        body {
          font-family: Arial, sans-serif;
          background: #B22B2B;
          color: #fff;
          padding: 0;
          margin: 0;
        }
    
        /* Main Email Container */
        .email-container {
          max-width: 700px;
          margin: 50px auto;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
    
        /* Header Styles */
        .email-header {
          text-align: center;
          padding: 25px;
          background-color: #B22B2B;
          border-radius: 10px 10px 0 0;
        }
    
        .email-header h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 15px;
        }
    
        .email-header img {
          width: 80px;
          margin-top: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
    
        /* Email Content Section */
        .email-content {
          font-size: 18px;
          line-height: 1.6;
          color: #333;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          margin-top: 20px;
        }
    
        .email-content p {
          margin-bottom: 20px;
        }
    
        .email-content blockquote {
          font-style: italic;
          color: #555;
          border-left: 4px solid #B22B2B;
          padding-left: 20px;
          margin: 15px 0;
        }
    
        /* Icon Section */
        .email-icons {
          text-align: center;
          padding: 20px;
          margin-top: 20px;
        }
    
        .email-icons img {
          margin: 10px;
          width: 60px;
          height: 60px;
          transition: transform 0.3s ease;
        }
    
        .email-icons img:hover {
          transform: scale(1.1);
        }
    
        /* Footer Section */
        .email-footer {
          font-size: 14px;
          color: #bbb;
          text-align: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px solid #ccc;
        }
    
        .email-footer p {
          margin-bottom: 10px;
        }
    
        .email-footer a {
          color: #B22B2B;
          text-decoration: none;
          font-weight: bold;
        }
    
        .email-footer a:hover {
          text-decoration: underline;
        }
    
        /* Responsive Styles */
        @media (max-width: 600px) {
          .email-container {
            padding: 20px;
            margin: 20px;
          }
    
          .email-header h1 {
            font-size: 2rem;
          }
    
          .email-content {
            font-size: 16px;
          }
    
          .email-icons img {
            width: 50px;
            height: 50px;
          }
        }
      </style>
    </head>
    <body>
    
      <div class="email-container">
        <!-- Header Section -->
        <div class="email-header">
          <h1>Thank You for Contacting Us!</h1>
          <img src="https://img.icons8.com/clouds/100/drop-of-blood.png" alt="drop-of-blood">
        </div>
    
        <!-- Email Content Section -->
        <div class="email-content">
          <p>Hi <strong>${updatedMessage.fullName}</strong>,</p>
          <p>Thank you for reaching out to us. We have received your message:</p>
          <blockquote>"${updatedMessage.message}"</blockquote>  
          <strong>Reply :</strong>
          <p>${updatedMessage.replyMessage}</p>
          <p>Our team is currently reviewing your inquiry, and we will get back to you shortly. Please feel free to contact us again if you have any additional questions.</p>
          <p>Best regards,</p>
          <p><strong>Blood Connect SupportTeam</strong></p>
        </div>
    
        <!-- Icons Section (only 2 logos) -->
        <div class="email-icons">
          <img src="https://img.icons8.com/clouds/100/drop-of-blood.png" alt="drop-of-blood"/>
          <img src="https://img.icons8.com/pulsar-gradient/48/--bloodbag.png" alt="--bloodbag"/>
        </div>
    
        <!-- Footer Section -->
        <div class="email-footer">
          <p>&copy; 2024 Blood Connect. All rights reserved.</p>
          <p>Contact us: <a href="mailto:blood.connect.teams@gmail.com">blood.connect.teams@gmail.com</a> | +216 557 166</p>
        </div>
      </div>
    
    </body>
    </html>
    `;

    await sendMail(updatedMessage.email, subject, htmlMessage);

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  getMessagesByRepliedStatus,
  addReplyMessage,
};
