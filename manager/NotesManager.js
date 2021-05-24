const dbConn = require('../conf/db');
const moment = require("moment");


/**
 * Manager class which is responsible for managing all the actions related to the notes (CRUD)
 */

class NotesManager {

    constructor() {
    }

    /**
     * Responsible for fetching notes data from the table. In case of empty parameter `id` it will return all data, otherwise specific note with the corresponding id will be returned
     * @param data
     * @param callback
     */
    fetch(data, callback) {
        let limit = +data.limit || 10;
        let offset = +data.offset || 0;
        let target = data.query;
        let query;

        if (target && target.length > 0) {
            query = `SELECT * FROM notes where title like '%${target}%' or description like '%${target}%' order by created_at desc limit ${limit} offset ${offset}`;
        } else {
            query = `SELECT * FROM notes order by created_at desc limit ${limit} offset ${offset}`;
        }

        dbConn.query(query, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    }

    /**
     * Fetch notes by ID
     * @param id
     * @param callback
     */
    fetchById(id, callback) {
        let query = `SELECT * FROM notes where id = ${id} ORDER BY created_at DESC`;
        dbConn.query(query, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
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
        dbConn.query(query, function (err, row) {
            if (err) {
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
        if(!req.body.title || !req.body.description || req.body.title.length === 0 || req.body.description === 0) {
            callback("Missing required fields")
            return;
        }

        let now = moment().format()
        let query = `Insert into notes (title, description, created_at, updated_at) values ('${req.body.title}', '${req.body.description}', '${now}', '${now}')`;
        dbConn.query(query, function (err, row) {
            if (err) {
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
        this.fetchById(id, (err, res) => {
            if (err || res.length === 0) {
                callback({success: false, reason: "Unknown id is specified"});
                return;
            }

            let query = `UPDATE notes SET description='${data.description}', title='${data.title}' WHERE id=${id}`;
            dbConn.query(query, function (err, row) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, row)
                }
            });

        });
    }

    /**
     * Fetch notes by given date (from, to)
     * @param params
     * @param callback
     */
    fetchByDate(params, callback) {
        if(!params.from || !params.to) {
            callback("Dates are required")
            return;
        }

        // This query returns data until the mentioned date.
        let query = `SELECT DATE_FORMAT(created_at , '%m/%d/%Y') as name,
                    (SELECT COUNT(*) 
                    FROM notes AS n2 where n2.created_at < n1.created_at) AS value
                    FROM notes AS n1
                    where created_at >= '${params.from}' and created_at <= '${params.to}'
                    group by name
                    order by n1.created_at desc`;

        dbConn.query(query, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    }
}

module.exports = NotesManager;
