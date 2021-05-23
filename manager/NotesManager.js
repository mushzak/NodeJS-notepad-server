const dbConn  = require('../conf/db');
const moment = require("moment");


/**
 * Manager class which is responsible for managing all the actions related to the notes (CRUD)
 */

class NotesManager {

    constructor() {}

    /**
     * Responsible for fetching notes data from the table. In case of empty parameter `id` it will return all data, otherwise specific note with the corresponding id will be returned
     * @param callback
     * @param id
     */
    fetch(callback, id = null) {
        let query = "select * from notes";
        if(id) {
            query += ` where id = ${id}`
        }
        dbConn.query(query, function (err, res) {
            if(err) {
                callback(err)
            } else {
                callback(null, res)
            }
        });
    }

    /**
     * Delete note from the database
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = `delete from notes where id = ${id}`;
        dbConn.query(query, function(err, row) {
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });
    }

    /**
     * Creates new note
     * @param req
     * @param callback
     */
    create(req, callback) {
        // @todo Validate params data (title, description)
        let now = moment().format()
        let query = `Insert into notes (title, description, created_at, updated_at) values ('${req.body.title}', '${req.body.description}', '${now}', '${now}')`;
        dbConn.query(query, function(err, row) {
            if(err) {
                callback(err);
            } else {
                callback(null, row)
            }
        });
    }

    /**
     * Updates note based on the `id`
     * @param id
     * @param data
     * @param callback
     */
    update(id, data, callback) {
        this.fetch((err, res) => {
            if(!err && res.length > 0) {
                let query = `UPDATE notes SET description='${data.description}', title='${data.title}' WHERE id=${id}`;
                dbConn.query(query, function(err, row) {
                    if(err) {
                        callback(err);
                    } else {
                        callback(null, row)
                    }
                });
            }
            callback({success: false, reason: "Unknown id is specified"});
        }, id);
    }

    getChartData(req) {

    }

}

module.exports = NotesManager;
