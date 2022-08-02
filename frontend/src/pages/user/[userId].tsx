import { useRouter } from "next/router";
import { MainLayout } from "../../../layouts/MainLayout";
import { Head } from "../../components/common/Head";
import { UserProfile } from "../../components/manage/UserProfile";
import { useRedirectOwner } from "../../hooks/common/useRedirectOwner";
import { COLOR } from "../../utils/styling";

export const PageMode = {
    view: "view",
    edit: "edit",
} as const;
export type PageModeType = typeof PageMode[keyof typeof PageMode];

const User = () => {
    const router = useRouter();
    const { userId } = router.query as { [key: string]: string };
    useRedirectOwner();
    return (
        <>
            <Head
                title="ユーザー詳細画面"
                description="ユーザー詳細画面"
                keyword="ユーザー詳細画面"
            />
            <UserProfile userId={userId} />
        </>
    );
};

User.getLayout = (page: React.ReactNode) => {
    return <MainLayout bgcolor={COLOR.normal.userBgcolor}>{page}</MainLayout>;
};

export default User;
