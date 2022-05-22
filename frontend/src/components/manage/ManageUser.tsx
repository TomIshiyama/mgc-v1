import { Container } from "@mui/material";
import React from "react";
import { COLOR } from "../../utils/styling";
import { UserList, UserListProps } from "../common/UserList";

export type ManageUserListProps = { key?: React.Key };

// FIXME: 疎通
const groupListMock: UserListProps["groupList"] = [...Array<number>(5)].map((v, i) => ({
    title: `Group ${i + 1}`,
    userList: [...Array<number>(10)].map((v, i) => ({
        key: `${i}`,
        title: `田中 ${i + 1}郎`,
        text: i === 0 ? "admin" : "member",
    })),
}));

export const ManageUserList: React.VFC<ManageUserListProps> = ({ key }) => {
    return (
        <Container sx={{ bgcolor: COLOR.normal.userBgcolor }}>
            <UserList
                {...{ title: "ユーザー管理", groupList: groupListMock }}
                onSelect={(r, param, i) => {
                    console.log(r, param, i);
                }}
            />
        </Container>
    );
};
