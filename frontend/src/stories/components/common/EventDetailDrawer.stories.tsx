import { Button } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import {
    EventDetailDrawer,
    EventDetailDrawerProps,
} from "../../../components/common/EventDetailDrawer";
import { ANCHOR } from "../../../components/common/TemporaryDrawer";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: EventDetailDrawer,
    title: "EventDetailDrawer",
};

const Template: ComponentStory<typeof EventDetailDrawer> = (args) => (
    <EventDetailDrawer {...args} />
);

export const Default = Template.bind({});

const props: EventDetailDrawerProps = {
    title: "ファンファンファミリー",
    subTitle: "イベント詳細",
    max: 2,
    chipLabel: "交流",
    anchor: ANCHOR.RIGHT,
    location: "Zoom Meeting",
    beginDate: "2022-06-01",
    endDate: "2022-06-01",
    beginTime: "20:00",
    endTime: "22:00",
    margin: {
        top: "5em",
        bottom: "5em",
    },
    description:
        "<strong>わくわく！ファンファンイベント！</strong><br /><br /><p>あああああああああああああああああああああああ</p><p>いいいいいいいいいいいい</p>",
    avatarList: [
        {
            alt: "aaa",
            src: "",
        },
        {
            alt: "bbb",
            src: "",
        },
        {
            alt: "ccc",
            src: "",
        },
    ],
    category: "meetup",
    render: (toggleDrawer, anchor) => {
        return (
            <Button size="large" variant="contained" onClick={toggleDrawer(anchor, true)}>
                Open
            </Button>
        );
    },
    showCloseButton: true,
};

Default.args = props;

//
export const ButtonList = Template.bind({});

const buttonListProps: EventDetailDrawerProps = {
    ...props,
    buttonList: [
        {
            label: "イベント参加",
            onClick: (e) => {
                e;
            },
            color: "primary",
        },
        {
            label: "編集",
            color: "secondary",
        },
    ],
};

ButtonList.args = buttonListProps;
