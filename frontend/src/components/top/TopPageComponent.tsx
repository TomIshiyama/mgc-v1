import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Drawer, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import React from "react";
import { defDateFormat, defDrawerWidth } from "../../utils/definitions";
import { TopPageDrawerContent } from "./TopPageDrawerContent";

const Main = styled("div", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${defDrawerWidth.subMain}px`,
    width: "100%",
    ...(open && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: `calc(100% - ${defDrawerWidth.subMain}px)`,
        marginRight: 0,
    }),
}));

// FIXME: MOCK 後で消す
const data = {
    day: new Date(),
};

// HACK: 不要と判断できたら削除
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

export type TopPageComponentProps = {
    children: React.ReactNode;
};

export const TopPageComponent: React.VFC<TopPageComponentProps> = ({ children }) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                // 画面中央右寄せ
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: `translateY(-50%) translateX(-40px)`, //HACK : MAGIC NUMBER撲滅
                }}
            >
                {open ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
            </IconButton>
            <Main open={open}>{children}</Main>
            <Drawer
                sx={{
                    width: defDrawerWidth.subMain,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: defDrawerWidth.subMain,
                        height: "calc(100% - 60px)",
                        top: 60,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <TopPageDrawerContent
                    buttonList={[]}
                    title={moment(data.day).format(defDateFormat.day)}
                    subtitle={moment(data.day).format(defDateFormat.fullDayOfWeek)}
                    description={<></>}
                    onClickIcon={handleDrawerClose}
                />
            </Drawer>
        </>
    );
};
