import { IconButton } from "@mui/material";
import React from "react";
import { EventPageListContent } from "./EventPageListContent";

// FIXME: MOCK 後で消す
const data = {
    day: new Date(),
};

export type EventPageComponentProps = {
    children: React.ReactNode;
};

export const EventPageComponent: React.VFC<EventPageComponentProps> = ({ children }) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                // 画面中央右寄せ
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: `translateY(-50%) translateX(-40px)`, //HACK : MAGIC NUMBER撲滅
                }}
            ></IconButton>
            <EventPageListContent
                buttonList={[]}
                description={<></>}
                onClickIcon={handleDrawerClose}
            />
        </>
    );
};
