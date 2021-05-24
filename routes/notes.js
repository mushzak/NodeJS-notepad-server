const express = require('express');
const router = express.Router();
const NotesManager = require("../manager/NotesManager");

/**
 * Get notes
 */
router.get('/', function (req, res, next) {
    let manager = new NotesManager();
    manager.fetch(req.query,(err, response) => {
        if(err) {
            return res.status(400).send(err)
        }
        return res.send(response);
    });
});

router.get('/chart', function (req, res, next) {
    let manager = new NotesManager();
    manager.fetchByDate(req.query,(err, response) => {
        if(err) {
            return res.status(400).send(err)
        }
        return res.send(response);
    });
});

/**
 * Get notes by id
 */
router.get('/:id', function (req, res, next) {
    let manager = new NotesManager();
    manager.fetch((err, response) => {
        if(err) {
            return res.status(422).send(err)
        }
        return res.send(response);
    }, req.params.id);
});

/**
 * Create note
 */
router.post('/', function (req, res, next) {
    let manager = new NotesManager();
    manager.create(req, (err, response) => {
        if(err) {
            return res.status(422).send(err)
        }
        return res.send({success: true})
    })
})

/**
 * Update note
 */
router.put('/:id', function (req, res, next) {
    let manager = new NotesManager();
    manager.update(req.params.id, req.body, (err, data) => {
        if (!err) {
            return res.send(true)
        }
        return res.status(400).send(err)
    })
})

/**
 * Delete note
 */
router.delete('/:id', function (req, res, next) {
    const manager = new NotesManager();
    const id = req.params.id;
    manager.delete(id, (err, response) => {
        if(err) {
            return res.status(400).send(err)
        }
        return res.send(id)
    })
})

module.exports = router;
