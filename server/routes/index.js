const router = require('express').Router();

const studioRouter = require('./studio');
const userRouter = require('./user');

router.use('/studio', studioRouter);

router.use('/user', userRouter);


module.exports = router;