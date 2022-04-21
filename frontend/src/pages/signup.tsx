import { Typography } from "@mui/material";
import React from "react";
import { SignUpLayout } from "../../layouts/SignUpLayout";

const SignUp = () => {
    return <Typography variant="h1">UserRegistration</Typography>;
};
SignUp.getLayout = (page: React.ReactNode) => {
    return <SignUpLayout>{page}</SignUpLayout>;
};

export default SignUp;
