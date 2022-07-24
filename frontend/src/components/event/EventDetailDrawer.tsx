import moment from "moment";
import React from "react";
import { FetchEventContext } from "../../common/FetchEventProvider";
import { useContextDetailDrawer } from "../../hooks/contexts/useContextDetailDrawer";
import { BaseEventProps } from "../../types/connection";
import { EventCategoryType } from "../../utils/displayData";
import { DetailDrawerProps } from "../common/DetailDrawer";
import { ANCHOR, Anchor } from "../common/TemporaryDrawer";
import { EventDetailDrawerEdit } from "./EventDetailDrawerEdit";
import { EventDetailDrawerView } from "./EventDetailDrawerView";

export type EventDetailDrawerProps = { key?: React.Key; mode: ContentModeType };

// 右側に表示固定
const anchor: Anchor = ANCHOR.RIGHT;

export const CONTENT_MODE = {
    top: "top",
    temporary: "temporary",
    view: "view",
    edit: "edit",
} as const;

export type ContentModeType = typeof CONTENT_MODE[keyof typeof CONTENT_MODE];

export const EventDetailDrawer: React.VFC<EventDetailDrawerProps> = ({ mode }) => {
    const { state, toggleDrawer, key } = useContextDetailDrawer();

    const { event, category } = React.useContext(FetchEventContext); // HACK: カスタムフックに内包

    // HACK:resourceから値を渡せばFindの必要がなくなる
    const mapEventDetail = React.useCallback(
        (datum?: BaseEventProps): DetailDrawerProps => ({
            title: datum?.name ?? "",
            subTitle: "イベント詳細",
            max: 5,
            anchor: "right",
            location: datum?.location,
            beginDate: moment(datum?.begin).toDate(),
            endDate: moment(datum?.end).toDate(),
            beginTime: moment(datum?.begin).toDate(),
            endTime: moment(datum?.end).toDate(),
            margin: { top: "5em" },
            description: datum?.detail,
            avatarList: [
                // FIXME: 疎通実装
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
            overwrite: {
                open: state[anchor],
                onClose: toggleDrawer?.(anchor, false),
                onBackdropClick: toggleDrawer?.(anchor, false),
                onCloseIcon: toggleDrawer?.(anchor, false),
                onOpen: toggleDrawer?.(anchor, true),
            },
        }),
        [state, key, event, mode]
    );

    const matched = React.useMemo(
        () => event?.data?.find((v) => v.id === key),
        [event, key]
    );

    return (
        <>
            {mode === CONTENT_MODE.top ? (
                <EventDetailDrawerView
                    {...mapEventDetail(matched)}
                    buttonList={[
                        {
                            label: "イベント参加", // FIXME: 参加状態の場合、参加取り消しに変更
                            color: "primary",
                            // disabled: isJoin(user.id)
                        },
                    ]}
                />
            ) : mode === CONTENT_MODE.view ? (
                <EventDetailDrawerView
                    {...mapEventDetail(matched)}
                    buttonList={[
                        {
                            label: "イベント参加", // FIXME: 参加状態の場合、参加取り消しに変更
                            color: "primary",
                            // disabled: isJoin(user.id)
                        },
                    ]}
                />
            ) : mode === CONTENT_MODE.temporary ? (
                <EventDetailDrawerView
                    {...mapEventDetail(matched)}
                    buttonList={[
                        {
                            label: "本登録",
                            color: "primary",
                        },
                        {
                            label: "編集",
                            color: "success",
                        },
                        {
                            label: "削除",
                            color: "error",
                        },
                    ]}
                /> //FIXME: 実装
            ) : (
                <EventDetailDrawerEdit />
            )}
        </>
    );
};
