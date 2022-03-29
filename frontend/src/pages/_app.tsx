import { Typography } from "@mui/material";
import "modern-css-reset/dist/reset.min.css"; // CSSのリセット
import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"; // カレンダーのスタイルを取り込む
import { MaterialThemeProvider } from "../common/MaterialThemeProvider";
import { MediaQueryProvider } from "../common/MediaQueryProvider";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

// TS の場合はAppPropsを拡張しないとうまくLayoutの型エラーが解決できない
function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    // HACK: カスタムフックきりわけ
    // FIXME: ローダー実装
    const [loading, setLoading] = React.useState<boolean | undefined>(false);
    // const router = useRouter();

    // const handleStart = () => {
    //     setLoading(true);
    // };
    // const handleComplete = () => {
    //     setLoading(false);
    // };

    // React.useEffect(() => {
    //     router.events.on("routeChangeStart", handleStart);
    //     router.events.on("routeChangeComplete", handleComplete);
    //     router.events.on("routeChangeError", handleComplete);
    // }, [router]);

    // ページごとに定義されたレイアウトがある場合はそれを使用する
    const getLayout = Component.getLayout ?? ((page) => page);
    // FIXME:  Loadingコンポーネント 実装
    return loading === true ? (
        <Typography variant="h1">Loading...（仮実装）</Typography>
    ) : (
        <>
            <MaterialThemeProvider>
                <MediaQueryProvider>
                    {getLayout(<Component {...pageProps} />)}
                </MediaQueryProvider>
            </MaterialThemeProvider>
        </>
    );
}

export default MyApp;
