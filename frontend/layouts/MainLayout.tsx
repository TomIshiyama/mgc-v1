import { createFilterOptions } from "@mui/core";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircleIcon from "@mui/icons-material/Circle";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import {
    Autocomplete,
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
import moment from "moment";
import { signOut, useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FetchEventContext } from "../src/common/FetchEventProvider";
import { DateRangePickerModal } from "../src/components/common/DateRangePickerModal";
import { OpenIconButton } from "../src/components/common/OpenIconButton";
import { EventDetailDrawer } from "../src/components/event/EventDetailDrawer";
import { useContextDetailDrawer } from "../src/hooks/contexts/useContextDetailDrawer";
import { usePost } from "../src/hooks/request/usePost";
import { mapAutocomplete } from "../src/pages/top";
import { BaseEventProps } from "../src/types/connection";
import { pagesPath } from "../src/utils/$path";
import { excludeNullish, mapDateString } from "../src/utils/collection";
import { EventCategoryType } from "../src/utils/displayData";
import { COLOR } from "../src/utils/styling";
import { Serialized } from "../src/utils/types";

const openMenuList = [
    {
        icon: <AccountCircleOutlinedIcon />,
        label: "プロフィール",
        link: "#",
    },
    {
        icon: <FlagCircleOutlinedIcon sx={{ color: COLOR.event }} />,
        label: "マイイベント",
        link: "#",
    },
    {
        icon: <SettingsApplicationsIcon sx={{ color: COLOR.setting }} />,
        label: "設定",
        link: "#",
    },
];

export const drawerWidth = 240;

//HACK: Refactor
//FIXME: 疎通 仮登録 ユーザーRole
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
    bgcolor?: HTMLElement["style"]["backgroundColor"];
}>(({ theme, open, bgcolor }) => ({
    flexGrow: 1,
    ...(bgcolor ? { backgroundColor: bgcolor } : undefined),
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
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    divider?: boolean;
};

export type SideMenuDefType = {
    title: string;
    menuList: MenuDefType[];
};

const iconStyle: SxProps = {
    color: "whitesmoke",
};

export type MenuItemsProps = {
    defs: SideMenuDefType[];
};

export const MenuItems: React.VFC<MenuItemsProps> = ({ defs }) => {
    return (
        <>
            <List>
                {defs.map(({ title, menuList }, i) => {
                    return (
                        <Container key={`container_${i}`} sx={{ paddingBottom: "2em" }}>
                            <Typography variant="h6">{title}</Typography>
                            {menuList.map(({ label, icon, link, prefix, suffix }, j) => {
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
                                                {prefix}
                                                <ListItemIcon>{icon}</ListItemIcon>
                                                <ListItemText primary={label} />
                                                {suffix}
                                            </ListItem>
                                        </MLink>
                                    </Link>
                                );
                            })}
                        </Container>
                    );
                })}
            </List>
        </>
    );
};

export const MainLayout: React.FC<{
    children: React.ReactNode;
    bgcolor?: HTMLElement["style"]["backgroundColor"];
}> = ({ children, bgcolor }) => {
    const { push } = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(true);

    const { data: session } = useSession();

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const { event, category } = React.useContext(FetchEventContext);
    const { doPost, loading } = usePost<
        Partial<BaseEventProps>,
        Serialized<BaseEventProps>
    >({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}events`,
    });

    const { mode } = useContextDetailDrawer();

    const onClickLogout = async () => {
        await signOut();
        await push(pagesPath.signin.$url().pathname);
    };
    const menuDefs: SideMenuDefType[] = excludeNullish([
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
        // FIXME: 疎通 管理者メニューを権限ユーザーよって表示切り替
        session?.user?.admin
            ? {
                  title: "管理",
                  menuList: [
                      {
                          label: "ユーザー",
                          icon: <GroupIcon sx={iconStyle} />,
                          link: pagesPath.manage.user.list.$url().pathname,
                      },
                      {
                          label: "イベント",
                          icon: <EmojiFlagsIcon sx={iconStyle} />,
                          link: "#",
                      },
                  ],
              }
            : undefined,
    ]);

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
                            {/* FIXME: コンポーネント切り分け */}

                            <Autocomplete
                                loading={event?.loading ?? true}
                                freeSolo
                                disableClearable
                                fullWidth
                                options={mapAutocomplete(event?.data ?? [])}
                                // options={top100Films.map((option) => option.title)}

                                filterOptions={createFilterOptions({
                                    // label と fromでフィルタ可能にする
                                    stringify: (option) => option.label + option.from,
                                })}
                                renderOption={(props, option) => (
                                    <>
                                        <Box
                                            component="li"
                                            sx={{
                                                "& > img": { mr: 2, flexShrink: 0 },
                                            }}
                                            {...props}
                                        >
                                            <Box
                                                width="100%"
                                                display="flex"
                                                justifyContent={"space-between"}
                                                alignItems="center"
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: (theme) =>
                                                            theme.spacing(4),
                                                    }}
                                                >
                                                    <CircleIcon
                                                        sx={{
                                                            width: ".5em",
                                                            height: ".5em",
                                                            color: COLOR[
                                                                category?.data?.find(
                                                                    (v) =>
                                                                        v.id ===
                                                                        option.categoryId
                                                                )
                                                                    ?.categoryCode as EventCategoryType
                                                            ],
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography variant="body1">
                                                        {option.label}
                                                        {/* カテゴリ表示は一旦不要 */}
                                                        {/* {
                                                            category?.data?.find(
                                                                (v) =>
                                                                    v.id ===
                                                                    option.categoryId
                                                            )?.categoryCode
                                                        } */}
                                                    </Typography>
                                                </ListItemText>
                                                <Box>
                                                    <Typography
                                                        component="li"
                                                        variant="caption"
                                                        sx={{
                                                            color: COLOR.normal.caption,
                                                        }}
                                                    >
                                                        {option.from} -
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: COLOR.normal.caption,
                                                        }}
                                                    >
                                                        {option.to}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </>
                                    // <ListItemButton
                                    //     // CSSプロパティは差分更新する
                                    //     sx={{
                                    //         ...style,
                                    //     }}
                                    //     // selected={selected}
                                    //     // onClick={onClick}
                                    //     color="primary"
                                    //     {...props}
                                    // >
                                    //     <ListItemIcon>
                                    //         <CircleIcon
                                    //             sx={{
                                    //                 width: ".5em",
                                    //                 height: ".5em",
                                    //                 // color: COLOR[category],
                                    //             }}
                                    //         />
                                    //     </ListItemIcon>
                                    //     <ListItemText>
                                    //         <Box>
                                    //             <Typography variant="subtitle1">
                                    //                 {option.label}
                                    //             </Typography>
                                    //             <Typography variant="caption">
                                    //                 {option.from}-{option.to}
                                    //             </Typography>
                                    //         </Box>
                                    //     </ListItemText>
                                    // </ListItemButton>
                                )}
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
                                <DateRangePickerModal
                                    buttonLabel="仮登録"
                                    onSubmit={async (formValues) => {
                                        // FIXME: validation 実装
                                        const data = mapDateString({
                                            userId: 1, // FIXME: Login 機能を実装する
                                            name: formValues.eventTitle,
                                            begin: formValues.startDate!,
                                            end: formValues.endDate!,
                                            isTemporary: 1, // HACK: これENUM使いたいな・・・
                                            categoryId: category?.data?.find(
                                                (v) => v.categoryCode === "temporary"
                                            )?.id,
                                            lastUpdate: moment().toDate(),
                                            createdDate: moment().toDate(),
                                        });
                                        await doPost({
                                            params: data,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                {/* FIXME: 疎通実装 */}
                                <Typography variant="subtitle1">User Name</Typography>
                            </Grid>
                            <Grid item>
                                <OpenIconButton
                                    title={"YRU太郎"}
                                    subTitle={"Group Director"}
                                    tooltip={"メニューを開く"}
                                    menuList={openMenuList}
                                    allSuffix={
                                        <ArrowForwardIosIcon sx={{ color: "dimgray" }} />
                                    }
                                    footer={
                                        <Button
                                            color="warning"
                                            variant="contained"
                                            endIcon={<LogoutIcon />}
                                            onClick={onClickLogout}
                                        >
                                            ログアウト
                                        </Button>
                                    }
                                />
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

                <MenuItems defs={menuDefs} />

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
            {/* メインコンテンツ */}
            <Main open={open} bgcolor={bgcolor}>
                <DrawerHeader />
                {children}
            </Main>

            {/* イベントのDrawer */}
            <EventDetailDrawer mode={mode ?? "top"} />
        </Box>
    );
};
