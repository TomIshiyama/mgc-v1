import { ButtonBase, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { BaseEventProps } from "../../types/connection";
import { defDateFormat } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { COLOR } from "../../utils/styling";
import { EventListItemProps } from "../common/EventListItem";
import { EventPageListContent } from "./EventPageListContent";

// FIXME: MOCK 後で消す
const data = {
    day: new Date(),
};

const buttonProps = {
    colorGrey: "grey.500",
    colorPink: "#ffd6c9",
};

export const EventPageComponent: React.VFC<{ children: React.ReactNode }> = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const [isOrganizer, setIsOrganizer] = React.useState(true);

    const changeToOrganizerList = React.useCallback(() => {
        // filterEvs("yes");
        setIsOrganizer(true);
    }, []);
    const changeToAtendeeList = React.useCallback(() => {
        // filterEvs("no");
        setIsOrganizer(false);
    }, []);

    const { event, category, attendee } = React.useContext(FetchEventContext);

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

    const orgData = event?.data;
    const attendeeEventIds = attendee?.data?.map((event) => event.eventId);
    const attData = event?.data?.filter((event) =>
        attendeeEventIds?.includes(event.id as number)
    );

    const reMap = (args: BaseEventProps[] | null | undefined) =>
        args?.reduce((acc, event) => {
            const { begin } = event;
            const dateStr = `${moment(begin).format(defDateFormat.ymd)}`;
            return {
                ...acc,
                [dateStr]: [...(acc[dateStr] || []), mapEventListItem(event)],
            };
        }, {} as { [dateStr: string]: EventListItemProps[] | undefined });

    return (
        <Box
            sx={{
                backgroundColor: COLOR.normal.userBgcolor,
                marginTop: "20px",
            }}
        >
            <Typography variant="h3" color="#ffd6c9">
                マイイベント
            </Typography>
            <Stack
                direction="row"
                spacing={10}
                alignItems="center"
                sx={{ marginBottom: "10px" }}
            >
                <ButtonBase disableRipple>
                    <Typography
                        variant="h5"
                        padding="1em 0"
                        color={
                            isOrganizer ? buttonProps.colorPink : buttonProps.colorGrey
                        }
                        onClick={changeToOrganizerList}
                    >
                        主催イベント
                    </Typography>
                </ButtonBase>
                <ButtonBase disableRipple>
                    <Typography
                        variant="h5"
                        padding="1em 0"
                        color={
                            !isOrganizer ? buttonProps.colorPink : buttonProps.colorGrey
                        }
                        onClick={changeToAtendeeList}
                    >
                        参加イベント
                    </Typography>
                </ButtonBase>
            </Stack>
            <EventPageListContent
                events={isOrganizer ? reMap(orgData) : reMap(attData)}
                buttonList={[]}
                description={<></>}
                onClickIcon={handleDrawerClose}
            />
        </Box>
    );
};
