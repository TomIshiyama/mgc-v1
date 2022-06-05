import { Box } from "@mui/system";
import React from "react";
import { COLOR } from "../../utils/styling";
import { EventPageListContent } from "./EventPageListContent";

// FIXME: MOCK 後で消す
const data = {
    day: new Date(),
};

export const EventPageComponent: React.VFC<{ children: React.ReactNode }> = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: COLOR.normal.userBgcolor,
                marginTop: "20px",
                // borderLeft: 1,
                // borderColor: "grey.500",
                // borderWidth: "medium",
                // "&:last-child": {
                //     borderLeft: 0,
                // },
            }}
        >
            <EventPageListContent
                buttonList={[]}
                description={<></>}
                onClickIcon={handleDrawerClose}
            />
        </Box>
    );
};
