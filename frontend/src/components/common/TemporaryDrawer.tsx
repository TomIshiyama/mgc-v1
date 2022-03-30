import Button from "@mui/material/Button";
// eslint-disable-next-line import/named
import { Theme, useTheme } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import * as React from "react";

export const ANCHOR = {
    TOP: "top",
    LEFT: "left",
    BOTTOM: "bottom",
    RIGHT: "right",
} as const;

type Anchor = typeof ANCHOR[keyof typeof ANCHOR];

export type TemporaryDrawerProps = {
    defaultOpen?: boolean;
    anchor: Anchor;
    children: React.ReactNode;
    margin?: MarginProps;
};

type MarginProps = {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
};

const makeMargin = (margin?: MarginProps) => {
    if (!margin) return undefined;

    return margin.top
        ? { height: `calc(100% - ${margin.top})`, top: margin.top }
        : margin.left
        ? { left: margin.left }
        : margin.right
        ? { right: margin.right }
        : margin.bottom
        ? { height: `calc(100% - ${margin.bottom})`, bottom: margin.bottom }
        : undefined;
};

const useStyles = (theme: Theme, state: boolean, margin?: MarginProps) => {
    return makeStyles((_theme: Theme) => ({
        drawer: {
            ...(state
                ? {
                      "& .MuiBackdrop-root": {
                          //   display: "none", TODO: display noneにすると開閉不可になる
                      },
                  }
                : { width: 0 }),
        },

        drawerPaper: {
            ...makeMargin(margin),

            ...(!state && {
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        },
    }))();
};

export const TemporaryDrawer: React.VFC<TemporaryDrawerProps> = ({
    anchor,
    children,
    defaultOpen = false,
    margin,
}) => {
    const [state, setState] = React.useState({
        top: defaultOpen,
        left: defaultOpen,
        bottom: defaultOpen,
        right: defaultOpen,
    });

    const theme = useTheme();
    const classes = useStyles(theme, state.bottom, margin);

    const toggleDrawer = React.useCallback(
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" ||
                        (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return;
                }
                setState({ ...state, [anchor]: open });
            },
        [state]
    );

    return (
        <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            {/* <Main open={state[anchor]}>
                <DrawerHeader />
                {mainContent}
            </Main> */}
            <SwipeableDrawer
                variant="temporary"
                // className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}
                open={state[anchor]}
                onOpen={toggleDrawer(anchor, true)}
                onClose={toggleDrawer(anchor, false)}
                onBackdropClick={toggleDrawer(anchor, false)}
            >
                {children}
            </SwipeableDrawer>
        </React.Fragment>
    );
};
