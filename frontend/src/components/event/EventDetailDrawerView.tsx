import React from "react";
import { DetailDrawer, DetailDrawerProps } from "../common/DetailDrawer";

export type EventDetailDrawerViewProps = DetailDrawerProps & {
    key?: React.Key;
};

export const EventDetailDrawerView: React.VFC<EventDetailDrawerViewProps> = (props) => {
    return (
        <>
            <DetailDrawer {...props} />
        </>
    );
};
