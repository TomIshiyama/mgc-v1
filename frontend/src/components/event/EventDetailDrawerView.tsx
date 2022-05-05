import { Button } from "@mui/material";
import React from "react";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { useContextDetailDrawer } from "../../hooks/contexts/useContextDrawer";
import { BaseEventProps } from "../../types/connection";
import { EventCategoryType } from "../../utils/displayData";
import { DetailDrawer, DetailDrawerProps } from "../common/DetailDrawer";
import { ANCHOR, Anchor } from "../common/TemporaryDrawer";

export type EventDetailDrawerViewProps = DetailDrawerProps & {
    key?: React.Key;
};
const anchor: Anchor = ANCHOR.RIGHT;

export const EventDetailDrawerView: React.VFC<EventDetailDrawerViewProps> = ({ key }) => {
    // const [state, setState] = React.useState(true);
    // const onClick = () => {
    // setState((pre) => !pre);
    // };
    // const { state, toggleDrawer } = useDrawer();
    // const { state, toggleDrawer } = useContext(DetailDrawerContext);
    key = 1;

    const { state, toggleDrawer } = useContextDetailDrawer();
    const { event, category } = React.useContext(FetchEventContext); // HACK: カスタムフックに内包
    // console.log(state);

    const mapEventDetail = React.useCallback(
        (datum?: BaseEventProps): DetailDrawerProps => ({
            title: datum?.name ?? "",
            subTitle: "イベント詳細",
            max: 5,
            anchor: "right",
            location: datum?.location,
            beginDate: datum?.begin,
            endDate: datum?.end,
            beginTime: datum?.begin,
            endTime: datum?.end,
            margin: { top: "5em" },
            description: datum?.detail,
            avatarList: [
                // FIXME: 実装
                {
                    alt: "aaa",
                    src: "",
                },
                {
                    alt: "bbb",
                    src: "",
                },
                {
                    alt: "ccc",
                    src: "",
                },
            ],
            category: category?.data?.find((v) => v.id === datum?.categoryId)
                ?.categoryCode as EventCategoryType,
            chipLabel:
                category?.data?.find((v) => v.id === datum?.categoryId)?.name ?? "",
            showCloseButton: true,
        }),
        []
    );

    const matched = React.useMemo(() => event?.data?.find((v) => v.id === key), [event]);

    console.log("mapEventDetail", mapEventDetail(matched));
    return (
        <>
            <Button onClick={toggleDrawer(anchor, true)}>AAAAAAA</Button>
            <DetailDrawer
                {...mapEventDetail(matched)}
                // defaultOpen={true}
                overwrite={{
                    open: state[anchor],
                    onClose: toggleDrawer(anchor, false),
                    onBackdropClick: toggleDrawer(anchor, false),
                    onCloseIcon: toggleDrawer(anchor, false),
                    onOpen: toggleDrawer(anchor, true),
                }}
            />
        </>
    );
};
