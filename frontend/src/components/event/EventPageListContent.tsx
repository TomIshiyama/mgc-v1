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
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: MUI.IconButtonProps["onClick"];
};

type EventListItemObjectProps = {
    [key: string]: string;
};
// Recharts - Warning: Prop id did not match. Server: を解消するためSSR無効化
// see -> https://github.com/vercel/next.js/issues/12863

export const EventPageListContent: React.VFC<EventPageListContentProps> = ({
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

    //------------------------------Niko-------------------------
    //FIXME: keyとして日付を使われているオブジェクトにeventsを纏めたいですが、タイプで引っかかっています。
    console.log("event?.data? ", event?.data);

    const testData:
        | {
              [dateStr: string]: EventListItemProps[] | undefined;
          }
        | undefined = React.useMemo(
        () =>
            event?.data?.reduce(
                (acc, event) => {
                    const { begin, id, categoryId, name } = event;
                    const dateStr = `${moment(begin).format(defDateFormat.ymd)}`;
                    return {
                        ...acc,
                        [dateStr]: [...(acc[dateStr] || []), { id, categoryId, name }],
                    };
                },
                {
                    // dateStr: [] as EventListItemProps[],
                }
            ),
        [event?.data, category?.data]
    );

    console.log("testData: ", testData);
    //------------------------------Niko-------------------------

    return (
        <>
            <MUI.Container sx={{ position: "absolute", width: "20%" }}>
                <MUI.List>
                    {testData &&
                        // HACK: 分岐を外だし、または文言を定数化してリファクタ
                        Object.entries(testData).map(([date, eventInfo], idx) => {
                            const displayWord = date;
                            // console.log("eventInfo: ", eventInfo);
                            return (
                                <>
                                    {/* TODO: Accordionに変更する 件数表示する*/}
                                    <Typography variant="h6" sx={{ padding: "1em 0" }}>
                                        {displayWord}
                                    </Typography>
                                    {eventInfo && Object.entries(testData).length <= 0 ? (
                                        // TODO: デザイン修正
                                        <Alert variant="filled" severity="info">
                                            予定はございません👍
                                        </Alert>
                                    ) : (
                                        eventInfo?.map((datum, idx) => (
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
