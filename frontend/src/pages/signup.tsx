import {
    Alert,
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SignUpLayout } from "../../layouts/SignUpLayout";
import {
    CreateUserMutationVariables,
    PositionDef,
    ThemeDef,
    useCreateUserMutation,
    useDecoderQuery,
} from "../generated/graphql";
import { pagesPath } from "../utils/$path";
import { validationRules } from "./signin";

type FormInputList = {
    familyName: string;
    givenName: string;
    familyKana: string;
    givenKana: string;
    position: typeof PositionDef[keyof typeof PositionDef];
    email: string;
    password: string;
    division: string;
};

const SignUp = () => {
    const router = useRouter();

    const { data } = useDecoderQuery();

    const [isError, setIsError] = React.useState<Error | null>(null);
    const { handleSubmit, setError, control } = useForm<FormInputList>({
        mode: "onChange",
    });

    const [createUser] = useCreateUserMutation();

    //サインアップのPOST処理
    const signUpUser = async (data: FormInputList) => {
        try {
            const params: CreateUserMutationVariables["params"] = {
                ...data,
                isAdmin: false,
                isStop: false,
                theme: ThemeDef.Normal,
            };

            const { data: signupRes } = await createUser({
                variables: {
                    params,
                },
                onError: (error) => {
                    setIsError(error);
                },
            });

            if (!signupRes) {
                throw new Error("すでに使用されているメールアドレスです。");
            }

            // ユーザー新規登録の情報でログイン処理
            const res = await signIn<any>("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            // TODO: ログイン成功時に表示するSnackbar
            if (res?.error) {
                throw new Error(`Unauthorized : ${res?.error}`);
            }
            setIsError(null);
            // ログイン後はトップページへ
            void router.push(pagesPath.top.$url().pathname);
        } catch (e) {
            setIsError(e);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form"
                    onSubmit={handleSubmit(signUpUser)}
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography component="h1" variant="h5">
                        ユーザー新規登録
                    </Typography>

                    <Controller
                        name="familyName"
                        control={control}
                        rules={validationRules.familyName}
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
                        name="givenKana"
                        control={control}
                        rules={validationRules.givenKana}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="姓（カナ）"
                                autoComplete={field.name}
                                fullWidth
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                margin="dense"
                            />
                        )}
                    />

                    <Controller
                        name="familyKana"
                        control={control}
                        rules={validationRules.familyKana}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="名（カナ）"
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
                        render={({ field, fieldState }) => (
                            <FormControl
                                fullWidth
                                sx={{ mt: 2, mb: 1 }}
                                error={fieldState.invalid}
                                margin="dense"
                            >
                                <InputLabel id="position-select-label">
                                    ポジション
                                </InputLabel>
                                <Select {...field} label="ポジション">
                                    <MenuItem value={PositionDef.Division}>
                                        {PositionDef.Division}
                                    </MenuItem>
                                    <MenuItem value={PositionDef.Unit}>
                                        {PositionDef.Unit}
                                    </MenuItem>
                                    <MenuItem value={PositionDef.Gd}>
                                        {PositionDef.Gd}
                                    </MenuItem>
                                    <MenuItem value={PositionDef.Member}>
                                        {PositionDef.Member}
                                    </MenuItem>
                                </Select>
                                <FormHelperText>
                                    {fieldState.error?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="division"
                        control={control}
                        rules={validationRules.division}
                        render={({ field, fieldState }) => (
                            <FormControl
                                fullWidth
                                sx={{ mt: 2, mb: 1 }}
                                error={fieldState.invalid}
                                margin="dense"
                            >
                                <InputLabel id="division-select-label">
                                    ディビジョン
                                </InputLabel>
                                <Select {...field} label="ディビジョン">
                                    {data?.decoder?.divisionCode?.map((code, index) => (
                                        <MenuItem key={index} value={code.code}>
                                            {code.code}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {fieldState.error?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        rules={validationRules.email}
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
                        rules={validationRules.password}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="パスワード"
                                type="password"
                                fullWidth
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                margin="dense"
                            />
                        )}
                    />
                    {isError && (
                        <Alert
                            variant="standard"
                            severity="error"
                            onClose={() => setIsError(null)}
                        >
                            認証に失敗しました。 <br />
                            {isError.message}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        登録
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {"←ログインへ戻る"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};
SignUp.getLayout = (page: React.ReactNode) => {
    return <SignUpLayout>{page}</SignUpLayout>;
};

export default SignUp;
