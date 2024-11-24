const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes for "Contact Us" functionality
router.get('/', contactController.getMessages);
router.post('/', contactController.addMessage);
router.post('/reply', contactController.addReplyMessage);
router.put('/:id', contactController.updateMessage);
router.delete('/:id', contactController.deleteMessage);
router.get('/status', contactController.getMessagesByRepliedStatus);

module.exports = router;
