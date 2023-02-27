import * as MUI from "@mui/material";
import { Alert } from "@mui/material";
import React from "react";

export const useSnackbar = (message?: React.ReactNode) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const Snackbar = ({
        message,
        severity = "success",
        ...props
    }: MUI.SnackbarProps & {
        message: React.ReactNode;
        severity: MUI.AlertProps["severity"];
    }) => {
        // const { message, severity = "success", ..._props } = props;
        return (
            <Snackbar
                message={undefined}
                severity={undefined}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                {...props}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        );
    };

    return {
        Snackbar,
        handleOpen,
        handleClose,
    };
};
