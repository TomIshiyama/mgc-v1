import React from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import { Head } from "../../../components/common/Head";
import { ManageUserList } from "../../../components/manage/ManageUser";
import { useRedirectAdmin } from "../../../hooks/common/useRedirectAdmin";

const List = () => {
    useRedirectAdmin();
    return (
        <>
            <Head
                title="ユーザー管理"
                description="ユーザー管理画面"
                keyword="ユーザー管理 admin"
            />
            <ManageUserList />
        </>
    );
};

List.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default List;
