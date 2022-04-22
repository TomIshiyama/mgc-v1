import moment from "moment";
import React from "react";
// eslint-disable-next-line import/named
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { FetchEventContext } from "../common/FetchEventProvider";
import { Head } from "../components/common/Head";
import { TopPageComponent } from "../components/top/TopPageComponent";
import { useFetch } from "../hooks/request/useFetch";
// import { eventListMock } from "../mock/eventList";
import { BaseEventProps } from "../types/connection";
import { defDateFormat } from "../utils/definitions";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Top = () => {
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
                title="TOP画面"
                description="TOP画面 "
                keyword="カレンダー トップ画面"
            />
            <TopPageComponent>
                <Calendar
                    localizer={mLocalizer}
                    events={mapCalender(event?.data ?? [])}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ minHeight: 500, height: "80vh" }}
                    // defaultDate={new Date(2022, 7, 10)} TODO: Autocompleteのイベント時に表示月を変更するべきか？
                />
            </TopPageComponent>
        </>
    );
};

Top.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default Top;

// HACK: 関数の居場所
export const mapCalender = (data: BaseEventProps[]): Event[] =>
    data.map((datum) => ({
        id: datum.id,
        title: datum.name,
        start: moment(datum.begin).toDate(),
        end: moment(datum.end).toDate(),
    }));

export const mapAutocomplete = (data: BaseEventProps[]) =>
    data.map((datum) => ({
        id: datum.id,
        label: datum.name,
        from: moment(datum.begin).format(defDateFormat.ymd),
        to: moment(datum.end).format(defDateFormat.ymd),
        categoryId: datum.categoryId,
    }));
