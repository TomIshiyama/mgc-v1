import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

/**
 * Material UI のスタイル 一括設定ファイル
 */
const theme = createTheme({
    palette: {
        primary: {
            light: "#ffb1af",
            main: "#f08080", //lightCoral
            dark: "#ba5154",
            contrastText: "whitesmoke",
        },
        // secondary: {},
        // error: {
        //   main: "#E69200",
        // },
    },

    typography: {
        fontFamily: "Noto Sans JP",
        // body1: { color: "red" }, // フォントスタイルを個別に指定する
    },
});

export const MaterialThemeProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
