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

export type Record = {
    key?: React.Key;
    title: string;
    text: string;
};

export type UserListItemProps = {
    key?: React.Key;
    rowKey?: React.Key;
    title: string;
    text: string;
    // noStyle?: boolean;
    selected?: ListItemButton_1.ListItemButtonProps["selected"];
    onClick?: ListItemButton_1.ListItemButtonProps["onClick"];
    onSelect?: (record: Record, key?: React.Key) => void;
    style?: ListItemButton_1.ListItemButtonProps["sx"];
    src?: AvatarProps.AvatarProps["src"];
    alt?: AvatarProps.AvatarProps["alt"];
};

export const UserListItem: React.VFC<UserListItemProps> = ({
    key,
    rowKey,
    title,
    text,
    // noStyle,
    selected,
    onClick,
    style,
    src,
    alt,
    onSelect,
}) => {
    const onClickHandler: ListItemButton_1.ListItemButtonProps["onClick"] = (e) => {
        onClick?.(e);
        onSelect?.({ title, text, key: rowKey }, key);
    };
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
                    onClick={onClickHandler}
                    color="primary"
                >
                    <ListItemIcon>
                        <Avatar alt={alt} src={src} />
                    </ListItemIcon>
                    <ListItemText>
                        <Box>
                            <Typography variant="subtitle1">{title}</Typography>
                            <Typography variant="caption">{text}</Typography>
                        </Box>
                    </ListItemText>

                    <ArrowForwardIosIcon />
                </ListItemButton>
            </Box>
        </>
    );
};
