import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import React from "react";
import {
    BaseListItemButton,
    BaseListItemButtonProps,
} from "../../../components/common/BaseListItemButton";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: BaseListItemButton,
    title: "BaseListItemButton",
};

const Template: ComponentStory<typeof BaseListItemButton> = (args) => (
    <BaseListItemButton {...args} />
);

export const Default = Template.bind({});

const props: BaseListItemButtonProps = {
    footer: (
        <Button color="primary" variant="contained" endIcon={<LogoutIcon />}>
            ログアウト
        </Button>
    ),
    buttonList: [
        {
            icon: <LockIcon />,
            label: "プロフィール",
            suffix: <LockIcon />,
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
