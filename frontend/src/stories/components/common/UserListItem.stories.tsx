import { ComponentStory } from "@storybook/react";
import React from "react";
import { UserListItem, UserListItemProps } from "../../../components/common/UserListItem";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: UserListItem,
    title: "UserListItem",
};

const Template: ComponentStory<typeof UserListItem> = (args) => (
    <div style={{ maxWidth: "1000px", width: "100%" }}>
        <UserListItem {...args} />
    </div>
);

export const Default = Template.bind({});

const props: UserListItemProps = {
    itemTitle: "田中太郎",
    itemText: "管理者",
};

Default.args = props;
