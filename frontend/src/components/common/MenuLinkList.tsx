import {
    Divider,
    Link as MLink,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { MenuDefType } from "../../../layouts/MainLayout";
export type MenuLinkListProps = {
    icon?: React.ReactNode;
    title?: string;
    subTitle?: string;
    description?: React.ReactNode;
    menuList: MenuDefType[];
    showDivider?: boolean;
};

export const MenuLinkList: React.VFC<MenuLinkListProps> = ({
    icon,
    title,
    subTitle,
    description,
    menuList,
    showDivider,
}) => {
    return (
        <>
            <List>
                {menuList.map(({ label, icon, link, prefix, suffix }, i) => (
                    <>
                        <Link href={link} key={`${i}`} passHref>
                            <MLink
                                color={"primary"}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <ListItem button>
                                    {prefix}
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={label} />
                                    {suffix}
                                </ListItem>
                            </MLink>
                        </Link>
                        {showDivider && i + 1 !== menuList.length && <Divider />}
                    </>
                ))}
            </List>
        </>
    );
};
