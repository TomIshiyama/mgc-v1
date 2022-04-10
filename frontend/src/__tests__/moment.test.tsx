import moment from "moment";

describe("Momentコンポーネント", () => {
    it("日付の差分", () => {
        const date = new Date();
        date.setHours(date.getHours() - 1);
        expect(moment().diff(moment(date), "days")).toBe(0);
    });

    it("週の差分", () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        expect(moment(date).isBetween(moment(), moment().add(7, "days"))).toBe(true);
    });

    it("月の差分", () => {
        const date = new Date(2022, 4, 1);
        expect(moment(date).isBetween(moment(), moment().add(1, "months"))).toBe(true);
    });
});
