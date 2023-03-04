import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
// eslint-disable-next-line import/named
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { Head } from "../components/common/Head";
import { TopPageComponent } from "../components/top/TopPageComponent";
import { GetEventAllQuery, useGetEventAllQuery } from "../generated/graphql";
import { useContextDetailDrawer } from "../hooks/contexts/useContextDetailDrawer";
import { BaseEventProps } from "../types/connection";
import { defDateFormat } from "../utils/definitions";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

// TODO: 仮登録項目がある場合アサーションを出す
// TODO: 登録ボタンクリック時に確認ダイアログ出す
// TODO: 登録完了時にはメッセージをだす
// TODO: 削除時に確認ダイアログ出す
const Top = () => {
    // TODO: 移す
    const { doToggleDrawer, setKey } = useContextDetailDrawer();
    const { data: eventData } = useGetEventAllQuery();

    return (
        <>
            <Head
                title="TOP画面"
                description="TOP画面 "
                keyword="カレンダー トップ画面"
            />
            <Box height="auto">
                <TopPageComponent>
                    <Calendar
                        localizer={mLocalizer}
                        events={mapCalender(eventData?.getEventAll ?? [])}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ minHeight: 500, height: "80vh" }}
                        selectable
                        onSelectEvent={(e: Event) => {
                            const resource = e.resource as BaseEventProps;
                            doToggleDrawer?.("right", true);
                            setKey?.(resource.id!);
                        }}
                    />
                </TopPageComponent>
            </Box>
        </>
    );
};

Top.getLayout = (page: React.ReactNode) => {
    return <MainLayout bgcolor="white">{page}</MainLayout>;
};

export default Top;

// HACK: 関数の居場所
export const mapCalender = (data: GetEventAllQuery["getEventAll"]): Event[] =>
    data.map((datum) => ({
        id: datum.id,
        title: datum.name,
        start: moment(datum.begin).toDate(),
        end: moment(datum.end).toDate(),
        resource: {
            ...datum,
        },
    }));

export const mapAutocomplete = (data: GetEventAllQuery["getEventAll"]) =>
    data.map((datum) => ({
        id: datum.id,
        label: datum.name,
        from: moment(datum.begin).format(defDateFormat.ymd),
        to: moment(datum.end).format(defDateFormat.ymd),
        categoryId: datum.categoryId,
    }));
