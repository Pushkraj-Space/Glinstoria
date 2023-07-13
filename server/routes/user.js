const express = require('express');
const router = express.Router();

const {getAllUsers,createUser,getUser,getAllConnectionReq,acceptRequest} = require('../controllers/userController');

// Get user by id
router.get('/:id', getUser);

// Get all user information
router.get('/', getAllUsers);

// Create new User
router.post('/', createUser);

// Get all connection requests
router.get('/connReq/:id', getAllConnectionReq)

// Accept connection request
router.post('/accpReq/:id', acceptRequest)
module.exports = router;