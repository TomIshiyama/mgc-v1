import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Typography } from "@mui/material";
import "modern-css-reset/dist/reset.min.css"; // CSSのリセット
import moment from "moment";
import "moment/locale/ja";
import { NextPage } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css"; // カレンダーのスタイルを取り込む
import "react-date-range/dist/styles.css"; // react-date-range main css file
import "react-date-range/dist/theme/default.css"; // react-date-range theme css file
import { DetailDrawerProvider } from "../common/DetailDrawerProvider";
import { FetchEventProvider } from "../common/FetchEventProvider";
import { MaterialThemeProvider } from "../common/MaterialThemeProvider";
import { MediaQueryProvider } from "../common/MediaQueryProvider";

moment.locale("ja");
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GQL_API_ENDPOINT,
    cache: new InMemoryCache(),
});

// TS の場合はAppPropsを拡張しないとうまくLayoutの型エラーが解決できない
function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
    const { push, pathname } = useRouter();
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
    // useRedirectAuth();

    /** trueならリダイレクトする 判定チェック */
    // const checkRedirect = React.useCallback(() => {
    //     return (
    //         !session &&
    //         !(
    //             pathname === pagesPath.signin.$url().pathname ||
    //             pathname === pagesPath.signup.$url().pathname
    //         )
    //     );
    // }, [session, pathname]);

    // React.useEffect(() => {
    //     // 特定のページのみ処理を除く
    //     if (!checkRedirect()) {
    //         return;
    //     }
    //     void push(pagesPath.signin.$url().pathname);
    // }, []);

    // レイアウト 表示設定
    // ページごとに定義されたレイアウトがある場合はそれを使用する
    const getLayout = Component.getLayout ?? ((page) => page);

    // コンポーネント表示
    if (loading === true) {
        // FIXME:  Loadingコンポーネント 実装
        return <Typography variant="h1">Loading...（仮実装）</Typography>;
    }

    // FIXME: リダイレクト中のページを表示する
    // if (checkRedirect()) {
    //     return <Typography variant="h1">リダイレクトします...（仮実装）</Typography>;
    // }

    return (
        <SessionProvider session={session as Session}>
            <ApolloProvider client={client}>
                <MaterialThemeProvider>
                    <MediaQueryProvider>
                        <FetchEventProvider>
                            <DetailDrawerProvider>
                                {getLayout(<Component {...pageProps} />)}
                            </DetailDrawerProvider>
                        </FetchEventProvider>
                    </MediaQueryProvider>
                </MaterialThemeProvider>
            </ApolloProvider>
        </SessionProvider>
    );
}

export default MyApp;
