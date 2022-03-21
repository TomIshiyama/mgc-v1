import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import GroupIcon from "@mui/icons-material/Group";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
    Autocomplete,
    Avatar,
    Button,
    Container,
    Grid,
    InputAdornment,
    Link as MLink,
    TextField,
} from "@mui/material";
// eslint-disable-next-line import/named
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// eslint-disable-next-line import/named
import { styled, SxProps, useTheme } from "@mui/material/styles/";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "next/link";
import * as React from "react";
import { top100Films } from "../src/mock/autocomplete";
import { pagesPath } from "../src/utils/$path";

export const drawerWidth = 240;

//HACK: Refactor
//FIXME: 疎通 仮登録 ユーザーRole
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,

    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    backgroundColor: "white",
    color: "black",
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        backgroundColor: "white",
        color: "black",
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export type MenuDefType = {
    label: string;
    icon: React.ReactNode;
    link: LinkProps["href"];
};

export type SideMenuDefType = {
    title: string;
    menuList: MenuDefType[];
};

const iconStyle: SxProps = {
    color: "whitesmoke",
};

const menuDefs: SideMenuDefType[] = [
    {
        title: "メニュー",
        menuList: [
            {
                label: "カレンダー",
                icon: <DateRangeOutlinedIcon sx={iconStyle} />,
                link: pagesPath.top.$url(),
            },
            {
                label: "マイイベント",
                icon: <EmojiFlagsIcon sx={iconStyle} />,
                link: "#", // FIXME: 遷移先URL
            },
        ],
    },
    // FIXME: 疎通 管理者メニューを権限ユーザーよって表示切り替え
    {
        title: "管理",
        menuList: [
            {
                label: "ユーザー",
                icon: <GroupIcon sx={iconStyle} />,
                link: "#", // FIXME: 遷移先URL
            },
            { label: "イベント", icon: <EmojiFlagsIcon sx={iconStyle} />, link: "#" },
        ],
    },
];

export type MenuItemsProps = {
    defs: SideMenuDefType[];
};

export const MenuItems: React.VFC<MenuItemsProps> = ({ defs }) => {
    return (
        <>
            {defs.map(({ title, menuList }, i) => {
                return (
                    <Container key={`container_${i}`} sx={{ paddingBottom: "2em" }}>
                        <Typography variant="h6">{title}</Typography>
                        {menuList.map(({ label, icon, link }, j) => {
                            return (
                                <Link href={link} key={`${i}_${j}`}>
                                    <MLink
                                        color={"primary"}
                                        style={{
                                            color: "white",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <ListItem button>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={label} />
                                        </ListItem>
                                    </MLink>
                                </Link>
                            );
                        })}
                    </Container>
                );
            })}
        </>
    );
};

export const MainLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const onClickTempRegister = React.useCallback(() => {
        // FIXME: 疎通 実装
        // console.log("onClickTempRegister Clicked!");
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                {/* ヘッダー部分 */}
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Grid container spacing={3} justifyContent="space-between">
                        {/* <Grid item xs={1} /> */}
                        <Grid container item xs={5} minWidth="25em">
                            <Autocomplete
                                freeSolo
                                disableClearable
                                fullWidth
                                options={top100Films.map((option) => option.title)}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            label="Search input"
                                            size="small"
                                            // sx={{ padding: "0px", margin: "0px" }}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: "search",
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        sx={{
                                                            bgcolor: "lightCoral",
                                                            color: "black",
                                                            width: "40px",
                                                            height: "40px",
                                                            borderRadius: "6px",
                                                        }}
                                                    >
                                                        {/* TODO: 共通カラー型を定義 */}

                                                        <SearchOutlinedIcon
                                                            sx={{
                                                                color: "whitesmoke",
                                                                margin: "0 auto",
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            spacing={2}
                            xs={4}
                            minWidth={"300px"}
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <Grid item>
                                <Button
                                    onClick={onClickTempRegister}
                                    // color="primary"
                                    variant="contained"
                                    sx={{ bgcolor: "lightCoral" }}
                                >
                                    仮登録
                                </Button>
                            </Grid>
                            <Grid item>
                                {/* FIXME: 疎通実装 */}
                                <Typography variant="subtitle1">User Name</Typography>
                            </Grid>
                            <Grid item>
                                <Avatar />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* サイドメニュー部分 */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        // Side menu部分のCSS
                        width: drawerWidth,
                        boxSizing: "border-box",
                        ...(open && {
                            // open状態の時のみスタイルを適応
                            bgcolor: "#1e1d1d",
                        }),
                        color: "white",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon sx={iconStyle} />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                <List>
                    <MenuItems defs={menuDefs} />
                </List>

                <Container sx={{ marginTop: "auto", padding: "2em 0", width: "100%" }}>
                    <Divider sx={{ borderColor: "white", margin: "2em 0" }} />
                    <Typography variant="subtitle2">連絡</Typography>
                    <Link href="#">
                        <MLink
                            component={"button"}
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            不具合報告
                        </MLink>
                    </Link>
                    <Box>
                        <Typography variant="caption" component="span">
                            Copyright:{" "}
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            M.G.C.
                        </Typography>
                    </Box>
                </Container>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
};
