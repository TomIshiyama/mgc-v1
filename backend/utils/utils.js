// TODO: React プロジェクトに統合時、エクスポート宣言を変更
const dayjs = require("dayjs");

const Status = {
    Get: "GET",
    Post: "POST",
    Delete: "DELETE",
    Put: "PUT",
};

const generateGetSql = (_tableRef) => {
    let baseSelect = `select * from ${_tableRef}`;
};

/**
 *
 * @param {*} val
 * @returns 数字文字列→数値、数字文字列以外→'文字列'
 */
const _checkVal = (val) => {
    return typeof val === "number"
        ? val
        : val.match(/^([1-9]\d*|0)$/)
        ? +val
        : `\'${val}\'`;
};

/**
 * @param _tableRef {string} テーブルの名称
 * @param _setCondition e.g.:  {a:"1",b:"2",c:"3"}
 * @returns {string} MySQL update文
 */
const generateUpdateSql = (_tableRef, _setCondition) => {
    const base = `UPDATE ${_tableRef} SET`;

    const rt = Object.entries(_setCondition).reduce((accumulator, [key, val], index) => {
        let _snakeKey = camelToSnakeCase(key);
        return index === 0
            ? `${accumulator} ${_snakeKey} = ${_checkVal(val)}`
            : `${accumulator}, ${_snakeKey} = ${_checkVal(val)}`;
    }, base);

    return rt + " ";
};

// TODO: 外部参照もとを削除するとき
const generateDeleteSql = (_tableRef) => {
    const baseDelete = `delete from ${_tableRef}`;

    return baseDelete + " ";
    // userが削除されるとき　-> 面倒だから制約を緩和すべきでは？
};

/**
 * オブジェクトからWHERE句を生成する
 * @param {*} _obj e.g.:  {a:"1",b:"2",c:"3"}
 * @returns {string} SQL WHERE句
 */
const addWhere = (_obj) => {
    const base = "WHERE";

    const rt = Object.entries(_obj).reduce((accumulator, [key, val], index) => {
        let _snakeKey = camelToSnakeCase(key);
        return index === 0
            ? `${accumulator} ${_snakeKey} = ${_checkVal(val)}`
            : `${accumulator} AND ${_snakeKey} = ${_checkVal(val)}`;
    }, base);

    return rt + " ";
};

/**
 * 文字列の配列からORDER BY句を生成する
 * @param  {string[]} args 文字列の配列 e.g.: ["Apple","Microsoft","Id"]
 * @returns {string} SQL ORDER BY句
 */
const addOrderBy = (...args) => {
    const base = "ORDER BY";

    const rt = args.reduce((accumulator, current, index) => {
        return index === 0 ? `${accumulator} ${current}` : `${accumulator}, ${current}`;
    }, base);

    return rt + " ";
};

/**
 *
 * @param {number} num 整数値
 * @returns {string} SQL LIMIT句
 */
const addLimit = (num) => {
    return `LIMIT ${num} `;
};

/**
 * キャメルケースからスネークケースへ変換する
 * @param {string} キャメルケース文字列 e.g.:  userId
 * @returns {string} スネークケース文字列 e.g.: user_id
 */
const camelToSnakeCase = (str) => {
    return str.replace(/[\w]([A-Z])/g, (letter) =>
        `${letter[0]}_${letter[1]}`.toLowerCase()
    );
};

/**
 *
 * @param {request} req
 * @returns {string}apiName
 */
const getApiName = (req) => {
    return req.url.includes("?")
        ? req.url.slice(1, req.url.indexOf("?"))
        : req.url.split("/")[1];
};

/**
 *
 * @param {Object} obj
 * @returns {boolean} オブジェクトが存在する→true, 存在しない→false
 */
const isExist = (obj) => {
    return Object.keys(obj).length;
};

/**
 *
 * @param {Object} obj
 * @returns {Array} 渡されたパラメーターをkey=valueの形で返します
 */
const queryEntriesFromBody = (obj) =>
    Object.entries(obj)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(", ");

/**
 *
 * @param {Object} obj
 * @returns {Array} 渡されたパラメーターをkey=valueの形で返します
 */
const queryEntriesFromString = (obj) =>
    Object.entries(obj)
        .map(([key, value]) => `${key} = '%${value}%'`)
        .join(", ");

/**
 *
 * @param {Array} obj
 * @returns {String} 渡されたパラメーターをmysqlで使えるStringの形で返します
 */
const queryKeys = (obj) => Object.keys(obj).join(", ");

/**
 *
 * @param {Array} obj
 * @returns {String} 渡されたパラメーターをmysqlで使えるStringの形で返します
 */
const queryValues = (obj) =>
    Object.values(obj)
        .map((item) => `'${item}'`)
        .join(", ");

const parseValuesDateString = (value) =>
    dayjs(new Date(value)).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : value;

const mapDateString = (object) =>
    Object.entries(object).reduce((accum, [key, val], idx) => {
        return { ...accum, [key]: parseValuesDateString(val) };
    }, {});

// 各関数をエクスポート
exports.generateGetSql = generateGetSql;
exports.generateUpdateSql = generateUpdateSql;
exports.generateDeleteSql = generateDeleteSql;
exports.addWhere = addWhere;
exports.addOrderBy = addOrderBy;
exports.addLimit = addLimit;
exports.camelToSnakeCase = camelToSnakeCase;
exports.getApiName = getApiName;
exports.isExist = isExist;
exports.queryEntriesFromBody = queryEntriesFromBody;
exports.queryEntriesFromString = queryEntriesFromString;
exports.queryKeys = queryKeys;
exports.queryValues = queryValues;
exports.mapDateString = mapDateString;
