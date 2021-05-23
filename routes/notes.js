const express = require('express');
const router = express.Router();
const dbConn  = require('../conf/db');
const moment = require("moment");

router.get('/', function(req, res, next) {
    let query = "select * from notes";
    dbConn.query(query, function(err,rows) {
        if(err) {
            res.send({data:''});
        } else {
            res.send(rows);
        }
    });
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    // @todo Validations.validateInteger()
    let query = `select * from notes where id = ${id}`;
    dbConn.query(query, function(err,row) {
        if(err) {
            res.status(400).send("Error occurred");
        } else {
            res.send(row);
        }
    });
});

router.post('/', function (req, res, next) {
    // @todo Validate params data (title, description)
    let now = moment().format()
    let query = `Insert into notes (title, description, created_at, updated_at) values ('${req.body.title}', '${req.body.description}', '${now}', '${now}')`;
    console.log(query)
    dbConn.query(query, function(err, row) {
        if(err) {
            res.status(400).send("Error occurred");
        } else {
            res.send(row);
        }
    });
})

router.put('/:id', function (req, res, next) {
    let body = req.body;
    let noteQuery = "sel"
})

router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    let query = `delete from notes where id = ${id}`;
    dbConn.query(query, function(err,row) {
        if(err) {
            res.status(400).send("Error occurred");
        } else {
            res.send(true);
        }
    });
})

module.exports = router;
