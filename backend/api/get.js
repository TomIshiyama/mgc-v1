const pool = require("./connectionPool");
const util = require("../utils/utils");

module.exports = function (req) {
    console.log("req: ", req.query, "req.url: ", req.url);

    const _apiName = util.getApiName(req);
    const queryEntries =
        JSON.stringify(req.query) === "{}"
            ? false
            : util.queryEntriesFromString(req.query);

    const filterQue = queryEntries
        ? `select * from ${_apiName} where ${queryEntries
              .replace(/,/g, " AND")
              .replace(/=/g, "LIKE")}`
        : false;

    const selectAllQue = `SELECT * from ${_apiName}`;

    const mySqlQuery = queryEntries ? filterQue : selectAllQue;
    console.log("mySqlQuery: ", mySqlQuery);

    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                con.release();
                reject("Can't connect to the server");
            }
            con.query(mySqlQuery, function (err, result, fields) {
                if (err) reject("Something is wrong");
                con.release();
                resolve(result);
            });
        });
    });
};
