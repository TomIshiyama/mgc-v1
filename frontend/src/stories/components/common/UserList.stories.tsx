import { ComponentStory } from "@storybook/react";
import React from "react";
import { UserList, UserListProps } from "../../../components/common/UserList";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: UserList,
    title: "UserList",
};

const Template: ComponentStory<typeof UserList> = (args) => (
    <div style={{ maxWidth: "1000px", width: "100%" }}>
        <UserList {...args} />
    </div>
);

export const Default = Template.bind({});

const groupListMock: UserListProps["groupList"] = [...Array<number>(5)].map((v, i) => ({
    title: `Group ${i + 1}`,
    userList: [...Array<number>(10)].map((v, i) => ({
        key: `${i}`,
        title: `田中 ${i + 1}郎`,
        text: i === 0 ? "admin" : "member",
    })),
}));

const props: UserListProps = {
    title: "ユーザー管理",
    groupList: groupListMock,
};

Default.args = props;
