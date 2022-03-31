import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import * as material from "@mui/material";
import React from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { defDrawerWidth } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { ButtonListType } from "../common/BaseListItemButton";
import { EventListItem } from "../common/EventListItem";

export type TopPageDrawerContentProps = {
    title?: string;
    subtitle?: string;
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: material.IconButtonProps["onClick"];
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

const data = [
    {
        pv: 1,
        uv: 1,
        meeting: 2,
    },
];

export const TopPageDrawerContent: React.VFC<TopPageDrawerContentProps> = ({
    title,
    subtitle,
    onClickIcon,
}) => {
    return (
        <>
            <material.Container>
                <material.IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={onClickIcon}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "100%",

                        transform: `translateY(-50%) translateX(-${defDrawerWidth.subMain}px)`,
                    }}
                    // sx={{ ...(open && { display: "none" }) }}
                    // open ? handleDrawerClose : handleDrawerOpen
                >
                    <ArrowForwardIosIcon />
                </material.IconButton>

                <material.Box display="flex" alignItems="end">
                    <material.Typography color="primary" variant="h4">
                        {title}
                    </material.Typography>
                    <material.Typography color="primary" variant="subtitle1">
                        {subtitle}
                    </material.Typography>
                </material.Box>

                {/* 分布 */}
                {/* TODO: コンポーネント切り分け */}
                <material.Typography variant="h6">イベント分布</material.Typography>
                <BarChart
                    width={defDrawerWidth.subMain - 25}
                    height={80}
                    layout="vertical"
                    data={data}
                    margin={{ top: 0, left: -20, right: 20, bottom: 0 }}
                    // style={{ position: "absolute" }}
                >
                    <Tooltip />
                    <Legend />
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
                    {/* //FIXME:  定数を使用*/}
                    <Bar dataKey="pv" stackId="userEventId" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="userEventId" fill="#82ca9d" />
                    <Bar dataKey="meeting" stackId="userEventId" fill="#74ca1d" />
                </BarChart>

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
            </material.Container>
        </>
    );
};
