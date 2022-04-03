import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { MainLayout } from "../../layouts/MainLayout";
import { Head } from "../components/common/Head";
import { TopPageComponent } from "../components/top/TopPageComponent";
import { eventListMock } from "../mock/eventList";

// モーメントを使用する
const mLocalizer = momentLocalizer(moment);

const Top = () => {
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
                    events={eventListMock}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ minHeight: 500, height: "80vh" }}
                />
            </TopPageComponent>
        </>
    );
};

Top.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default Top;
