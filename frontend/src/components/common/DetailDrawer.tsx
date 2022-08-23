import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import RoomIcon from "@mui/icons-material/Room";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import * as MUIProps from "@mui/material";
import { Avatar, AvatarGroup, Box, Button, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Control, Controller, useForm } from "react-hook-form";
import {
    EventKeyMap,
    useDecoderQuery,
    useGetEventAllQuery,
} from "../../generated/graphql";
import { validationRules } from "../../pages/signin";
import { defDateFormat } from "../../utils/definitions";
import { COLOR, DRAWNER } from "../../utils/styling";
import { TemporaryDrawer, TemporaryDrawerProps } from "./TemporaryDrawer";

export type BasicButtonType = {
    label: string;
    type?: MUIProps.ButtonProps["type"];
    onClick?: MUIProps.ButtonProps["onClick"];
    color?: MUIProps.ButtonProps["color"];
    sx?: MUIProps.ButtonProps["sx"];
    variant?: MUIProps.ButtonProps["variant"];
    disabled?: MUIProps.ButtonProps["disabled"];
    options?: Omit<MUIProps.ButtonProps, "onClick" | "color" | "sx" | "variant" | "type">;
};

export const ViewEditMode = {
    view: "view",
    edit: "edit",
} as const;

export type ViewEditType = keyof typeof ViewEditMode;

export type DetailDrawerProps = Omit<TemporaryDrawerProps, "children"> & {
    key?: React.Key;
    viewProps: EventDetailDrawerViewProps;
    max?: MUIProps.AvatarGroupProps["max"];
    avatarList?: {
        alt: MUIProps.AvatarProps["alt"];
        src: MUIProps.AvatarProps["src"];
    }[];
    buttonList?: BasicButtonType[];
    avatarSize?: number; // TODO: 定数化する
    location?: string;
    onClickJoin?: MUIProps.ButtonProps["onClick"]; // ○人参加中ボタン
    viewEditMode?: ViewEditType;
    onSubmit?: (data: FormInputList) => void; // 登録ボタン
};

const commonMap: {
    stack: MUIProps.StackProps;
} = {
    stack: { direction: "row", spacing: 1 },
};

