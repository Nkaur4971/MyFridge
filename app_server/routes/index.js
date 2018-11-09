var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlFood = require('../controllers/food');
/* GET home page. */
router.get('/', ctrlMain.index);
/* GET displayList page. */
router.get('/displayList', ctrlFood.displayList);
/* GET createEditpage. */
router.get('/createEdit', ctrlFood.createEdit);

module.exports = router;
