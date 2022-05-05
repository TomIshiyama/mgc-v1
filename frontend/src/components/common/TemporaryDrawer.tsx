import CloseIcon from "@mui/icons-material/Close";
// eslint-disable-next-line import/named
import { Container, IconButton, IconButtonProps } from "@mui/material";
import * as MUIStyles from "@mui/material/styles";
// eslint-disable-next-line import/named
import SwipeableDrawer, { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { useDrawer } from "../../hooks/components/useDrawer";

export const ANCHOR = {
    TOP: "top",
    LEFT: "left",
    BOTTOM: "bottom",
    RIGHT: "right",
} as const;

export type Anchor = typeof ANCHOR[keyof typeof ANCHOR];
export type TemporaryDrawerStateType = {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
};

export type TemporaryDrawerProps = {
    anchor: Anchor;
    render?: (
        toggleDrawer: (
            anchor: Anchor,
            open: boolean
        ) => (event: React.KeyboardEvent | React.MouseEvent) => void,
        anchor: Anchor,
        state?: TemporaryDrawerStateType
    ) => React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
    margin?: MarginProps;
    showCloseButton?: boolean;
    manageDrawer?: (anchor: Anchor, open: boolean) => void;
    overwrite?: {
        open: boolean;
        onOpen: SwipeableDrawerProps["onOpen"];
        onClose: SwipeableDrawerProps["onClose"];
        onBackdropClick: SwipeableDrawerProps["onBackdropClick"];
        onCloseIcon: IconButtonProps["onClick"];
    };
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
    overwrite,
}) => {
    // const [state, setState] = React.useState({
    //     top: defaultOpen,
    //     left: defaultOpen,
    //     bottom: defaultOpen,
    //     right: defaultOpen,
    // });

    const { state, setState, toggleDrawer } = useDrawer(defaultOpen);

    const theme = MUIStyles.useTheme();
    const classes = useStyles(theme, state.bottom, margin);

    const child = render?.(toggleDrawer, anchor, state);
    return (
        <React.Fragment key={anchor}>
            {child}
            <SwipeableDrawer
                variant="temporary"
                // className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}
                open={overwrite?.open ?? state[anchor]}
                onOpen={overwrite?.onOpen ?? toggleDrawer(anchor, true)}
                onClose={overwrite?.onClose ?? toggleDrawer(anchor, false)}
                onBackdropClick={
                    overwrite?.onBackdropClick ?? toggleDrawer(anchor, false)
                }
            >
                {showCloseButton && (
                    <IconButton
                        color="inherit"
                        aria-label="IconButton"
                        edge="end"
                        onClick={overwrite?.onCloseIcon ?? toggleDrawer(anchor, false)}
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
                <Container
                    sx={
                        showCloseButton
                            ? {
                                  marginTop: "3em",
                                  height: `${makeMargin(margin)?.height ?? "100%"}-30px`,
                              }
                            : {}
                    }
                >
                    {children}
                </Container>
            </SwipeableDrawer>
        </React.Fragment>
    );
};
