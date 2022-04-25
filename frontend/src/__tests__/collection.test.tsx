import moment from "moment";
import { mapDateString, parseValuesDateString } from "../utils/collection";

describe("parseValuesDateString()", () => {
    it("Date型では指定のtimestampに変換", () => {
        const date = new Date(2022, 9, 2, 10, 10, 10);
        const result = parseValuesDateString(date);
        expect(result).toBe("2022-10-02 10:10:10");
    });

    it("Date型以外→そのまま値を返却", () => {
        // const date = new Date(2022, 9, 2, 10, 10, 10);
        const date = 33;
        const result = parseValuesDateString(date);
        expect(result).toBe(33);
    });
    it("dateとMomentの変換確認", () => {
        const date = new Date(2022, 9, 2, 10, 10, 10);
        const result = moment(date).format("YYYY-MM-DD HH:mm:ss");

        expect(result).toBe("2022-10-02 10:10:10");
    });

    it("Date か判定", () => {
        const date = new Date();
        const num = {};

        expect(date instanceof Date).toBe(true);
        expect(num instanceof Date).toBe(false);
    });
});

describe("parseValuesDateString()", () => {
    it("Date 型のValueがあればそれをStringに変換する", () => {
        const data = mapDateString({
            userId: 1,
            name: "formValues.eventTitle",
            begin: new Date(2022, 9, 2, 10, 10, 10),
            end: new Date(2022, 9, 2, 10, 10, 10),
        });

        const expected = {
            userId: 1,
            name: "formValues.eventTitle",
            begin: "2022-10-02 10:10:10",
            end: "2022-10-02 10:10:10",
        };

        expect(data).toStrictEqual(expected);
    });
});
