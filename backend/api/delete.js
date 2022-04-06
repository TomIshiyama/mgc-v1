const util = require("../utils/utils");
const pool = require("./connectionPool");

/**
 * @author Tom
 * @version 1.0.0
 * @description HTTP DELETEメソッドの動的API
 */
module.exports = function (req) {
    const _apiName = util.getApiName(req);
    // TODO(Low): パスパラメータを取得できるように改良
    //    const _pathParam = req.slice(_apiName.length,req.url.indexOf("/"))

    let sqlStr = "";

    if (util.isExist(req.query)) {
        sqlStr = util.generateDeleteSql(_apiName);
        sqlStr += util.addWhere(req.query);
        sqlStr += ";";
    } else if (req.body.length) {
        sqlStr = "";
        req.body.forEach((_condition) => {
            sqlStr += util.generateDeleteSql(_apiName);
            sqlStr += util.addWhere(_condition);
            sqlStr += "; ";
        });
    }

    console.log("DELETE called");
    console.log("sql string: ", sqlStr);

    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                // mysqlErrorHandling(connection, err);
                console.log(
                    "\n\t *** Cannot establish a connection with the database. ***"
                );
                console.error(err);
                con.release();
                reject(err);
            }
            console.log("\n\t *** New connection established with the database. ***");
            con.query(sqlStr, function (err, rows, fields) {
                if (err) {
                    console.log("\n\t *** Cannot execution a running query ***");
                    console.error(err);
                    con.release();
                    reject(err);
                }
                con.release();
                resolve(rows);
            });
        });
    });
};
