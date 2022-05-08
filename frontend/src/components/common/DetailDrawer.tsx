import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import RoomIcon from "@mui/icons-material/Room";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import * as MUIProps from "@mui/material";
import { Avatar, AvatarGroup, Box, Button, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { defDateFormat } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { COLOR } from "../../utils/styling";
import { TemporaryDrawer, TemporaryDrawerProps } from "./TemporaryDrawer";

export type BasicButtonType = {
    label: string;
    onClick?: MUIProps.ButtonProps["onClick"];
    color?: MUIProps.ButtonProps["color"];
    sx?: MUIProps.ButtonProps["sx"];
    variant?: MUIProps.ButtonProps["variant"];
    disabled?: MUIProps.ButtonProps["disabled"];
    options?: Omit<MUIProps.ButtonProps, "onClick" | "color" | "sx" | "variant">;
};

export type DetailDrawerProps = Omit<TemporaryDrawerProps, "children"> & {
    title: string;
    subTitle?: string;
    max?: MUIProps.AvatarGroupProps["max"];
    beginDate?: string | Date;
    endDate?: string | Date;
    beginTime?: string | Date;
    endTime?: string | Date;
    description?: string;
    category: EventCategoryType;
    chipLabel: string;
    avatarList?: {
        alt: MUIProps.AvatarProps["alt"];
        src: MUIProps.AvatarProps["src"];
    }[];
    buttonList?: BasicButtonType[];
    avatarSize?: number; // TODO: 定数化する
    location?: string;
    onClickJoin?: MUIProps.ButtonProps["onClick"];
};

const commonMap: {
    stack: MUIProps.StackProps;
} = {
    stack: { direction: "row", spacing: 1 },
};

export const DetailDrawer: React.VFC<DetailDrawerProps> = ({
    title,
    subTitle,
    max,
    beginDate,
    endDate,
    beginTime,
    endTime,
    description,
    category,
    chipLabel,
    avatarList,
    avatarSize,
    location,
    buttonList,
    onClickJoin,
    ...temporaryDrawerProps
}) => {
    const memoDateString = React.useMemo(() => {
        const beginString =
            typeof beginDate === "string"
                ? beginDate
                : moment(beginDate).format(defDateFormat.ymd);
        const endString =
            typeof endDate === "string"
                ? endDate
                : moment(endDate).format(defDateFormat.ymd);

        return beginString === endString
            ? beginString
            : `${beginString ?? ""}  ${endString ? `- ${endString}` : ""}`;
    }, [beginDate, endDate]);

    const memoTimeString = React.useMemo(() => {
        const beginString =
            typeof beginTime === "string"
                ? beginTime
                : moment(beginTime).format(defDateFormat.time24);
        const endString =
            typeof endTime === "string"
                ? endTime
                : moment(endTime).format(defDateFormat.time24);

        return beginString === endString
            ? beginString
            : `${beginString ?? ""}  ${endString ? `- ${endString}` : ""}`;
    }, [beginTime, endTime]);

    return (
        <>
            <TemporaryDrawer {...temporaryDrawerProps}>
                <Box
                    sx={{
                        minHeight: "calc(100vh - 10em)", // FIXME: 動的に対応
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    className="event-detail-drawer__wrapper"
                >
                    {/* top side */}
                    <Box className="event-detail-drawer__topside">
                        <Box margin=".5em 0 1em 0">
                            <Chip
                                size="small"
                                label={chipLabel}
                                sx={{
                                    padding: "0 .5em",
                                    bgcolor: COLOR[category],
                                }}
                            />

                            <Typography paddingTop=".5em" variant="h5">
                                {title}
                            </Typography>
                        </Box>
                        <Stack spacing={1} marginBottom="2em">
                            <Stack {...commonMap.stack}>
                                <RoomIcon />
                                <Typography>{location}</Typography>
                            </Stack>
                            <Stack {...commonMap.stack}>
                                <WatchLaterOutlinedIcon />
                                <Typography>{memoDateString}</Typography>
                            </Stack>
                            <Stack {...commonMap.stack}>
                                <DateRangeOutlinedIcon />
                                <Typography>{memoTimeString}</Typography>
                            </Stack>
                        </Stack>
                        {/* center side */}
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">{subTitle}</Typography>
                            <Typography variant="body2" component="div">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description ?? "",
                                    }}
                                />
                            </Typography>
                        </Stack>
                    </Box>

                    {/* bottom side */}
                    <Box>
                        <Stack
                            {...commonMap.stack}
                            margin="1em 0"
                            justifyContent="space-between"
                        >
                            <AvatarGroup max={max}>
                                {avatarList?.map((avatar, idx) => (
                                    <Avatar
                                        key={idx}
                                        alt={avatar.alt}
                                        src={avatar.src}
                                        sx={
                                            avatarSize
                                                ? {
                                                      width: avatarSize,
                                                      height: avatarSize,
                                                  }
                                                : {}
                                        }
                                    />
                                ))}
                            </AvatarGroup>
                            <Button color="primary" size="small" onClick={onClickJoin}>
                                {avatarList?.length}人参加中
                            </Button>
                        </Stack>
                        <Stack spacing={2}>
                            {buttonList?.map(({ label, options, ...props }) => (
                                <Button
                                    // Propsをデフォルトと差分更新して渡す
                                    {...{
                                        ...{ size: "large", variant: "contained" },
                                        ...{ ...props, ...options },
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </TemporaryDrawer>
        </>
    );
};
