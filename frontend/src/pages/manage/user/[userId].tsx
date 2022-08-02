import { useRouter } from "next/router";
import React from "react";
import { MainLayout } from "../../../../layouts/MainLayout";
import { Head } from "../../../components/common/Head";
import { UserProfile } from "../../../components/manage/UserProfile";
import { useRedirectAdmin } from "../../../hooks/common/useRedirectAdmin";
import { COLOR } from "../../../utils/styling";

export const PageMode = {
    view: "view",
    edit: "edit",
} as const;
export type PageModeType = typeof PageMode[keyof typeof PageMode];
//FIXME: USER画面 実装
const User = () => {
    const router = useRouter();
    const { userId } = router.query as { [key: string]: string };
    useRedirectAdmin();
    return (
        <>
            <Head title="" description="" keyword="" />
            <UserProfile userId={userId} />
        </>
    );
};

User.getLayout = (page: React.ReactNode) => {
    return <MainLayout bgcolor={COLOR.normal.userBgcolor}>{page}</MainLayout>;
};

export default User;
