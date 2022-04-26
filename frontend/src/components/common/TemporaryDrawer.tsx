// eslint-disable-next-line import/named
import CloseIcon from "@mui/icons-material/Close";
import { Container, IconButton } from "@mui/material";
// eslint-disable-next-line import/named
import * as MUIStyles from "@mui/material/styles";
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
    anchor: Anchor;
    render: (
        toggleDrawer: (
            anchor: Anchor,
            open: boolean
        ) => (event: React.KeyboardEvent | React.MouseEvent) => void,
        anchor: Anchor,
        state?: {
            top: boolean;
            left: boolean;
            bottom: boolean;
            right: boolean;
        }
    ) => React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
    margin?: MarginProps;
    showCloseButton?: boolean;
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

const useStyles = (theme: MUIStyles.Theme, state: boolean, margin?: MarginProps) => {
    return makeStyles((_theme: MUIStyles.Theme) => ({
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
    render,
    anchor,
    children,
    defaultOpen = false,
    margin,
    showCloseButton = false,
}) => {
    const [state, setState] = React.useState({
        top: defaultOpen,
        left: defaultOpen,
        bottom: defaultOpen,
        right: defaultOpen,
    });

    const theme = MUIStyles.useTheme();
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

    const child = render(toggleDrawer, anchor, state);
    return (
        <React.Fragment key={anchor}>
            {child}
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
                {showCloseButton && (
                    <IconButton
                        color="inherit"
                        aria-label="IconButton"
                        edge="end"
                        onClick={toggleDrawer(anchor, false)}
                        sx={{
                            position: "fixed",
                            display: "block",
                            right: ".5em",
                            marginTop: ".5em",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                <Container sx={showCloseButton ? { marginTop: "3em" } : {}}>
                    {children}
                </Container>
            </SwipeableDrawer>
        </React.Fragment>
    );
};
