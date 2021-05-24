const dbConn = require('../conf/db');
const moment = require("moment");

function test() {
    let query = `Insert into notes (title, description, created_at, updated_at) values `;
    let title = getRandomString(20);
    let description = getRandomString(200);
    let values = [];
    for (let i = 0; i < 5000; i++) {
        let randomN = random(-500, 0);
        let now = moment().add(randomN, 'days').format()
        values.push(`('${title}', '${description}', '${now}', '${now}') `)
    }

    query += values.join(", ")

    dbConn.query(query, function (err, row) {
        if (err) {
            console.error("Failed, ", err)
        } else {
            console.info("Data has been successfully inserted")
        }
        process.exit(0);
    });
}

function getRandomString(length) {
    const result           = [];
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

test()
