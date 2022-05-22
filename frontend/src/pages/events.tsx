import moment from "moment";
import React from "react";
// eslint-disable-next-line import/named
import { momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { FetchEventContext } from "../common/FetchEventProvider";
import { Head } from "../components/common/Head";
import { EventPageComponent } from "../components/event/EventPageComponent";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Events = () => {
    // 疎通の動作確認のためだけに書いた
    // TODO: 移す
    const { event } = React.useContext(FetchEventContext);

    return (
        <>
            <Head
                title="マイイベント"
                description="マイイベント "
                keyword="マイイベント"
            />
            <EventPageComponent></EventPageComponent>
        </>
    );
};

Events.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default Events;
