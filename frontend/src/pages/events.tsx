import moment from "moment";
import React from "react";
// eslint-disable-next-line import/named
import { momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { FetchEventContext } from "../common/FetchEventProvider";
import { Head } from "../components/common/Head";
import { EventPageComponent } from "../components/events/EventPageComponent";
import { useFetch } from "../hooks/request/useFetch";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Events = () => {
    // 疎通の動作確認のためだけに書いた
    const { data, loading, error } = useFetch({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}users`,
        headers: {},
    });

    // TODO: 移す
    const { event } = React.useContext(FetchEventContext);

    return (
        <>
            <Head
                title="イベント画面"
                description="イベント画面 "
                keyword="イベント画面"
            />
            <EventPageComponent></EventPageComponent>
        </>
    );
};

Events.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default Events;
