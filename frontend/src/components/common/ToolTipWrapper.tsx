// eslint-disable-next-line import/named
import { Tooltip, TooltipProps } from "@mui/material";
import React from "react";

// TODO: 以下のURLを参考にDisabledでTooltipを表示する
// https://stackoverflow.com/questions/61115913/is-it-possible-to-render-a-tooltip-on-a-disabled-mui-button-within-a-buttongroup
// const Button = withStyles({
//     root: {
//         "&.Mui-disabled": {
//             pointerEvents: "auto",
//         },
//     },
// })(MuiButton);

// export const ToolTipWrapper = ({ tooltipText, disabled, onClick, ...other }) => {
//     const adjustedButtonProps = {
//         disabled: disabled,
//         component: disabled ? "div" : undefined,
//         onClick: disabled ? undefined : onClick,
//     };
//     return (
//         <Tooltip title={tooltipText}>
//             <Button {...other} {...adjustedButtonProps} />
//         </Tooltip>
//     );
// };

export const ToolTipWrapper: React.VFC<{
    title: TooltipProps["title"];
    children: TooltipProps["children"];
}> = ({ title, children }) => {
    return (
        <Tooltip title={title}>
            <span>{children}</span>
        </Tooltip>
    );
};
