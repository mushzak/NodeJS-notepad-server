const express = require('express');
const router = express.Router();
const dbConn  = require('../conf/db');

router.get('/', function(req, res, next) {
    let query = "Select * from notes";

    res.send('success');
});

router.post('/', function (req, res, next) {

})

router.put('/', function (req, res, next) {

})

router.delete('/', function (req, res, next) {

})


module.exports = router;
