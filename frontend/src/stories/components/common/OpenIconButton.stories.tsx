import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import React from "react";
import {
    OpenIconButton,
    OpenIconButtonProps,
} from "../../../components/common/OpenIconButton";
export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: OpenIconButton,
    title: "OpenIconButton",
};

const Template: ComponentStory<typeof OpenIconButton> = (args) => (
    <OpenIconButton {...args} />
);

export const Default = Template.bind({});

const props: OpenIconButtonProps = {
    title: "YOUR NAME",
    subTitle: "Your department",
    footer: (
        <Button color="primary" variant="contained" endIcon={<LogoutIcon />}>
            ログアウト
        </Button>
    ),
    tooltip: "open profile",
    allSuffix: <ArrowForwardIosIcon style={{ color: "dimgray" }} />,
    menuList: [
        {
            icon: <ArrowForwardIosIcon />,
            label: "プロフィール",
        },
        {
            icon: "",
            label: "枚イベント",
        },
        {
            icon: "",
            label: "設定",
        },
    ],
};

Default.args = props;
