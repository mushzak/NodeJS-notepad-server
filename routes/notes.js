const express = require('express');
const router = express.Router();
const NotesManager = require("../manager/NotesManager");

router.get('/', function (req, res, next) {
    let manager = new NotesManager();
    manager.fetch((err, response) => {
        return res.send(response);
    });
});

router.get('/:id', function (req, res, next) {
    let manager = new NotesManager();
    manager.fetch((err, response) => {
        return res.send(response);
    }, req.params.id);
});

router.post('/', function (req, res, next) {
    let manager = new NotesManager();
    manager.create(req, (err, response) => {
        if (!err) {
            return res.send(true)
        }
    })
})

router.put('/:id', function (req, res, next) {
    let manager = new NotesManager();
    manager.update(req.params.id, req.body, (err, response) => {
        if (!err) {
            return res.send(true)
        }
        return res.status(400).send(err)
    })
})

router.delete('/:id', function (req, res, next) {
    let manager = new NotesManager();
    manager.delete(req.params.id, (err, response) => {
        if (!err) {
            return res.send(true)
        }
    })
})

module.exports = router;
