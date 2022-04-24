/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React from "react";
import { CalendarProps, DateRange, RangeKeyDict } from "react-date-range";
// FIXME: localeのimport エラーどうするか問題
import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // react-date-range main css file
import "react-date-range/dist/theme/default.css"; // react-date-range theme css file
import { Controller, useForm } from "react-hook-form";
import { defDateFormat } from "../../utils/definitions";

export type DateRangePickerModalProps = {
    buttonLabel: string;
    title?: string;
    contentText?: React.ReactNode;
    onSubmit?: (values: FormValues) => void;
    onCancel?: VoidFunction;
    onSelect?: (val: StateType) => void;
    onCancelLabel?: string;
    onSubmitLabel?: string;
    dateFormat?: string;
};

type FormValues = {
    eventTitle: string;
    startDate?: Date | null;
    endDate?: Date | null;
    // term: DateRangePickerProps["value"];
};

type StateType = {
    selection: {
        startDate?: Date | null;
        endDate?: Date | null;
        key: string;
    };
};

const defaultValues = {
    startDate: null,
    endDate: null,
};
export const DateRangePickerModal: React.VFC<DateRangePickerModalProps> = ({
    // onClose,
    // onAccept,
    title,
    buttonLabel,
    contentText,
    onSubmit,
    onCancel,
    onSelect,
    onCancelLabel = "取消",
    onSubmitLabel = "仮登録",
    dateFormat = defDateFormat.ymd,
}) => {
    const { handleSubmit, control, getValues, setValue, reset, trigger, register } =
        useForm<FormValues>({
            defaultValues: defaultValues,
        });

    register("startDate", { required: true });
    register("endDate", { validate: {} });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setState({
            selection: {
                ...defaultValues,
                key: "selection",
            },
        });
    };

    const handleCancel = () => {
        setOpen(false);
        // テキストフィールドを初期化する
        reset();
        setState({
            selection: {
                ...defaultValues,
                key: "selection",
            },
        });
        onCancel?.();
    };

    const handleOnSubmit = async () => {
        setOpen(false);
        // FIXME: バリデーション実装
        const triggered = await trigger(["eventTitle", "startDate", "endDate"]);
        onSubmit?.(getValues());
        reset();
        setState({
            selection: {
                ...defaultValues,
                key: "selection",
            },
        });
    };

    const [state, setState] = React.useState<StateType>({
        selection: {
            ...defaultValues,
            key: "selection",
        },
        // TODO: Date Range Pickerで2つカレンダーを表記する場合に使う
        // compare: {
        //     startDate: new Date(),
        //     endDate: addDays(new Date(), 3),
        //     key: "compare",
        // },
    });

    // HACK: 型
    const onChangeDateRange = (item: RangeKeyDict) => {
        // FIXME: 入力日付の大小を比較する
        setState({ ...state, ...item });
        setValue("startDate", item.selection.startDate);
        setValue("endDate", item.selection.endDate);
        onSelect?.(state);
    };

    return (
        <>
            <Button color="primary" variant="contained" onClick={handleClickOpen}>
                {buttonLabel}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    {contentText && <DialogContentText>{contentText}</DialogContentText>}

                    <Box
                        component="form"
                        onSubmit={handleOnSubmit}
                        width="100%"
                        display="flex"
                        flexDirection="column"
                    >
                        <Controller
                            control={control}
                            name="eventTitle"
                            rules={{ required: "入力必須です" }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => (
                                <TextField
                                    id={"dateRange-controller-text-field"}
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    autoFocus
                                    margin="normal"
                                    label="イベント名称"
                                    variant="outlined"
                                    size="small"
                                    error={Boolean(error)}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <DateRange
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            locale={locales["ja"]} // 日本語表記
                            onChange={onChangeDateRange}
                            ranges={
                                [state.selection] as unknown as CalendarProps["ranges"]
                            }
                            editableDateInputs
                            moveRangeOnFirstSelection={false}
                            showMonthArrow={false}
                            showPreview={false}
                            dateDisplayFormat={"yyyy/MM/dd"} // 日付表示のフォーマット
                            monthDisplayFormat={"yyyy年MMM"} // 月表示のフォーマット
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCancel}>
                        {onCancelLabel}
                    </Button>
                    <Button variant="contained" type="submit" onClick={handleOnSubmit}>
                        {onSubmitLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
