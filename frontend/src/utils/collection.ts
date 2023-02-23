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
export const mapDateString = <T extends string>(object: T): Serialized<T> =>
    Object.entries(object).reduce((accum, [key, val], idx) => {
        return { ...accum, [key]: parseValuesDateString(val) };
    }, {} as Serialized<T>);

/** Nullishを省いた配列を返却する */
export const excludeNullish = <T>(array: T[]): NonNullable<T>[] => {
    const data = array.filter((v) => v != null);
    return data as unknown as NonNullable<T>[];
};
