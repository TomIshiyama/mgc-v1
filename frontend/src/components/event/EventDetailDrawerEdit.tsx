import React from "react";

export const CONTENT_MODE = {
    view: "view",
    edit: "edit",
} as const;

type ContentModeType = typeof CONTENT_MODE[keyof typeof CONTENT_MODE];

export type EventDetailDrawerEditProps = { key?: React.Key; mode: ContentModeType };

export const EventDetailDrawerEdit: React.VFC<EventDetailDrawerEditProps> = ({ key }) => {
    return <></>;
};
