import { Button } from "@mui/material";
import { ComponentStory } from "@storybook/react";
import {
    ANCHOR,
    TemporaryDrawer,
    TemporaryDrawerProps,
} from "../../../components/common/TemporaryDrawer";

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: TemporaryDrawer,
    title: "TemporaryDrawer",
};

const Template: ComponentStory<typeof TemporaryDrawer> = (args) => (
    <TemporaryDrawer {...args} />
);

export const Default = Template.bind({});
const props: TemporaryDrawerProps = {
    // title: "YOUR NAME",
    // subTitle: "Your department",
    render: (toggleDrawer, anchor) => {
        return (
            <Button size="large" variant="contained" onClick={toggleDrawer(anchor, true)}>
                Open
            </Button>
        );
    },
    anchor: ANCHOR.RIGHT,
    children: "aaaaaaaaaaaaaaaaaaaa",
    defaultOpen: false,
    margin: { top: "100px" },
    // children: (
    //     <>
    //         <Typography>ああああああああ</Typography>
    //         <Button color="primary" variant="contained" endIcon={<LogoutIcon />}>
    //             <Chip label="Deletable" variant="outlined" color="secondary" />
    //         </Button>
    //     </>
    // ),
};
Default.args = props;

export const ShowCloseButton = Template.bind({});
const showCloseButtonProps: TemporaryDrawerProps = {
    ...props,
    showCloseButton: true,
};
ShowCloseButton.args = showCloseButtonProps;
