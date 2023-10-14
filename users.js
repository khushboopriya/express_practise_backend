const express = require('express')
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  });
//   define the home page route
router.get('/', (req, res) => {
    console.log("here");
    res.send('users home page')
  });

module.exports = router;