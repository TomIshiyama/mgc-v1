import { TooltipProps } from "@material-ui/core/Tooltip/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Avatar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link as MLink,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { MenuDefType } from "../../../layouts/MainLayout";
export type OpenIconButtonProps = {
    title: string;
    subTitle: string;
    iconSrc?: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    tooltip: TooltipProps["title"];
    menuList: MenuDefType[];
    showAllDivider?: boolean;
    footer?: React.ReactNode;
};

export const OpenIconButton: React.VFC<OpenIconButtonProps> = ({
    title,
    subTitle,
    description,
    iconSrc,
    icon,
    tooltip,
    menuList,
    showAllDivider,
    footer,
}) => {
    // メニュー開閉用ステート anchorEL により表示位置をボタンの下に固定する
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box>
                <Tooltip title={tooltip}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} src={iconSrc}>
                            {icon}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="open-icon-button-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Grid
                    container
                    alignItems="center"
                    spacing={0}
                    direction="column"
                    justifyContent="center"
                >
                    <Grid item xs={12} margin="0.5em">
                        {/* HACK: アイコンの大きさは定数化する */}
                        <Avatar sx={{ width: 54, height: 54 }} src={iconSrc}>
                            {icon}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">{title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2"> {subTitle}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{description}</Typography>
                    </Grid>
                </Grid>
                <Divider style={{ margin: "1em" }} />
                {menuList.map(({ divider, link, ...itemProps }, i) => (
                    <>
                        {link ? (
                            <Link href={link} key={`${i}`} passHref>
                                <MLink
                                    color={"primary"}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <InternalMenuItem {...itemProps} />
                                </MLink>
                            </Link>
                        ) : (
                            <InternalMenuItem {...itemProps} />
                        )}

                        {divider && <Divider />}
                        {showAllDivider && i + 1 !== menuList.length && <Divider />}
                    </>
                ))}

                {footer && (
                    <Box
                        id="open-icon-button-footer"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        paddingTop="1em"
                        paddingBottom="0.5em"
                    >
                        {footer}
                    </Box>
                )}
            </Menu>
        </>
    );
};
// TODO: dimgray を定数化する
const InternalMenuItem = ({
    icon,
    label,
    prefix,
    suffix = <ArrowForwardIosIcon style={{ color: "dimgray" }} />,
}: Omit<MenuDefType, "link">) => (
    <MenuItem>
        <Container>
            <Grid
                container
                spacing={1}
                textAlign="center"
                alignItems="center"
                justifyContent={"space-between"}
            >
                <Grid item container xs={10} spacing={1} alignItems="center">
                    <Grid item>
                        <Avatar>{icon}</Avatar>
                    </Grid>
                    <Grid item>{prefix}</Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ color: "dimgray" }}>
                            {label}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    {suffix}
                </Grid>
            </Grid>
        </Container>
    </MenuItem>
);

{
    /*
これでも上記とほぼレイアウトにできる
<MenuItem>
<ListItemIcon>
    <ContentPaste fontSize="small" />
</ListItemIcon>
<ListItemText>Paste</ListItemText>
<Typography variant="body2" color="text.secondary">
    ⌘V
</Typography>
</MenuItem> */
}
