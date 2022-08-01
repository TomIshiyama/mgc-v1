import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    // eslint-disable-next-line import/named
    SelectProps,
    Skeleton,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { Control, Controller, useForm, UseFormGetValues } from "react-hook-form";
import {
    GetUserDocument,
    GetUserQuery,
    PositionDef,
    ThemeDef,
    useDecoderQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from "../../generated/graphql";
import { PageMode, PageModeType } from "../../pages/manage/user/[userId]";
import { validationRules } from "../../pages/signin";

export type UserProfileProps = {
    userId: string;
    viewEdit: PageModeType;
    setViewEdit: React.Dispatch<React.SetStateAction<PageModeType>>;
};

type FormInputList = {
    familyName: string;
    givenName: string;
    position?: typeof PositionDef[keyof typeof PositionDef];
    division?: string;
    email?: string;
    password: string;
    passwordVerify: string;
};

export const UserProfile: React.VFC<UserProfileProps> = ({
    userId,
    // setViewEdit,
    // viewEdit,
}) => {
    const { data: session } = useSession();
    const { handleSubmit, setError, control, reset, getValues } = useForm<FormInputList>({
        mode: "onChange",
    });
    // 表示モードと編集モード切り替えの
    const [viewEdit, setViewEdit] = React.useState<PageModeType>(PageMode.view);
    // モーダル開閉のステート
    const [open, setOpen] = React.useState(false);
    // スナックバー表示ステート
    const [openSnack, setOpenSnack] = React.useState(false);

    const { data: userData, loading } = useGetUserQuery({
        variables: {
            id: Number(userId),
        },
    });

    const [updateUser] = useUpdateUserMutation({
        onCompleted: (_) => {
            setOpenSnack(true);
            setViewEdit(PageMode.view);
            return;
        },
        refetchQueries: [GetUserDocument],
    });

    const handleClose = () => {
        setOpenSnack(false);
        return;
    };

    const onClickEdit = React.useCallback(() => {
        setViewEdit(() => PageMode.edit);
        return;
    }, []);

    const onClickRegister = React.useCallback((data: FormInputList) => {
        void (async () => {
            await updateUser({
                variables: {
                    params: {
                        id: Number(userId),
                        givenName: data.givenName,
                        familyName: data.familyName,
                        position: data.position,
                        division: data.division,
                        email: data.email,
                        password: data.password,
                    },
                },
            });
        })();

        reset(
            {},
            {
                keepValues: false,
            }
        );
        setViewEdit(() => PageMode.view);
        return;
    }, []);

    // 削除ボタン押下
    const onClickDelete = React.useCallback(() => {
        setOpen(true);
        return;
    }, []);
    const onClickDeleteConfirm = React.useCallback(() => {
        setOpen(false);
        return;
    }, []);
    // 停止ボタン押下
    const onClickStop = React.useCallback(() => {
        // return;
        return;
    }, []);

    const onChangeTheme: SelectProps["onChange"] = (e) => {
        void (async () => {
            await updateUser({
                variables: {
                    params: {
                        id: Number(userId),
                        theme: e.target.value as ThemeDef,
                    },
                },
            });
        })();
        return;
    };

    if (loading) {
        return <Skeleton animation="wave" height={40} width="30em" />;
    }

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    bgcolor: "white",
                    borderRadius: "2em",
                    width: "90%",
                    padding: "2em",
                    marginTop: "130px",
                    marginRight: 0,
                    marginLeft: "auto",
                    height: "calc(100vh - 250px)",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Avatar
                    sx={{
                        width: "150px",
                        height: "150px",
                        position: "absolute",
                        top: "-100px",
                        left: "-100px",
                    }}
                    src={undefined}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "space-between",
                    }}
                    {...(viewEdit === PageMode.edit
                        ? { component: "form", onSubmit: handleSubmit(onClickRegister) }
                        : {})}
                >
                    <Container>
                        {viewEdit === PageMode.edit ? (
                            <EditComponent
                                user={userData?.getUser}
                                control={control}
                                getValues={getValues}
                            />
                        ) : (
                            <ViewComponent user={userData?.getUser} />
                        )}
                    </Container>

                    <Box style={{ width: "300px" }}>
                        <Stack direction="row" spacing={1}>
                            {viewEdit === PageMode.view ? (
                                <Button
                                    onClick={onClickEdit}
                                    color="primary"
                                    variant="contained"
                                    style={{ width: "6em" }}
                                >
                                    編集
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={{ width: "6em" }}
                                >
                                    保存
                                </Button>
                            )}
                            {/* FIXME: Sessionのかたづけどうする問題 */}
                            {session?.user.admin && (
                                <>
                                    <Button
                                        onClick={onClickStop}
                                        color="warning"
                                        variant="contained"
                                        style={{ width: "6em" }}
                                    >
                                        停止
                                    </Button>
                                    <Button
                                        onClick={onClickDelete}
                                        color="error"
                                        variant="contained"
                                        style={{ width: "6em" }}
                                    >
                                        削除
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Box>
                </Box>

                {/* 共通部分 テーマ */}
                <Container>
                    <Box width="50%">
                        <Typography component={"label"}>テーマ</Typography>

                        <FormControl fullWidth sx={{ mt: 2, mb: 1 }} margin="dense">
                            <InputLabel id="position-select-label">テーマ</InputLabel>
                            <Select
                                id="position-select-label"
                                onChange={onChangeTheme}
                                defaultValue={userData?.getUser.theme}
                            >
                                <MenuItem
                                    selected={userData?.getUser.theme === ThemeDef.Normal}
                                    value={ThemeDef.Normal}
                                >
                                    ノーマル
                                </MenuItem>
                                <MenuItem
                                    selected={userData?.getUser.theme === ThemeDef.Dark}
                                    value={ThemeDef.Dark}
                                >
                                    ダーク
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Container>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    警告：本当に削除しますがよろしいですか？
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        データを削除しますとデータが完全に削除されます。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>いいえ</Button>
                    <Button onClick={onClickDeleteConfirm} autoFocus>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={() => setOpenSnack(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    登録が完了しました。
                </Alert>
            </Snackbar>
        </>
    );
};

const ViewComponent: React.FC<{ user?: GetUserQuery["getUser"] }> = ({ user }) => {
    return (
        <Box>
            <Stack flexDirection="row" alignItems="end">
                <Typography variant="h3">
                    {`${user?.familyName ?? ""} ${user?.givenName ?? ""}`}
                </Typography>
                <Typography variant="caption" color="dimgray">
                    {user?.email}
                </Typography>
            </Stack>
            <Stack flexDirection="row" alignItems="end" spacing={1}>
                <Typography variant="h5" color="dimgray" style={{ marginRight: "1em" }}>
                    {user?.division}
                </Typography>
                <Typography variant="h5" color="dimgray">
                    {user?.position}
                </Typography>
            </Stack>
        </Box>
    );
};

const EditComponent: React.FC<{
    user?: GetUserQuery["getUser"];
    control: Control<FormInputList, any>;
    getValues: UseFormGetValues<FormInputList>;
    // decoder?: DecoderQuery["decoder"] | undefined;
}> = ({ user, control, getValues }) => {
    const { data: decoder } = useDecoderQuery();

    if (!user) return <Skeleton animation="wave" height={40} width="30em" />;

    return (
        <>
            <Controller
                name="familyName"
                control={control}
                rules={validationRules.familyName}
                defaultValue={user?.familyName ?? ""}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="姓"
                        autoComplete={field.name}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                    />
                )}
            />
            <Controller
                name="givenName"
                control={control}
                rules={validationRules.givenName}
                defaultValue={user?.givenName}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="名"
                        autoComplete={field.name}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                    />
                )}
            />
            <Controller
                name="position"
                control={control}
                rules={validationRules.position}
                defaultValue={user?.position as FormInputList["position"]}
                render={({ field, fieldState }) => (
                    <FormControl
                        fullWidth
                        sx={{ mt: 2, mb: 1 }}
                        error={fieldState.invalid}
                        margin="dense"
                    >
                        <InputLabel id="position-select-label">ポジション</InputLabel>
                        <Select {...field} label="ポジション">
                            <MenuItem value={PositionDef.Division}>
                                {PositionDef.Division}
                            </MenuItem>
                            <MenuItem value={PositionDef.Unit}>
                                {PositionDef.Unit}
                            </MenuItem>
                            <MenuItem value={PositionDef.Gd}>{PositionDef.Gd}</MenuItem>
                            <MenuItem value={PositionDef.Member}>
                                {PositionDef.Member}
                            </MenuItem>
                        </Select>
                        <FormHelperText>{fieldState.error?.message}</FormHelperText>
                    </FormControl>
                )}
            />

            <Controller
                name="division"
                control={control}
                rules={validationRules.division}
                defaultValue={user?.division as ThemeDef}
                render={({ field, fieldState }) => (
                    <FormControl
                        fullWidth
                        sx={{ mt: 2, mb: 1 }}
                        error={fieldState.invalid}
                        margin="dense"
                    >
                        <InputLabel id="division-select-label">ディビジョン</InputLabel>
                        <Select {...field} label="ディビジョン">
                            {decoder?.decoder?.divisionCode?.map((code, index) => (
                                <MenuItem key={index} value={code.code}>
                                    {code.code}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{fieldState.error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
            <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                defaultValue={user?.email}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="E-mail"
                        autoComplete={field.name}
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                // rules={{ minLength: validationRules.password?.minLength }}
                defaultValue={undefined}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="新しいパスワード"
                        type="password"
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                    />
                )}
            />
            <Controller
                name="passwordVerify"
                control={control}
                defaultValue={undefined}
                rules={{
                    validate: (value) => {
                        const currentValues = getValues();
                        if (!currentValues.password) null;
                        return (
                            value === currentValues.password ||
                            "パスワードが間違っています。入力し直してください。"
                        );
                    },
                }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="新しいパスワードの再入力"
                        type="password"
                        fullWidth
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        margin="dense"
                    />
                )}
            />
        </>
    );
};
