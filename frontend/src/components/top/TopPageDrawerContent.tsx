import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import { Box, Container, IconButton, IconButtonProps, Typography } from "@mui/material";
import React from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { defDrawerWidth } from "../../utils/definitions";
import { BaseListItemButton, ButtonListType } from "../common/BaseListItemButton";

export type TopPageDrawerContentProps = {
    title?: string;
    subtitle?: string;
    description?: React.ReactNode;
    buttonList: ButtonListType[];
    onClickIcon?: IconButtonProps["onClick"];
};

const buttonList = [
    {
        label: "aaa",
        icon: <CircleTwoToneIcon />,
    },
    {
        label: "aaa",
        icon: <CircleTwoToneIcon />,
    },
    {
        label: "aaa",
        icon: <CircleTwoToneIcon />,
    },
];

const data = [
    {
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
];

export const TopPageDrawerContent: React.VFC<TopPageDrawerContentProps> = ({
    title,
    subtitle,
    onClickIcon,
}) => {
    return (
        <>
            <Container>
                <IconButton
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
                </IconButton>

                <Box display="flex" alignItems="end">
                    <Typography color="primary" variant="h4">
                        {title}
                    </Typography>
                    <Typography color="primary" variant="subtitle1">
                        {subtitle}
                    </Typography>
                </Box>

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
                    <Bar dataKey="pv" stackId="userEventId" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="userEventId" fill="#82ca9d" />
                    <Bar dataKey="amt" stackId="userEventId" fill="#74ca1d" />
                </BarChart>
                <BaseListItemButton buttonList={buttonList} />
            </Container>
        </>
    );
};
