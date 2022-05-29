import moment from "moment";
import React from "react";
// eslint-disable-next-line import/named
import { momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { FetchEventContext } from "../common/FetchEventProvider";
import { Head } from "../components/common/Head";
import { EventPageComponent } from "../components/event/EventPageComponent";
import { useContextDetailDrawer } from "../hooks/contexts/useContextDetailDrawer";
import { COLOR } from "../utils/styling";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Event = () => {
    // 疎通の動作確認のためだけに書いた
    // TODO: 移す
    const { event } = React.useContext(FetchEventContext);
    const { doToggleDrawer, setKey } = useContextDetailDrawer();

    return (
        <>
            <Head
                title="マイイベント"
                description="マイイベント "
                keyword="マイイベント"
            />
            <EventPageComponent>
                {/* onSelectEvent=
                {(e: Event) => {
                    const resource = e.resource as BaseEventProps;
                    doToggleDrawer?.("right", true);
                    setKey?.(resource.id);
                }} */}
            </EventPageComponent>
        </>
    );
};

Event.getLayout = (page: React.ReactNode) => {
    return <MainLayout bgcolor={COLOR.normal.userBgcolor}>{page}</MainLayout>;
};

export default Event;
