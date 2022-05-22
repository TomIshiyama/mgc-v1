import React from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import { Head } from "../../../components/common/Head";
import { COLOR } from "../../../utils/styling";

//FIXME: USER画面 実装
const User = () => {
    return (
        <>
            <Head title="" description="" keyword="" />
        </>
    );
};

User.getLayout = (page: React.ReactNode) => {
    return <MainLayout bgcolor={COLOR.normal.userBgcolor}>{page}</MainLayout>;
};

export default User;
