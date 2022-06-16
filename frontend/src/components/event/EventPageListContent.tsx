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
    isOrganizer: boolean;
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: MUI.IconButtonProps["onClick"];
};

export const EventPageListContent: React.VFC<EventPageListContentProps> = ({
    onClickIcon,
    isOrganizer,
}) => {
    const { event, category, attendee } = React.useContext(FetchEventContext);
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
        [category?.data, event?.data, attendee?.data]
    );

    const attendeeEventIds = attendee?.data?.map((event) => event.eventId);
    const eventData = isOrganizer
        ? event?.data
        : event?.data?.filter((event) => attendeeEventIds?.includes(event.id as number));

    const events = React.useMemo(
        () =>
            eventData?.reduce((acc, event) => {
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
                        Object.entries(events).map(([date, eventDetail], idx) => {
                            const displayDate = date;
                            const displayWeekDay = moment(new Date(date)).format(
                                defDateFormat.fullDayOfWeek
                            );
                            return (
                                <>
                                    <Box
                                        sx={{
                                            marginTop: "-16px",
                                            paddingLeft: "20px",
                                            borderLeft: 1,
                                            borderColor: "grey.500",
                                            borderWidth: "medium",
                                            paddingBottom: "30px",
                                            "&:last-child": {
                                                borderLeft: 0,
                                                marginTop: "-26px",
                                                paddingLeft: "22px",
                                            },
                                        }}
                                    >
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
                                                    flexWrap: "nowrap",
                                                    paddingLeft: "14px",
                                                    marginLeft: "-53px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <CalendarMonthIcon
                                                    sx={{
                                                        width: "1.5em",
                                                        height: "1.5em",
                                                        color: "white",
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    component="p"
                                                    padding="1em 0"
                                                    marginLeft="28px"
                                                >
                                                    {displayDate}
                                                    {displayWeekDay}
                                                </Typography>
                                            </Box>
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
