import { Typography } from "@mui/material";
import { MainLayout } from "../../layouts/MainLayout";
import { Head } from "../components/common/Head";

const Top = () => {
    return (
        <>
            <Head
                title="TOP画面"
                description="TOP画面 "
                keyword="カレンダー トップ画面"
            />
            <Typography variant="h2">ああああああ</Typography>
        </>
    );
};

Top.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default Top;
