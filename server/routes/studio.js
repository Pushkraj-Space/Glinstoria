const express = require('express');
const router = express.Router();

const {getAllStudio,createStudio, getStudioById, findStudios , connectionReqToUser} = require('../controllers/studioController');

// Search Studio by user name
router.get('/find', findStudios)

// Get Studio by id of Studio owner
router.get('/:id', getStudioById);

// Get all studio information
router.get('/', getAllStudio);

// Create new Studio
router.post('/', createStudio);

// send connection request to user by user_name of user
router.post('/connTo/:id', connectionReqToUser);


module.exports = router;