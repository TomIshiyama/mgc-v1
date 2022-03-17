const pool = require("./connectionPool")
const util = require("../utils/utils")

module.exports = function (req) {
    console.log("req.url: ", req.url)
    const _apiName = util.getApiName(req)

    let checkBody = () => {
        for (i in req.body) return true
        return false
    }
    if (!checkBody()) return

    const queryEntries = util.queryEntriesFromBody(req.body)
    const queryKeys = util.queryKeys(req.body)
    const queryValues = util.queryValues(req.body)

    const loginQue = `select * from users where ${queryEntries.replace(
        /,/g,
        " AND"
    )}`
    const insertQue = `INSERT into ${_apiName} (${queryKeys}) values (${queryValues})`

    const mySqlQuery = _apiName.includes("login") ? loginQue : insertQue

    console.log("msq query: ", mySqlQuery)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                con.release()
                reject("Can't connect to the server")
            }
            con.query(mySqlQuery, function (err, result, fields) {
                if (err) reject(err)
                console.log("query result:", result)

                if (result && result.length)
                    result.map((obj) => delete obj.password)
                resolve(result)
            })
        })
    })
}
