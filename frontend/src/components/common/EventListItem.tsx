import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import {
    Box,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import * as ListItemButton_1 from "@mui/material/ListItemButton/ListItemButton";
import React from "react";
import { eventCategory, EventCategoryType } from "../../utils/displayData";
import { COLOR } from "../../utils/styling";
export type EventListItemProps = {
    key?: React.Key;
    itemTitle: string;
    itemText: string;
    category: EventCategoryType;
    chipLabel?: string | null;
    noStyle?: boolean | null;
    selected?: ListItemButton_1.ListItemButtonProps["selected"];
    onClick?: ListItemButton_1.ListItemButtonProps["onClick"];
    style?: ListItemButton_1.ListItemButtonProps["sx"];
};

/**
 *
 * デフォルトだとwidth:100%。
 * Listやdiv,Containerなどのラッパーにより横幅の指定が必要
 */
export const EventListItem: React.VFC<EventListItemProps> = ({
    itemTitle,
    itemText,
    category,
    chipLabel,
    noStyle,
    selected,
    onClick,
    style,
}) => {
    return (
        <>
            <ListItemButton
                // CSSプロパティは差分更新する
                sx={{
                    ...{ borderRadius: "1em", backgroundColor: COLOR.normal.bgcolor },
                    ...style,
                }}
                selected={selected}
                onClick={onClick}
                color="primary"
            >
                <ListItemIcon
                    sx={{
                        // MEMO: スタイル関数だとうまく動作する謎、ハマったので記事にする
                        // " .MuiListItemIcon-root": {
                        //     minWidth: "0.5em",
                        // },
                        minWidth: (theme) => theme.spacing(4),
                    }}
                >
                    <CircleIcon
                        sx={{
                            width: ".5em",
                            height: ".5em",
                            color: COLOR[category],
                        }}
                    />
                </ListItemIcon>
                <ListItemText>
                    <Box>
                        <Typography variant="subtitle1">{itemTitle}</Typography>
                        <Typography variant="caption">{itemText}</Typography>
                    </Box>
                </ListItemText>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                        size="small"
                        label={chipLabel ?? eventCategory[category]}
                        sx={{
                            padding: "0 .5em",
                            bgcolor: COLOR[category],
                        }}
                    />
                    <ArrowForwardIosIcon />
                </Stack>
            </ListItemButton>
        </>
    );
};
