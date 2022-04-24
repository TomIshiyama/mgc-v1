const pool = require("./connectionPool");
const util = require("../utils/utils");
const humps = require("humps");

module.exports = function (req) {
    console.log("req.url: ", req.url);
    const _apiName = util.getApiName(req);

    let checkBody = () => {
        for (i in req.body) return true;
        return false;
    };
    if (!checkBody()) return;

    // camelCase -> snake_case
    const snakes = humps.decamelizeKeys(req.body);
    console.log("body in index: ", snakes);
    const queryEntries = util.queryEntriesFromBody(snakes);
    const queryKeys = util.queryKeys(snakes);
    const queryValues = util.queryValues(snakes);

    const loginQue = `select * from users where ${queryEntries.replace(/,/g, " AND")}`;
    const insertQue = `INSERT into ${_apiName} (${queryKeys}) values (${queryValues});`;
    const mySqlQuery = _apiName.includes("login") ? loginQue : insertQue;

    console.log("mySqlQuery : ", mySqlQuery);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                con.release();
                reject("Can't connect to the server");
            }
            con.query(mySqlQuery, function (err, result, fields) {
                if (err) reject(err);
                console.log("query result:", result);

                if (result && result.length) result.map((obj) => delete obj.password);
                resolve(result);
            });
        });
    });
};