export const DetailDrawer: React.VFC<DetailDrawerProps> = ({
    viewProps,
    max,
    avatarList,
    avatarSize,
    buttonList,
    onClickJoin,
    viewEditMode = ViewEditMode.view,
    onSubmit,
    ...temporaryDrawerProps
}) => {
    const { handleSubmit, control, reset, setValue } = useForm<FormInputList>({
        mode: "onChange",
    });
    const onSubmitCallBack = React.useCallback((data: FormInputList) => {
        onSubmit?.(data);
    }, []);
    React.useEffect(() => {
        reset();
        setValue?.("key", Number(viewProps.key));
    }, [viewProps]);

    return (
        <>
            <TemporaryDrawer {...temporaryDrawerProps}>
                <Box
                    sx={{
                        minHeight: "calc(100vh - 10em)", // FIXME: 動的に対応
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        maxWidth: DRAWNER.maxWidth,
                        minWidth: DRAWNER.minWidth,
                    }}
                    className="event-detail-drawer__wrapper"
                    component="form"
                    onSubmit={handleSubmit(onSubmitCallBack)}
                >
                    {/* center side
                    View Editで切り替える*/}
                    {viewEditMode === ViewEditMode.view ? (
                        <EventDetailDrawerView {...viewProps} />
                    ) : (
                        <EventDetailDrawerEdit
                            {...viewProps}
                            onSubmit={onSubmit}
                            control={control}
                        />
                    )}

                    {/* bottom side */}
                    <Box>
                        <Stack
                            {...commonMap.stack}
                            margin="1em 0"
                            justifyContent="space-between"
                        >
                            <AvatarGroup max={max}>
                                {avatarList?.map((avatar, idx) => (
                                    <Avatar
                                        key={idx}
                                        alt={avatar.alt}
                                        src={avatar.src}
                                        sx={
                                            avatarSize
                                                ? {
                                                      width: avatarSize,
                                                      height: avatarSize,
                                                  }
                                                : {}
                                        }
                                    />
                                ))}
                            </AvatarGroup>
                            <Button color="primary" size="small" onClick={onClickJoin}>
                                {avatarList?.length}人参加中
                            </Button>
                        </Stack>
                        <Stack spacing={2}>
                            {buttonList?.map(({ label, options, ...props }) => (
                                <Button
                                    // Propsをデフォルトと差分更新して渡す
                                    {...{
                                        ...{ size: "large", variant: "contained" },
                                        ...{ ...props, ...options },
                                    }}
                                >
                                    {label}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </TemporaryDrawer>
        </>
    );
};

type EventDetailDrawerViewProps = {
    key?: React.Key;
    title: string;
    subTitle?: string;
    chipLabel: string;
    beginDate?: string | Date;
    endDate?: string | Date;
    beginTime?: string | Date;
    endTime?: string | Date;
    description?: string;
    location?: string;
    category: string;
};

const EventDetailDrawerView: React.FC<EventDetailDrawerViewProps> = ({
    chipLabel,
    title,
    subTitle,
    beginDate,
    endDate,
    beginTime,
    endTime,
    description,
    category,
    location,
}) => {
    const memoDateString = React.useMemo(() => {
        const beginString =
            typeof beginDate === "string"
                ? beginDate
                : moment(beginDate).format(defDateFormat.ymd);
        const endString =
            typeof endDate === "string"
                ? endDate
                : moment(endDate).format(defDateFormat.ymd);

        return beginString === endString
            ? beginString
            : `${beginString ?? ""}  ${endString ? `- ${endString}` : ""}`;
    }, [beginDate, endDate]);

    const memoTimeString = React.useMemo(() => {
        const beginString =
            typeof beginTime === "string"
                ? beginTime
                : moment(beginTime).format(defDateFormat.time24);
        const endString =
            typeof endTime === "string"
                ? endTime
                : moment(endTime).format(defDateFormat.time24);

        return beginString === endString
            ? beginString
            : `${beginString ?? ""}  ${endString ? `- ${endString}` : ""}`;
    }, [beginTime, endTime]);

    return (
        <Box className="event-detail-drawer__view">
            <Box margin=".5em 0 1em 0">
                <Chip
                    size="small"
                    label={chipLabel}
                    sx={{
                        padding: "0 .5em",
                        bgcolor: COLOR[category as keyof typeof COLOR],
                    }}
                />

                <Typography paddingTop=".5em" variant="h5">
                    {title}
                </Typography>
            </Box>
            <Stack spacing={1} marginBottom="2em">
                <Stack {...commonMap.stack}>
                    <RoomIcon />
                    <Typography>{location}</Typography>
                </Stack>
                <Stack {...commonMap.stack}>
                    <WatchLaterOutlinedIcon />
                    <Typography>{memoDateString}</Typography>
                </Stack>
                <Stack {...commonMap.stack}>
                    <DateRangeOutlinedIcon />
                    <Typography>{memoTimeString}</Typography>
                </Stack>
            </Stack>
            {/* center side */}
            <Stack spacing={2}>
                <Typography variant="subtitle1">{subTitle}</Typography>
                <Typography variant="body2" component="div">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description ?? "",
                        }}
                    />
                </Typography>
            </Stack>
        </Box>
    );
};

type FormInputList = {
    key?: number;
    category: string;
    name: string;
    location: string;
    detail: string;
    begin: string; // NOTE: initialValueの都合上 THH:mmの文字列のみ有効
    end: string;
};

type EventDetailDrawerEditProps = EventDetailDrawerViewProps & {
    onSubmit?: (data: FormInputList) => void;
    control?: Control<FormInputList, any>;
};

const EventDetailDrawerEdit: React.FC<EventDetailDrawerEditProps> = ({
    control,
    ...initialValue
}) => {
    const { data: eventData } = useGetEventAllQuery({
        variables: {
            distinct: [EventKeyMap.Location],
        },
    });
    const additionalOptions =
        eventData?.getEventAll
            .filter((v) => v.location != null)
            .map((event) => ({
                label: event.location ?? "",
            })) ?? [];

    const options = [{ label: "zoom" }, { label: "meet" }, ...additionalOptions];
    const { data } = useDecoderQuery();

    return (
        <MUIProps.Container>
            <input value={initialValue.key} disabled></input>
            <Controller
                name="name"
                defaultValue={initialValue.title}
                control={control}
                rules={validationRules.familyKana}
                render={({ field, fieldState }) => (
                    <MUIProps.TextField
                        {...field}
                        type="text"
                        label="イベント名称"
                        autoComplete={field.name}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                        size="small"
                    />
                )}
            />

            <Controller
                name="category"
                defaultValue={initialValue.category}
                control={control}
                rules={validationRules.division}
                render={({ field, fieldState }) => (
                    <MUIProps.ToggleButtonGroup
                        {...field}
                        sx={{
                            "& .css-1gjgmky-MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped":
                                {
                                    borderRadius: ".5em",
                                },
                        }}
                    >
                        {data?.decoder?.category?.map((code, index) => (
                            <MUIProps.ToggleButton
                                key={index}
                                value={code.code}
                                sx={{
                                    width: "6em",
                                    height: "20px",
                                    bgcolor: COLOR[code.code as keyof typeof COLOR],
                                    margin: "0 4px",
                                }}
                                size="small"
                            >
                                {code.name}
                            </MUIProps.ToggleButton>
                        ))}
                    </MUIProps.ToggleButtonGroup>
                )}
            />

            <Controller
                name="location"
                defaultValue={initialValue.location}
                control={control}
                rules={validationRules.location}
                render={({ field, fieldState }) => (
                    <MUIProps.Autocomplete
                        {...field}
                        options={options}
                        value={{ label: field.value }}
                        onChange={(e, data) => field.onChange(data?.label)}
                        defaultValue={options.find((v) => v.label === field.value)}
                        // disablePortal
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <MUIProps.TextField
                                {...params}
                                label="開催場所"
                                size="small"
                            />
                        )}
                    />
                )}
            />
            <Controller
                name="begin"
                // defaultValue={"2022/12/01 12:30"}
                defaultValue={moment(initialValue.beginDate).format(
                    defDateFormat.dateTimeLocal
                )}
                control={control}
                rules={validationRules.givenKana}
                render={({ field, fieldState }) => (
                    <MUIProps.TextField
                        {...field}
                        label="開始日時"
                        type="datetime-local"
                        // defaultValue={}
                        defaultValue={"2022/12/01 12:30"}
                        size="small"
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // TODO: InputProps
                    />
                )}
            />
            <Controller
                name="end"
                defaultValue={moment(initialValue.endDate).format(
                    defDateFormat.dateTimeLocal
                )}
                control={control}
                rules={validationRules.givenKana}
                render={({ field, fieldState }) => (
                    <MUIProps.TextField
                        {...field}
                        label="終了日時"
                        type="datetime-local"
                        defaultValue={"2020/12/01 12:00"}
                        size="small"
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: "900", // 5 min
                        }}
                    />
                )}
            />

            <Controller
                name="detail"
                defaultValue={initialValue.description}
                control={control}
                rules={validationRules.givenName}
                render={({ field, fieldState }) => (
                    <MUIProps.TextField
                        {...field}
                        type="textarea"
                        label="イベント詳細"
                        autoComplete={field.name}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                        size="small"
                        rows={20}
                        multiline
                    />
                )}
            />
        </MUIProps.Container>
    );
};
