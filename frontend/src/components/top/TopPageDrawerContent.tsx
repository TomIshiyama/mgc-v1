import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import * as MUI from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { defDrawerWidth } from "../../utils/definitions";
import { EventCategoryType } from "../../utils/displayData";
import { Z_INDEX } from "../../utils/styling";
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

// Recharts - Warning: Prop id did not match. Server: を解消するため動的に取得
// see -> https://github.com/vercel/next.js/issues/12863
const DynamicEventChart = dynamic(() => import("./EventChart"), { ssr: false });

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
                <DynamicEventChart />

                {/* <List> */}
                {buttonList.map((datum, idx) => (
                    <EventListItem
                        key={`${idx}`}
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
