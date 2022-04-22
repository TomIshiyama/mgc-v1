import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { createContext } from "react";

export const MediaQueryContext = createContext<{
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
}>({
    isSm: false,
    isMd: false,
    isLg: true,
});

export const MediaQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up("sm"));
    const isMd = useMediaQuery(theme.breakpoints.up("md"));
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));
    const value = React.useMemo(() => ({ isSm, isMd, isLg }), [isSm, isMd, isLg]);
    return (
        <MediaQueryContext.Provider value={value}>{children}</MediaQueryContext.Provider>
    );
};
