const express = require('express')
const router = express.Router();
const developers = require('./developers');

// app.use("/",developers);

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  });

router.use('/developers',developers);

module.exports = router;


