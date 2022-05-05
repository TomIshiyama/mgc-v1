import React, { createContext } from "react";
import { Anchor, TemporaryDrawerStateType } from "../components/common/TemporaryDrawer";
import { useDrawer } from "../hooks/components/useDrawer";

export const DetailDrawerContext = createContext<{
    state: TemporaryDrawerStateType;
    toggleDrawer?: (
        anchor: Anchor,
        open: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}>({
    state: {
        right: false,
        top: false,
        left: false,
        bottom: false,
    },
});

// const DetailDrawerContext = createContext(undefined);
export const DetailDrawerProvider = ({ children }) => {
    const { state, toggleDrawer } = useDrawer(false);
    console.log("Provider, ", state);
    // if (state === null) return;
    return (
        <DetailDrawerContext.Provider value={{ state, toggleDrawer }}>
            {children}
        </DetailDrawerContext.Provider>
    );
};
