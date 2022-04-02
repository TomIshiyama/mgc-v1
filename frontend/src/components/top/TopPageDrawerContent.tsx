import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import * as MUI from "@mui/material";
import React from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { defDrawerWidth } from "../../utils/definitions";
import {
    eventCategory,
    eventCategoryCode,
    EventCategoryObjectType,
    EventCategoryType,
} from "../../utils/displayData";
import { COLOR, Z_INDEX } from "../../utils/styling";
import { ButtonListType } from "../common/BaseListItemButton";
import { EventListItem } from "../common/EventListItem";

export type TopPageDrawerContentProps = {
    title?: string;
    subtitle?: string;
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: MUI.IconButtonProps["onClick"];
};

//FIXME: 削除
const buttonList = [
    {
        label: "UD会議",
        icon: <CircleTwoToneIcon />,
        subLabel: "17:00 - 19:00",
        category: "meeting",
    },
    {
        label: "はまべん",
        icon: <CircleTwoToneIcon />,
        subLabel: "17:00 - 19:00",
        category: "tech",
    },
    {
        label: "はまとーーーーく",
        icon: <CircleTwoToneIcon />,
        subLabel: "17:00 - 19:00",
        category: "meetup",
    },
];

const data: EventCategoryObjectType[] = [
    {
        [eventCategoryCode.meeting]: 1,
        [eventCategoryCode.tech]: 3,
        [eventCategoryCode.meetup]: 2,
    },
];

export const TopPageDrawerContent: React.VFC<TopPageDrawerContentProps> = ({
    title,
    subtitle,
    onClickIcon,
}) => {
    return (
        <>
            <MUI.Container>
                {/* 閉じるボタン */}
                <MUI.IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={onClickIcon}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "100%",
                        zIndex: Z_INDEX.toggleDrawer,
                        transform: `translateY(-50%) translateX(-${defDrawerWidth.subMain}px)`,
                    }}
                    // sx={{ ...(open && { display: "none" }) }}
                    // open ? handleDrawerClose : handleDrawerOpen
                >
                    <ArrowForwardIosIcon />
                </MUI.IconButton>

                <MUI.Box display="flex" alignItems="end" marginTop={"5em"}>
                    <MUI.Typography color="primary" variant="h4">
                        {title}
                    </MUI.Typography>
                    <MUI.Typography color="primary" variant="subtitle1">
                        {subtitle}
                    </MUI.Typography>
                </MUI.Box>

                {/* 分布 */}
                {/* TODO: コンポーネント切り分け */}
                <MUI.Box margin="3em 0" position="relative">
                    <MUI.Typography variant="h6">イベント分布</MUI.Typography>
                    <BarChart
                        width={defDrawerWidth.subMain - 25}
                        height={80}
                        layout="vertical"
                        data={data}
                        margin={{ top: 0, left: -20, right: 20, bottom: 0 }}
                        // style={{ position: "absolute" }}
                    >
                        <Tooltip />
                        {/* <Legend /> */}
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                            tickMargin={0}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={false}
                            tickMargin={0}
                        />
                        {/* //FIXME: カテゴリは追加される可能性があるので動的にコンテンツを作る*/}
                        <Bar
                            dataKey={eventCategoryCode.meeting}
                            stackId="userEventId"
                            fill={COLOR.meeting}
                        />
                        <Bar
                            dataKey={eventCategoryCode.tech}
                            stackId="userEventId"
                            fill={COLOR.tech}
                        />
                        <Bar
                            dataKey={eventCategoryCode.meetup}
                            stackId="userEventId"
                            fill={COLOR.meetup}
                        />
                    </BarChart>
                    {/* // カテゴリが追加されることを考慮しイテレーションで */}
                    {/* as [EventCategoryType,number] */}
                    <MUI.Box sx={{ position: "absolute", bottom: "0.5em" }}>
                        {Object.entries(data[0]).map(([key, val], idx) => (
                            <MUI.Typography variant="caption">
                                {`${eventCategory[key as EventCategoryType]} : ${val} `}
                            </MUI.Typography>
                        ))}
                    </MUI.Box>
                </MUI.Box>

                {/* <List> */}
                {buttonList.map((datum, i) => (
                    <EventListItem
                        key={`${i}`}
                        itemTitle={datum.label}
                        itemText={datum.subLabel}
                        category={datum.category as EventCategoryType}
                        style={{ marginBottom: "1em" }}
                    />
                ))}
                {/* </List> */}
            </MUI.Container>
        </>
    );
};
