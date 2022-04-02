import {
    Avatar,
    Box,
    Divider,
    Link as MLink,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SxProps,
} from "@mui/material";
import * as MListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import React from "react";

export type ButtonListType = {
    label: string;
    onClick?: MListItemButton.ListItemButtonProps["onClick"];
    selected?: MListItemButton.ListItemButtonProps["selected"];
    icon: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    divider?: boolean;
    link?: string;
    onAvatar?: boolean;
};

export type BaseListItemButtonProps = {
    menuList: ButtonListType[];
    footer?: React.ReactNode;
    allDivider?: boolean;
    allPrefix?: React.ReactNode;
    allSuffix?: React.ReactNode;
    style?: SxProps;
};

export const BaseListItemButton: React.VFC<BaseListItemButtonProps> = ({
    menuList,
    footer,
    allDivider,
    allPrefix,
    allSuffix,
    style,
}) => {
    return (
        <>
            <Box sx={{ width: "100%", bgcolor: "background.paper", ...style }}>
                <List component="nav" aria-label="main mailbox folders">
                    {menuList.map(({ link, divider, ...internalProps }, i) => (
                        <>
                            {link ? (
                                <Link href={link} key={`${i}`} passHref>
                                    <MLink
                                        color={"primary"}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <InternalMenuItem
                                            {...{
                                                suffix: allSuffix,
                                                prefix: allPrefix,
                                                ...internalProps,
                                            }}
                                        />
                                    </MLink>
                                </Link>
                            ) : (
                                // <InternalMenuItem {...internalProps} />
                                <InternalMenuItem
                                    {...{
                                        suffix: allSuffix,
                                        prefix: allPrefix,
                                        ...internalProps,
                                    }}
                                />
                            )}

                            {allDivider && i + 1 !== menuList.length && <Divider />}
                        </>
                    ))}
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

const InternalMenuItem = ({
    selected,
    onClick,
    prefix,
    icon,
    label,
    suffix,
    onAvatar,
    divider,
}: Omit<ButtonListType, "link">) => (
    <>
        <ListItemButton sx={{ paddingLeft: "2em" }} selected={selected} onClick={onClick}>
            {prefix}
            <ListItemIcon>{onAvatar ? <Avatar>{icon}</Avatar> : icon}</ListItemIcon>
            <ListItemText secondary={label} />
            {suffix}
        </ListItemButton>
        {divider && <Divider />}
    </>
);
