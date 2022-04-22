import { ComponentStory } from "@storybook/react";
import React from "react";
import { DateRangePickerModal } from "../../../components/common/DateRangePickerModal";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: DateRangePickerModal,
    title: "DateRangePickerModal",
};

const Template: ComponentStory<typeof DateRangePickerModal> = (args) => (
    <DateRangePickerModal {...args} />
);

export const Default = Template.bind({});

const props = {};
Default.args = props;
