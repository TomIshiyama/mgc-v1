/// <reference types="jest" />
import { render } from "@testing-library/react";
import { Sample } from "../components/sample/Sample";
import Home from "../pages";

describe("Sampleコンポーネント", () => {
    it("Home ページコンポーネントが存在している", () => {
        expect(Home).toBeTruthy();
    });

    test("should first", () => {
        const { getByText } = render(<Sample />);
        expect(getByText("Nextjs+Jestのサンプルサプリ")).toBeTruthy();
        expect(getByText("設定がすごく楽になりました。")).toBeTruthy();
    });
});
