import { ButtonBase, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import moment from "moment";
import { useSession } from "next-auth/react";
import React from "react";
import {
    GetEventListQuery,
    useDecoderQuery,
    useGetAttendeeEventListByUserIdQuery,
    useGetEventListQuery,
} from "../../generated/graphql";
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

    const { data: session } = useSession();

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

    const { data: decoderData, loading: decoderLoading } = useDecoderQuery();
    const category = decoderData?.decoder.category;

    const { data: eventData, loading: eventLoading } = useGetEventListQuery({
        variables: {
            params: { userId: session?.user?.userId },
        },
    });

    const { data: attendeeEventData, loading: attendeeLoading } =
        useGetAttendeeEventListByUserIdQuery({
            variables: {
                userId: session?.user?.userId as number,
            },
        });

    // console.log("eventData:", eventData);

    const mapEventListItem = React.useCallback(
        (datum: BaseEventProps): EventListItemProps => ({
            key: datum.id as React.Key,
            itemTitle: datum.name,
            itemText: `${moment(datum.begin).format(defDateFormat.time24)} - ${moment(
                datum.end
            ).format(defDateFormat.time24)}`,
            category: category?.find((v) => v.id === datum.categoryId)
                ?.code as EventCategoryType,
            chipLabel: category?.find((v) => v.id === datum.categoryId)?.name,
        }),
        [category]
    );

    // const attendeeEventList = eventData.filter(
    //     (event) => event.userId != testUserId
    // );
    // const organizeEventList = eventData?.getEventListByUserId?.eventList?.filter(
    //     (event) => event.userId === testUserId
    // );

    const reMap = (args: GetEventListQuery["getEventList"] | null | undefined) =>
        args?.reduce((acc, event) => {
            const { begin } = event as { begin: string };
            const dateStr = `${moment(begin).format(defDateFormat.ymd)}`;
            return {
                ...acc,
                [dateStr]: [...(acc[dateStr] || []), mapEventListItem(event)],
            };
        }, {} as { [dateStr: string]: EventListItemProps[] | undefined });

    if (decoderLoading || eventLoading || attendeeLoading) return <></>;
    return (
        <Box
            sx={{
                backgroundColor: COLOR.normal.userBgcolor,
                marginTop: "20px",
                display: "inherit",
                height: "805px",
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
                events={
                    isOrganizer
                        ? reMap(eventData?.getEventList)
                        : reMap(attendeeEventData?.getAttendeeEventListByUserId.eventList)
                }
                buttonList={[]}
                description={<></>}
                onClickIcon={handleDrawerClose}
            />
        </Box>
    );
};
