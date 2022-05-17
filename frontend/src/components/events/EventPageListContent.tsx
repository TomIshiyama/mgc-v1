import * as MUI from "@mui/material";
import { Alert, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { BaseEventProps } from "../../types/connection";
import { defDateFormat } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { ButtonListType } from "../common/BaseListItemButton";
import { EventListItem, EventListItemProps } from "../common/EventListItem";

export type EventPageListContentProps = {
    title?: string;
    subtitle?: string;
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: MUI.IconButtonProps["onClick"];
};

// Recharts - Warning: Prop id did not match. Server: を解消するためSSR無効化
// see -> https://github.com/vercel/next.js/issues/12863

export const EventPageListContent: React.VFC<EventPageListContentProps> = ({
    title,
    subtitle,
    onClickIcon,
}) => {
    const { event, category } = React.useContext(FetchEventContext);

    const mapEventListItem = React.useCallback(
        (datum: BaseEventProps): EventListItemProps => ({
            itemTitle: datum.name,
            itemText: `${moment(datum.begin).format(defDateFormat.time24)} - ${moment(
                datum.end
            ).format(defDateFormat.time24)}`,
            category: category?.data?.find((v) => v.id === datum.categoryId)
                ?.categoryCode as EventCategoryType,
            chipLabel: category?.data?.find((v) => v.id === datum.categoryId)?.name,
        }),
        [category?.data, event?.data]
    );

    // ただ単に表示するだけのやつは一旦不要なのでコメントアウト
    const buttonList: EventListItemProps[] =
        event?.data?.map((datum) => mapEventListItem(datum)) ?? [];

    //------------------------------Niko-------------------------
    //FIXME: keyとして日付を使われているオブジェクトにeventsを纏めたいですが、タイプで引っかかっています。
    console.log("event?.data? ", event?.data);

    const testData = event?.data?.reduce((acc, event) => {
        const { begin, id, categoryId, name } = event;
        return {
            ...acc,
            [begin as keyof typeof acc]: [
                ...(acc[begin as keyof typeof acc] || []),
                { id, categoryId, name },
            ],
        };
    }, {});

    console.log("testData: ", testData);
    //------------------------------Niko-------------------------

    // 当日、1週間以内、１ヶ月以内、それ以降にイベントを振り分け
    const buttonList2:
        | {
              today: EventListItemProps[] | undefined;
              week: EventListItemProps[] | undefined;
              month: EventListItemProps[] | undefined;
              future: EventListItemProps[] | undefined;
          }
        | undefined = React.useMemo(
        () =>
            event?.data?.reduce(
                (acc, cur) => {
                    if (
                        moment(cur.begin).diff(moment(), "days") < 0 && // 開始日 - 本日
                        moment(cur.end).diff(moment(), "days") < 0
                    ) {
                        return { ...acc };
                    } else if (
                        moment(cur.begin).diff(moment(), "days") === 0 ||
                        moment(cur.end).diff(moment(), "days") === 0
                    ) {
                        return { ...acc, today: [...acc?.today, mapEventListItem(cur)] };
                    } else if (
                        moment(cur.begin).isBetween(moment(), moment().add(7, "days")) ||
                        moment(cur.end).isBetween(moment(), moment().add(7, "days"))
                    ) {
                        return { ...acc, week: [...acc?.week, mapEventListItem(cur)] };
                    } else if (
                        moment(cur.begin).isBetween(
                            moment(),
                            moment().add(1, "months")
                        ) ||
                        moment(cur.end).isBetween(moment(), moment().add(1, "months"))
                    ) {
                        return { ...acc, month: [...acc?.month, mapEventListItem(cur)] };
                    } else {
                        return {
                            ...acc,
                            future: [...acc?.future, mapEventListItem(cur)],
                        };
                    }
                },
                {
                    today: [] as EventListItemProps[],
                    week: [] as EventListItemProps[],
                    month: [] as EventListItemProps[],
                    future: [] as EventListItemProps[],
                }
            ),
        [event?.data, category?.data]
    );

    console.log("buttonList2: ", buttonList2);
    console.log("buttonList: ", buttonList);
    // const buttonList2:

    return (
        <>
            <MUI.Container sx={{ position: "absolute", width: "20%" }}>
                <MUI.List>
                    {buttonList2 &&
                        // HACK: 分岐を外だし、または文言を定数化してリファクタ
                        Object.entries(buttonList2).map(([key, buttonList], idx) => {
                            const displayWord =
                                key === "today"
                                    ? "本日の予定"
                                    : key === "week"
                                    ? "1週間以内"
                                    : key === "month"
                                    ? "1ヶ月以内"
                                    : "それ以降";
                            return (
                                <>
                                    {/* TODO: Accordionに変更する 件数表示する*/}
                                    <Typography variant="h6" sx={{ padding: "1em 0" }}>
                                        {displayWord}
                                    </Typography>
                                    {buttonList && buttonList.length <= 0 ? (
                                        // TODO: デザイン修正
                                        <Alert variant="filled" severity="info">
                                            予定はございません👍
                                        </Alert>
                                    ) : (
                                        buttonList?.map((datum, idx) => (
                                            <EventListItem
                                                key={`${idx}`}
                                                {...datum}
                                                style={{ marginBottom: "1em" }}
                                            />
                                        ))
                                    )}
                                </>
                            );
                        })}
                </MUI.List>
            </MUI.Container>
        </>
    );
};
