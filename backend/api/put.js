const util = require("../utils/utils")
const pool = require("./connectionPool")

/**
 * @author Tom
 * @version 1.0.0
 * @description HTTP PUTメソッドの動的API。更新処理のみとして使用。
 */
module.exports = function (req) {
    const _apiName = util.getApiName(req)

    let sqlStr = ""
    if (util.isExist(req.query)) {
        sqlStr += util.generateUpdateSql(_apiName, req.query)
        sqlStr += util.addWhere({ id: req.query.id })
        sqlStr += ";"
    }

    if (req.body.length) {
        sqlStr = ""
        req.body.forEach((_condition) => {
            sqlStr += util.generateUpdateSql(_apiName, _condition)
            sqlStr += util.addWhere({ id: _condition.id })
            sqlStr += "; "
        })
    }

    sqlSrt = console.log("UPDATE called")
    console.log("sql string: ", sqlStr)

    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                console.log(
                    "\n\t *** Cannot establish a connection with the database. ***"
                )
                console.error(err)
                con.release()
                reject(err)
            }
            con.query(sqlStr, function (err, rows, fields) {
                console.log(
                    "\n\t *** New connection established with the database. ***"
                )
                if (err) {
                    console.log("\n\t *** Cannot execution a running query ***")
                    console.error(err)
                    con.release()
                    reject(err)
                }
                con.release()
                resolve(rows)
            })
        })
    })
}

// request body
// [
//     {
//         "id":33,
//         "name":"Update test name",
//         "location":"Update test location",
//         "detail": "Update test detail",
//         "lastUpdate": "2020-12-01"

//     },
//     {
//          "id":34,
//         "name":"Update test name dos",
//         "location":"Update test location dos",
//         "detail": "Update test detail dos"
//     },
//          {
//          "id":32,
//         "name":"Update test name tores",
//         "location":"Update test location tores",
//         "detail": "Update test detail tores",
//         "createdDate": "2020-12-31"
//     }
// ]
