import { Typography } from "@mui/material";
import React from "react";
import { SignInLayout } from "../../layouts/SignInLayout";

const SignIn = () => {
    return <Typography variant="h1">Login</Typography>;
};

SignIn.getLayout = (page: React.ReactNode) => {
    return <SignInLayout>{page}</SignInLayout>;
};
export default SignIn;
