import NextHead from "next/head";
import * as React from "react";

interface Props {
    title: string;
    description: string;
    keyword: string;
    image?: string;
    url?: string;
    twitter?: {
        card?: string;
        site?: string;
    };
    icons?: {
        shortcut?: string;
        appleTouch?: string;
    };
}

export const Head = ({
    title,
    description,
    keyword,
    image,
    url,
    twitter,
    icons = {
        shortcut: "",
        appleTouch: "",
    },
}: Props): JSX.Element => {
    return (
        <NextHead>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="keywords" content={keyword} />
            <meta property="og:type" content="blog" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={title} />
            <meta name="twitter:card" content={twitter?.card} />
            <meta name="twitter:site" content={twitter?.site} />
            <meta name="twitter:url" content={image} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
            <link rel="shortcut icon" href={icons.shortcut} />
            <link rel="apple-touch-icon" href={icons.appleTouch} />
        </NextHead>
    );
};
