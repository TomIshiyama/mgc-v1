import LockIcon from "@mui/icons-material/Lock";
import { Container } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import React from "react";
import { MenuLinkList, MenuLinkListProps } from "../../../components/common/MenuLinkList";

export default {
    component: MenuLinkList,
    title: "MenuLinkList",
};

const Template: ComponentStory<typeof MenuLinkList> = (args: any) => (
    <Container style={{ width: "400px" }}>
        <MenuLinkList {...args} />
    </Container>
);

export const Default = Template.bind({});

const props: MenuLinkListProps = {
    menuList: [
        {
            label: "aaa",
            icon: <LockIcon />,
            link: "#",
        },
        {
            label: "aaa",
            icon: <LockIcon />,
            link: "#",
        },
        {
            label: "aaa",
            icon: <LockIcon />,
            link: "#",
        },
    ],
};

Default.args = props;
