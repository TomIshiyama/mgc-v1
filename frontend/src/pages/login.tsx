import { Typography } from "@mui/material";
import React from "react";
import { LoginLayout } from "../../layouts/LoginRegisterLayout";

const Login = () => {
    return <Typography variant="h1">Login</Typography>;
};

Login.getLayout = (page: React.ReactNode) => {
    return <LoginLayout>{page}</LoginLayout>;
};
export default Login;
