import GroupWorkIcon from "@mui/icons-material/GroupWork";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { UserListItem, UserListItemProps } from "./UserListItem";
type Group = {
    title: string;
    userList: UserListItemProps[];
    icon?: React.ReactNode;
};

export type UserListProps = {
    title: string;
    groupList: Group[];
    allGroupIcon?: React.ReactNode;
};

export const UserList: React.VFC<UserListProps> = ({
    title,
    allGroupIcon = <GroupWorkIcon />,
    groupList,
}) => {
    return (
        <>
            <Typography variant="h4" component="h2" marginBottom="2em">
                {title}
            </Typography>
            {groupList.map((group) => (
                <Box width="100%" marginBottom="2em">
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
                    <Stack direction="row" flexWrap="wrap" width="90%" marginLeft="2em">
                        {group.userList.map((user) => (
                            <UserListItem {...user} />
                        ))}
                    </Stack>
                </Box>
            ))}
        </>
    );
};
