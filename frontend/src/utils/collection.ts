import moment from "moment";
import { Serialized } from "./types";

/**
 * @param value
 * @return values を timestamp にする
 */
export const parseValuesDateString = <T = any>(value: T) =>
    value instanceof Date ? moment(value).format("YYYY-MM-DD HH:mm:ss") : value;

/**
 *
 * @param object
 * @returns プロパティのValueがDateの場合、timestampに変換
 */
export const mapDateString = <T>(object: T): Serialized<T> =>
    Object.entries(object).reduce((accum, [key, val], idx) => {
        return { ...accum, [key]: parseValuesDateString(val) };
    }, {} as Serialized<T>);
