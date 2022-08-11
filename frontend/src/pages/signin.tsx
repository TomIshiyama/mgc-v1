import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link as MLink,
    TextField,
    Typography,
} from "@mui/material";
import { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Controller, ControllerProps, useForm } from "react-hook-form";
import { SignInLayout } from "../../layouts/SignInLayout";
import { pagesPath } from "../utils/$path";
import { REGEX } from "../utils/regex";

type FormInputList = {
    email: string;
    password: string;
};

const message = {
    required: "入力必須です。",
};

// 3. 検証ルール。
export const validationRules: {
    [key: string]: ControllerProps["rules"];
} = {
    email: {
        required: message.required,
        pattern: {
            value: REGEX.email,
            message: "正しいフォーマットで入力してください。",
        },
    },
    password: {
        required: message.required,
        minLength: { value: 4, message: "4文字以上で入力してください。" },
    },
    familyName: {
        required: message.required,
        maxLength: { value: 30, message: "30文字以下で入力してください。" },
    },
    givenName: {
        required: message.required,
        maxLength: { value: 30, message: "30文字以下で入力してください。" },
    },
    familyKana: {
        maxLength: { value: 60, message: "60文字以下で入力してください。" },
    },
    givenKana: {
        maxLength: { value: 60, message: "60文字以下で入力してください。" },
    },
    position: { required: message.required },
    division: {
        required: message.required,
    },
    eventName: {
        required: message.required,
    },
    category: {
        required: message.required,
    },
};

// POSTリクエスト（サインイン・サインアウトなど）に必要なCSRFトークンを返却する
export const getServerSideProps = async (ctx: CtxOrReq | undefined) => {
    return {
        props: {
            title: "login",
            csrfToken: await getCsrfToken(ctx),
        },
    };
};

const SignIn = ({ csrfToken }: { csrfToken: string | undefined }) => {
    const router = useRouter();

    const [isError, setIsError] = React.useState(false);
    const { handleSubmit, setError, control } = useForm<FormInputList>({
        mode: "onChange",
    });

    const signInUser = async (data: FormInputList) => {
        // TODO: any撲滅
        try {
            const res = await signIn<any>("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                // callbackUrl: `${window.location.origin}`,
                // callbackUrl: referer ?? void pagesPath.top.$url(),
            });
            // ログイン後に飛ぶページ
            // TODO: ログイン成功時に表示するSnackbar
            if (res?.error) {
                throw new Error(`Unauthorized : ${res?.error}`);
            }
            setIsError(false);
            void router.push(pagesPath.top.$url().pathname);
        } catch (e) {
            setIsError(true);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form"
                    onSubmit={handleSubmit(signInUser)}
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
                        サインイン
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 8 }}></Box>
                    <Controller
                        name="email"
                        control={control}
                        rules={validationRules.name}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type="text"
                                label="E-mail"
                                autoComplete={field.name}
                                fullWidth
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
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
                                margin="normal"
                                label="パスワード"
                                type="password"
                                fullWidth
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    {isError && (
                        <Alert
                            variant="standard"
                            severity="error"
                            onClose={() => setIsError(false)}
                        >
                            認証に失敗しました。 <br />
                            email,passwordを正しく入力してください。
                        </Alert>
                    )}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="ログイン情報保存"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        サインイン
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#">
                                <MLink component="button" underline="hover">
                                    パスワード失望
                                </MLink>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup">
                                <MLink component="button" underline="hover">
                                    新規登録
                                </MLink>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

SignIn.getLayout = (page: React.ReactNode) => {
    return <SignInLayout>{page}</SignInLayout>;
};
export default SignIn;
