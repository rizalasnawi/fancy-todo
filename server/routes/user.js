const router = require('express').Router();
const {checkUserLogin} = require('../middleware')

router.use(checkUserLogin)
router.get('/')

module.exports = router