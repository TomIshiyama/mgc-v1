import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import * as MUI from "@mui/material";
import { Avatar, Box, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { Record, UserListItem, UserListItemProps } from "./UserListItem";
type Group = {
    title: string;
    userList: UserListItemProps[];
    icon?: React.ReactNode;
};

export type UserListProps = {
    title: string;
    groupList: Group[];
    allGroupIcon?: React.ReactNode;
    onSelect?: (record: Record, param: Record[][], index: number) => void;
};

export const UserList: React.VFC<UserListProps> = ({
    title,
    allGroupIcon = <GroupWorkIcon />,
    groupList,
    onSelect,
}) => {
    const userParam: Record[][] = React.useMemo(
        () =>
            groupList.map((group) =>
                group.userList.flatMap((user) => ({
                    key: user.key,
                    title: user.title,
                    text: user.text,
                }))
            ),
        [groupList]
    );

    return (
        <>
            <Typography variant="h4" component="h2" marginBottom="2em">
                {title}
            </Typography>
            {groupList.map((group) => (
                <Box width="100%" marginBottom="2em">
                    <Accordion>
                        <AccordionSummary>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar
                                    sx={{
                                        bgcolor: (theme) => theme.palette.primary.main,
                                        width: "52px",
                                        height: "52px",
                                    }}
                                >
                                    {group.icon ?? allGroupIcon}
                                </Avatar>
                                <Typography variant="h6">{group.title}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                width="90%"
                                marginLeft="2em"
                            >
                                {group.userList.map((user, index) => (
                                    <UserListItem
                                        {...user}
                                        rowKey={user.key}
                                        onSelect={(r, k) => {
                                            onSelect?.(r, userParam, index);
                                        }}
                                    />
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </>
    );
};

const Accordion = styled((props: MUI.AccordionProps) => (
    <MUI.Accordion disableGutters elevation={0} defaultExpanded={true} {...props} />
))(({ theme }) => ({
    border: "none",
    background: "transparent",
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props: MUI.AccordionSummaryProps) => (
    <MUI.AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    // display: "block",
    background: "transparent",
    padding: "0",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
        display: "block",
    },
}));

const AccordionDetails = styled(MUI.AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
