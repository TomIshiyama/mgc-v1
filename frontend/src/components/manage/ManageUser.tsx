/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserListGroupQuery, User } from "../../generated/graphql";
import { pagesPath } from "../../utils/$path";
import { COLOR } from "../../utils/styling";
import { UserList, UserListProps } from "../common/UserList";

export type ManageUserListProps = { key?: React.Key };

export const ManageUserList: React.VFC<ManageUserListProps> = ({ key }) => {
    const router = useRouter();
    const { data, loading } = useGetUserListGroupQuery();

    const groupList: UserListProps["groupList"] = (
        data?.getUserListGroup as User[][]
    )?.map((userList) => ({
        title: userList?.[0]?.division ?? "",
        userList:
            userList?.map((user, i) => ({
                key: user.id,
                title: `${user.givenName} ${user.familyName}`,
                text: user.isAdmin ? "admin" : "member",
            })) ?? [],
    })) ?? [{ title: "", userList: [] }];
    return (
        <Container sx={{ bgcolor: COLOR.normal.userBgcolor }}>
            <UserList
                {...{ title: "ユーザー管理", groupList: groupList, loading: loading }}
                onSelect={(r, param, i) => {
                    void router.push(pagesPath.manage.user._userId(r.key!).$url());
                }}
            />
        </Container>
    );
};
