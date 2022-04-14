import { Button, Container, Grid, TextField } from "@mui/material";
// eslint-disable-next-line import/named
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// eslint-disable-next-line import/named
import { useTheme } from "@mui/material/styles/";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

//FIXME: page height!

export const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                component="form"
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
                        <Link href="/userregistration" variant="body2">
                            {"新規登録"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export const UserRegisterLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const theme = useTheme();

    const [position, setPosition] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setPosition(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                component="form"
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
                <Box component="form" noValidate sx={{ mt: 8 }}></Box>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="family_name"
                    label="姓"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="given_name"
                    label="名"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="family_kana"
                    label="姓（カナ）"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="given_kana"
                    label="名（カナ）"
                    autoFocus
                />
                <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
                    <InputLabel id="position-select-label">ポジション</InputLabel>
                    <Select
                        labelId="position-select-label"
                        id="position-select"
                        value={position}
                        label="ポジション"
                        onChange={handleChange}
                    >
                        <MenuItem value={2}>Division Director</MenuItem>
                        <MenuItem value={3}>Unit Director</MenuItem>
                        <MenuItem value={4}>Group Director</MenuItem>
                        <MenuItem value={5}>Member</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Register
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="/login" variant="body2">
                            {"←ログインへ戻る"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
//ログインのPOST処理にはここでuse postを使う！
//use effect?
