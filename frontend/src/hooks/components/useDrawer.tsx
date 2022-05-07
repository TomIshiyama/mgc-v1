import React from "react";
import { TemporaryDrawerStateType } from "../../components/common/TemporaryDrawer";

const ANCHOR = {
    TOP: "top",
    LEFT: "left",
    BOTTOM: "bottom",
    RIGHT: "right",
} as const;

type Anchor = typeof ANCHOR[keyof typeof ANCHOR];

export const useDrawer = (defaultOpen = false) => {
    const [state, setState] = React.useState<TemporaryDrawerStateType>({
        top: defaultOpen,
        left: defaultOpen,
        bottom: defaultOpen,
        right: defaultOpen,
    });

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

    const doToggleDrawer = React.useCallback(
        (anchor: Anchor, open: boolean) => setState({ ...state, [anchor]: open }),
        [state]
    );

    return {
        state,
        setState,
        toggleDrawer,
        doToggleDrawer,
    };
};
