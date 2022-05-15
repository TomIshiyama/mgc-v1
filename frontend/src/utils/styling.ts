// FIXME:要調整
export const COLOR = {
    meeting: "aqua",
    tech: "gold",
    meetup: "hotPink", // deepPink
    fff: "MediumSpringGreen",
    primary: "CornflowerBlue",
    anniversary: "Khaki",
    etc: "RosyBrown",
    event: "SteelBlue",
    setting: "LightSeaGreen",
    temporary: "orange",
    dark: {},
    normal: {
        caption: "dimgray",
        bgcolor: "white", //
        sideBgcolor: "SeaShell", // 他候補 OldLace,Line,SeaShell, LavenderBlush
        userBgcolor: "WhiteSmoke",
    },
} as const;

export const Z_INDEX = {
    toggleDrawer: "1250",
    subDrawer: "1070",
} as const;
