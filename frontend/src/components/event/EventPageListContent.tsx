import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as MUI from "@mui/material";
import { Alert, Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { useContextDetailDrawer } from "../../hooks/contexts/useContextDetailDrawer";
import { BaseEventProps } from "../../types/connection";
import { defDateFormat } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { ButtonListType } from "../common/BaseListItemButton";
import { EventListItem, EventListItemProps } from "../common/EventListItem";
import { ANCHOR } from "../common/TemporaryDrawer";

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
    const { doToggleDrawer, setKey } = useContextDetailDrawer();

    const mapEventListItem = React.useCallback(
        (datum: BaseEventProps): EventListItemProps => ({
            key: datum.id,
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
    const events = React.useMemo(
        () =>
            event?.data?.reduce((acc, event) => {
                const { begin } = event;
                const dateStr = `${moment(begin).format(defDateFormat.ymd)}`;
                return {
                    ...acc,
                    [dateStr]: [...(acc[dateStr] || []), mapEventListItem(event)],
                };
            }, {} as { [dateStr: string]: EventListItemProps[] | undefined }),
        [event?.data, category?.data]
    );

    return (
        <>
            <MUI.Box
                sx={{
                    width: "400px",
                    marginLeft: "20px",
                }}
            >
                <MUI.List>
                    {events &&
                        // HACK: 分岐を外だし、または文言を定数化してリファクタ
                        Object.entries(events).map(([date, eventDetail], idx) => {
                            const displayDate = date;
                            const displayWeekDay = moment(new Date(date)).format(
                                defDateFormat.fullDayOfWeek
                            );
                            // console.log("eventInfo: ", eventInfo);
                            return (
                                <>
                                    <Box
                                        sx={{
                                            marginTop: "-16px",
                                            paddingLeft: "20px",
                                            borderLeft: 1,
                                            borderColor: "grey.500",
                                            borderWidth: "medium",
                                            paddingBottom: "10px",
                                            "&:last-child": {
                                                borderLeft: 0,
                                                marginTop: "-26px",
                                                paddingLeft: "22px",
                                            },
                                        }}
                                    >
                                        {/* TODO: Accordionに変更する 件数表示する*/}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    border: 0,
                                                    borderRadius: "50%",
                                                    width: "4em",
                                                    height: "4em",
                                                    bgcolor: "#ffd6c9",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                    paddingLeft: "14px",
                                                    marginLeft: "-53px",
                                                    marginRight: "10px",
                                                    // "&:first-child": {
                                                    //     marginTop: "-8px",
                                                    // },
                                                }}
                                            >
                                                <CalendarMonthIcon
                                                    sx={{
                                                        width: "1.5em",
                                                        height: "1.5em",
                                                        color: "white",
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                style={{}}
                                                sx={{
                                                    padding: "1em 0",
                                                }}
                                            >
                                                <p>{displayDate}</p>
                                                <p>{displayWeekDay}</p>
                                            </Typography>
                                        </Box>
                                        {eventDetail &&
                                        Object.entries(events).length <= 0 ? (
                                            // TODO: デザイン修正
                                            <Alert variant="filled" severity="info">
                                                予定はございません👍
                                            </Alert>
                                        ) : (
                                            eventDetail?.map((datum, idx) => (
                                                <EventListItem
                                                    key={`${idx}`}
                                                    {...datum}
                                                    style={{
                                                        marginBottom: "1em",
                                                        marginLeft: "20px",
                                                    }}
                                                    onClick={() => {
                                                        setKey?.(datum.key);
                                                        doToggleDrawer(
                                                            ANCHOR.RIGHT,
                                                            true
                                                        );
                                                    }}
                                                />
                                            ))
                                        )}
                                    </Box>
                                </>
                            );
                        })}
                </MUI.List>
            </MUI.Box>
        </>
    );
};
