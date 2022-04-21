import { Button, Container, Grid, TextField } from "@mui/material";
// eslint-disable-next-line import/named
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
// eslint-disable-next-line import/named
import { useTheme } from "@mui/material/styles/";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

//FIXME: page height!

export const SignInLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        //FIXME: usePost params, body
        // const { doPost } = usePost({
        //     method: "post",
        //     url: "/api/user",
        // });
        // doPost({
        //     url: "/api/user",
        //     params: {
        //         email: data.get("email"),
        //         password: data.get("password"),
        //     },
        //     onSuccess: (familyName) => {
        //         console.log(`create ${familyName}  success!`);
        //     },
        //     onError: (err) => {
        //         console.log(err.message);
        //     },
        // });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メール"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="ログイン情報保存"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    サインイン
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            パスワード失望
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"新規登録"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
