import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import * as MListItemButton from "@mui/material/ListItemButton";
import React from "react";

export type ButtonListType = {
    label: string;
    onClick?: MListItemButton.ListItemButtonProps["onClick"];
    selected?: MListItemButton.ListItemButtonProps["selected"];
    icon: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    divider?: boolean;
};

export type BaseListItemButtonProps = {
    buttonList: ButtonListType[];
    footer?: React.ReactNode;
};

export const BaseListItemButton: React.VFC<BaseListItemButtonProps> = ({
    buttonList,
    footer,
}) => {
    return (
        <>
            <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <List component="nav" aria-label="main mailbox folders">
                    {buttonList.map(
                        (
                            { label, onClick, selected, icon, prefix, suffix, divider },
                            i
                        ) => (
                            <>
                                <ListItemButton
                                    key={`${i}`}
                                    selected={selected}
                                    onClick={onClick}
                                >
                                    {prefix}
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText secondary={label} />
                                    {suffix}
                                </ListItemButton>
                                {divider && <Divider />}
                            </>
                        )
                    )}
                </List>
                {footer && (
                    <Box
                        id="open-icon-button-footer"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        paddingTop="1em"
                        paddingBottom="0.5em"
                    >
                        {footer}
                    </Box>
                )}
            </Box>
        </>
    );
};
