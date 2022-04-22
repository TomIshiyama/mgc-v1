import { ComponentStory } from "@storybook/react";
import React from "react";
import {
    DateRangePicker,
    DateRangePickerProps,
} from "../../../components/common/DateRangePicker";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: DateRangePicker,
    title: "DateRangePicker",
};

const Template: ComponentStory<typeof DateRangePicker> = (args) => (
    <DateRangePicker {...args} />
);

export const Default = Template.bind({});

const props: DateRangePickerProps = {
    mode: "dialog",
};

Default.args = props;
