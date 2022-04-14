import { Typography } from "@mui/material";
import React from "react";
import { UserRegisterLayout } from "../../layouts/LoginRegisterLayout";

const UserRegistration = () => {
    return <Typography variant="h1">UserRegistration</Typography>;
};
UserRegistration.getLayout = (page: React.ReactNode) => {
    return <UserRegisterLayout>{page}</UserRegisterLayout>;
};

export default UserRegistration;
