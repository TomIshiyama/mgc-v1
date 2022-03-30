import { ComponentStory } from "@storybook/react";
import React from "react";
import {
    EventListItem,
    EventListItemProps,
} from "../../../components/common/EventListItem";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: EventListItem,
    title: "EventListItem",
};

const Template: ComponentStory<typeof EventListItem> = (args) => (
    <div style={{ width: "400px" }}>
        <EventListItem {...args} />
    </div>
);

export const Default = Template.bind({});

const props: EventListItemProps = {
    itemTitle: "aaa",
    itemText: "aa",
    category: "meeting",
};

Default.args = props;
