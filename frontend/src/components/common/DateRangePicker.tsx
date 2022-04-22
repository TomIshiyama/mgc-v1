import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Menu,
    TextField,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { CalendarProps, DateRange, DateRangeProps } from "react-date-range";
import "react-date-range/dist/styles.css"; // react-date-range main css file
import "react-date-range/dist/theme/default.css"; // react-date-range theme css file
import { defDateFormat } from "../../utils/definitions";

const SHOW_MODE = {
    dialog: "dialog",
    menu: "menu",
} as const;

export type DateRangePickerProps = {
    mode: keyof typeof SHOW_MODE;
    dateFormat?: string;
    title?: string;
};

type StateType = {
    selection: {
        startDate?: Date | null;
        endDate?: Date | null;
        key: string;
    } | null;
};

export const DateRangePicker: React.VFC<DateRangePickerProps> = ({
    mode,
    title,
    dateFormat = defDateFormat.ymd,
}) => {
    const [open, setOpen] = React.useState(false);
    // メニュー用ステート
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleClickOpen = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleCancel = () => {
        setOpen(false);
        setAnchorEl(null);
        // テキストフィールドを初期化する
        // document?.getElementById("date-range-text-field")?.value = "";

        setState({
            selection: {
                startDate: moment().toDate(),
                endDate: null,
                key: "selection",
            },
        });
        setTextFieldState(null);
    };

    const handleOnChange: DateRangeProps["onChange"] = (item) => {
        setState({ ...state, ...item });
        setTextFieldState(moment(state.selection?.startDate).format(dateFormat));
    };

    const handleSubmit = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const [state, setState] = React.useState<StateType>({
        selection: {
            startDate: moment().toDate(),
            endDate: null,
            key: "selection",
        },
        // TODO: 2つ以上のカレンダー表示
        // compare: {
        //     startDate: new Date(),
        //     endDate: addDays(new Date(), 3),
        //     key: "compare",
        // },
    });

    const [textFieldState, setTextFieldState] = React.useState<string | null>(null);

    return (
        <>
            <TextField
                id="date-range-text-field"
                placeholder="YYYY/MM/DD"
                color="primary"
                // onClick={handleClickOpen}
                onChange={(e) => setTextFieldState(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {/* <ExpandMore /> */}
                            <IconButton
                                edge="end"
                                aria-label="Toggle password visibility"
                                onClick={handleClickOpen}
                            >
                                <AccessTimeIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={textFieldState}
            />

            {mode === SHOW_MODE.menu ? (
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            // maxHeight: ITEM_HEIGHT * 4.5,
                            // width: "20ch",
                        },
                    }}
                >
                    {/* HACK:コンポーネントを共通化してやるとなぜかクリックで選択範囲できないバグ */}

                    <DateRange
                        onChange={handleOnChange}
                        ranges={[state.selection] as unknown as CalendarProps["ranges"]}
                        showMonthArrow={false}
                        showPreview={false}
                        editableDateInputs
                        dateDisplayFormat={"yyyy/MM/dd"} // 日付表示のフォーマット
                        monthDisplayFormat={"yyyy年MMM"} // 月表示のフォーマット
                    />
                </Menu>
            ) : mode === SHOW_MODE.dialog ? (
                <Dialog open={open} onClose={handleClose}>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    <DialogContent>
                        <DateRange
                            onChange={handleOnChange}
                            ranges={
                                [state.selection] as unknown as CalendarProps["ranges"]
                            }
                            showMonthArrow={false}
                            showPreview={false}
                            editableDateInputs
                            dateDisplayFormat={"yyyy/MM/dd"} // 日付表示のフォーマット
                            monthDisplayFormat={"yyyy年MMM"} // 月表示のフォーマット
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleSubmit}>OK</Button>
                    </DialogActions>
                </Dialog>
            ) : null}
        </>
    );
};
