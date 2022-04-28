import { Button } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import { DetailDrawer, DetailDrawerProps } from "../../../components/common/DetailDrawer";
import { ANCHOR } from "../../../components/common/TemporaryDrawer";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: DetailDrawer,
    title: "DetailDrawer",
};

const Template: ComponentStory<typeof DetailDrawer> = (args) => (
    <DetailDrawer {...args} />
);

export const Default = Template.bind({});

const props: DetailDrawerProps = {
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

const buttonListProps: DetailDrawerProps = {
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
