/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Container } from "@mui/material";
import React from "react";
import { useGetUserListGroupQuery, User } from "../../generated/graphql";
import { COLOR } from "../../utils/styling";
import { UserList, UserListProps } from "../common/UserList";

export type ManageUserListProps = { key?: React.Key };

export const ManageUserList: React.VFC<ManageUserListProps> = ({ key }) => {
    const { data, loading } = useGetUserListGroupQuery();

    const groupList: UserListProps["groupList"] = (
        data?.getUserListGroup as User[][]
    )?.map((userList) => ({
        title: userList?.[0]?.division ?? "",
        userList:
            userList?.map((user, i) => ({
                key: String(i),
                title: `${user.givenName} ${user.familyName}`,
                text: user.isAdmin ? "admin" : "member",
            })) ?? [],
    })) ?? [{ title: "", userList: [] }];

    return (
        <Container sx={{ bgcolor: COLOR.normal.userBgcolor }}>
            <UserList
                {...{ title: "ユーザー管理", groupList: groupList, loading: true }}
                onSelect={(r, param, i) => {
                    console.log(r, param, i);
                }}
            />
        </Container>
    );
};
