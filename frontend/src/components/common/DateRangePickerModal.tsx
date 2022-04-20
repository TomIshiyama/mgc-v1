import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React from "react";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // react-date-range main css file
import "react-date-range/dist/theme/default.css"; // react-date-range theme css file
import { useForm } from "react-hook-form";

export type DateRangePickerModalProps = {
    onClose?: DateRangePickerProps["onClose"];
    onAccept?: DateRangePickerProps["onAccept"];
    title?: string;
    contentText?: React.ReactNode;
    onSubmit?: BoxProps["onSubmit"];
    onCancel?: VoidFunction;
    onCancelLabel?: string;
    onSubmitLabel?: string;
};

type FormValues = {
    from: Date;
    to: Date;
    term: DateRangePickerProps["value"];
};

export const DateRangePickerModal: React.VFC<DateRangePickerModalProps> = ({
    onClose,
    onAccept,
    title,
    contentText,
    onSubmit,
    onCancel,
    onCancelLabel = "取消",
    onSubmitLabel = "仮登録",
}) => {
    const { handleSubmit, control } = useForm<FormValues>();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        // テキストフィールドを初期化する
        onCancel?.();
    };

    const handleOnSubmit = () => {
        setOpen(false);
    };

    const [state, setState] = React.useState({
        selection: {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
        // TODO: Date Range Pickerで2つカレンダーを表記する場合に使う
        // compare: {
        //     startDate: new Date(),
        //     endDate: addDays(new Date(), 3),
        //     key: "compare",
        // },
    });

    console.log(state);

    return (
        <>
            <Button color="primary" variant="outlined" onClick={handleClickOpen}>
                Button
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    {contentText && <DialogContentText>{contentText}</DialogContentText>}

                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        width="100%"
                        display="flex"
                        flexDirection="column"
                    >
                        <TextField
                            id="name"
                            name="eventTitle"
                            autoFocus
                            margin="normal"
                            label="イベント名称"
                            // fullWidth
                            variant="outlined"
                            size="small"
                        />

                        <DateRange
                            locale={locales["ja"]} // 日本語表記
                            onChange={(item) => setState({ ...state, ...item })}
                            ranges={[state.selection]}
                            editableDateInputs
                            showSelectionPreview={false}
                            moveRangeOnFirstSelection={false}
                            showMonthArrow={false}
                            showPreview={false}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>{onCancelLabel}</Button>
                    <Button onClick={handleOnSubmit}>{onSubmitLabel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
