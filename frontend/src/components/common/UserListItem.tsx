import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Avatar,
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import * as AvatarProps from "@mui/material/Avatar";
import * as ListItemButton_1 from "@mui/material/ListItemButton/ListItemButton";
import React from "react";
import { COLOR } from "../../utils/styling";

export type UserListItemProps = {
    key?: React.Key;
    itemTitle: string;
    itemText: string;
    // noStyle?: boolean;
    selected?: ListItemButton_1.ListItemButtonProps["selected"];
    onClick?: ListItemButton_1.ListItemButtonProps["onClick"];
    style?: ListItemButton_1.ListItemButtonProps["sx"];
    src?: AvatarProps.AvatarProps["src"];
    alt?: AvatarProps.AvatarProps["alt"];
};

export const UserListItem: React.VFC<UserListItemProps> = ({
    itemTitle,
    itemText,
    // noStyle,
    selected,
    onClick,
    style,
    src,
    alt,
}) => {
    return (
        <>
            <Box>
                <ListItemButton
                    // CSSプロパティは差分更新する
                    sx={{
                        ...{
                            borderRadius: "1em",
                            backgroundColor: COLOR.normal.bgcolor,
                            minWidth: "300px",
                            margin: "1px",
                        },
                        ...style,
                    }}
                    selected={selected}
                    onClick={onClick}
                    color="primary"
                >
                    <ListItemIcon>
                        <Avatar alt={alt} src={src} />
                    </ListItemIcon>
                    <ListItemText>
                        <Box>
                            <Typography variant="subtitle1">{itemTitle}</Typography>
                            <Typography variant="caption">{itemText}</Typography>
                        </Box>
                    </ListItemText>

                    <ArrowForwardIosIcon />
                </ListItemButton>
            </Box>
        </>
    );
};
