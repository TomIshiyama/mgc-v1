import { ButtonBase, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import React from "react";
import { COLOR } from "../../utils/styling";
import { EventPageListContent } from "./EventPageListContent";

// FIXME: MOCK 後で消す
const data = {
    day: new Date(),
};

const buttonProps = {
    colorGrey: "grey.500",
    colorPink: "#ffd6c9",
};

export const EventPageComponent: React.VFC<{ children: React.ReactNode }> = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const [isOrganizer, setIsOrganizer] = React.useState(true);

    const changeToOrganizerList = React.useCallback(() => {
        setIsOrganizer(true);
    }, []);
    const changeToAtendeeList = React.useCallback(() => {
        setIsOrganizer(false);
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: COLOR.normal.userBgcolor,
                marginTop: "20px",
            }}
        >
            <Typography variant="h3" color="#ffd6c9">
                マイイベント
            </Typography>
            <Stack
                direction="row"
                spacing={10}
                alignItems="center"
                sx={{ marginBottom: "10px" }}
            >
                <ButtonBase disableRipple>
                    <Typography
                        variant="h5"
                        padding="1em 0"
                        color={
                            isOrganizer ? buttonProps.colorPink : buttonProps.colorGrey
                        }
                        onClick={changeToOrganizerList}
                    >
                        主催イベント
                    </Typography>
                </ButtonBase>
                <ButtonBase disableRipple>
                    <Typography
                        variant="h5"
                        padding="1em 0"
                        color={
                            !isOrganizer ? buttonProps.colorPink : buttonProps.colorGrey
                        }
                        onClick={changeToAtendeeList}
                    >
                        参加イベント
                    </Typography>
                </ButtonBase>
            </Stack>
            <EventPageListContent
                isOrganizer={isOrganizer}
                buttonList={[]}
                description={<></>}
                onClickIcon={handleDrawerClose}
            />
        </Box>
    );
};
