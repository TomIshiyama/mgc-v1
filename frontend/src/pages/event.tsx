import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Head } from "../components/common/Head";
import { EventPageComponent } from "../components/event/EventPageComponent";
import { COLOR } from "../utils/styling";

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Event = () => {
    return (
        <>
            <Head
                title="マイイベント"
                description="マイイベント "
                keyword="マイイベント"
            />
            <EventPageComponent children={undefined} />
        </>
    );
};

Event.getLayout = (page: React.ReactNode) => {
    return (
        <MainLayout bgcolor={COLOR.normal.userBgcolor} frontMode="temporary">
            {page}
        </MainLayout>
    );
};

export default Event;
