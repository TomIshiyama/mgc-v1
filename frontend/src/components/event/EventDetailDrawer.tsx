import moment from "moment";
import { useSession } from "next-auth/react";
import React from "react";
import { EventUpsert } from "../../../../backend2/src/events/event.model";
import {
    GetAttendeeDocument,
    GetAttendeeEventListByUserIdDocument,
    GetAttendeeUserListByEventIdDocument,
    GetEventAllDocument,
    GetEventDocument,
    GetEventListDocument,
    GetEventQuery,
    useDecoderQuery,
    useDeleteAttendeeMutation,
    useDeleteEventMutation,
    useGetAttendeeQuery,
    useGetAttendeeUserListByEventIdQuery,
    useGetEventQuery,
    useUpdateEventMutation,
    useUpsertAttendeeMutation,
} from "../../generated/graphql";
import { useContextDetailDrawer } from "../../hooks/contexts/useContextDetailDrawer";
import { EventCategoryType } from "../../utils/displayData";
import { DetailDrawerProps, ViewEditMode, ViewEditType } from "../common/DetailDrawer";
import { ANCHOR, Anchor } from "../common/TemporaryDrawer";
import { EventDetailDrawerView } from "./EventDetailDrawerView";

export type EventDetailDrawerProps = { key?: React.Key; mode: ViewEditType };

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
    const { state, toggleDrawer, doToggleDrawer, key, setMode } =
        useContextDetailDrawer();
    const { data: session } = useSession();
    const { data: eventData, loading: eventLoading } = useGetEventQuery({
        variables: {
            eventId: Number(key),
        },
        skip: !key,
    });
    const { data: attendeeData } = useGetAttendeeUserListByEventIdQuery({
        variables: {
            eventId: Number(key),
        },
        skip: !key,
    });
    const { data: attend } = useGetAttendeeQuery({
        variables: {
            params: {
                userId: Number(session?.user.userId),
                eventId: Number(key),
            },
        },
        skip: !session || !key,
    });
    const { data: decoderData } = useDecoderQuery();
    const category = decoderData?.decoder.category;

    const [upsertAttendee] = useUpsertAttendeeMutation({
        refetchQueries: [
            GetAttendeeUserListByEventIdDocument,
            GetAttendeeDocument,
            GetAttendeeEventListByUserIdDocument,
            GetEventListDocument,
        ],
    });
    const [deleteAttendee] = useDeleteAttendeeMutation({
        refetchQueries: [
            GetAttendeeUserListByEventIdDocument,
            GetAttendeeDocument,
            GetAttendeeEventListByUserIdDocument,
            GetEventListDocument,
        ],
    });
    const [deleteEvent] = useDeleteEventMutation({
        variables: {
            eventId: Number(key),
        },
        refetchQueries: [
            GetAttendeeUserListByEventIdDocument,
            GetAttendeeDocument,
            GetAttendeeEventListByUserIdDocument,
            GetEventListDocument,
            GetEventDocument,
            GetEventAllDocument,
        ],
    });

    const [updateEvent] = useUpdateEventMutation({
        refetchQueries: [
            GetAttendeeEventListByUserIdDocument,
            GetEventListDocument,
            GetEventDocument,
            GetEventAllDocument,
        ],
    });

    const params: EventUpsert = { id: Number(key) };

    console.log("key : ", key);

    // DetailDrawer内部で呼ばれる関数
    const onSubmit: DetailDrawerProps["onSubmit"] = (data) => {
        console.log("onSubmit", data);
        const params: EventUpsert = {
            id: Number(data.key),
            categoryId: category?.find((v) => v.code === data.category)?.id ?? undefined,
            name: data.name,
            detail: data.detail,
            location: data.location,
            begin: new Date(data.begin),
            end: new Date(data.end),
            isTemporary: false,
        };

        void updateEvent({
            variables: {
                params: params,
            },
            // onCompleted: (data) => {
            //     setMode?.(CONTENT_MODE.view);
            // },
        });
    };

    const onCloseEvent = () => {
        doToggleDrawer?.(anchor, false);
        setMode?.(CONTENT_MODE.view); // Drawer閉じたあとはViewに戻す
    };

    // HACK:resourceから値を渡せばFindの必要がなくなる
    const mapEventDetail = React.useCallback(
        (datum?: GetEventQuery["getEvent"]): DetailDrawerProps => ({
            viewProps: {
                title: datum?.name ?? "",
                subTitle: "イベント詳細",
                location: datum?.location ?? "",
                beginDate: moment(datum?.begin).toDate(),
                endDate: moment(datum?.end).toDate(),
                beginTime: moment(datum?.begin).toDate(),
                endTime: moment(datum?.end).toDate(),
                chipLabel: category?.find((v) => v.id === datum?.categoryId)?.name ?? "",
                category: category?.find((v) => v.id === datum?.categoryId)
                    ?.code as EventCategoryType,
                description: datum?.detail ?? "",
                key: key,
            },
            onSubmit: onSubmit,
            max: 10,
            anchor: "right",
            margin: { top: "5em" },
            avatarList:
                attendeeData?.getAttendeeUserListByEventId.userlist.map((user) => ({
                    alt: `${user.familyName} ${user.givenName}`,
                    src: `${user.iconPath ?? ""}${user.iconName ?? ""}`,
                })) ?? [],
            showCloseButton: true,
            overwrite: {
                open: state[anchor],
                onClose: onCloseEvent,
                onBackdropClick: onCloseEvent,
                onCloseIcon: onCloseEvent,
                onOpen: toggleDrawer?.(anchor, true),
            },
        }),
        [state, key, mode, attendeeData]
    );

    // const hoge = attendeeData?.getAttendeeUserListByEventId.userlist.some((v) => v.id);
    const isAttend = Boolean(attend?.getAttendee?.userId);
    // イベントIDに紐づくイベントのUserIDとログインユーザーが一致しているとき主催イベント
    const isCreated = Boolean(
        eventData?.getEvent.userId === Number(session?.user.userId)
    );

    const isTemporaryEvent = Boolean(eventData?.getEvent.isTemporary);

    console.log("eventData?.getEvent", eventData?.getEvent);
    console.log("isTemporaryEvent", isTemporaryEvent);

    return (
        <>
            <EventDetailDrawerView
                {...mapEventDetail(eventData?.getEvent)}
                viewEditMode={mode}
                buttonList={[
                    isTemporaryEvent
                        ? {
                              label: "本登録",
                              color: "info",
                              type: "submit",
                              onClick: () => {
                                  setMode?.(() => CONTENT_MODE.edit);
                              },
                              disabled: !isTemporaryEvent, // 仮登録状態のみ謳歌
                          }
                        : ViewEditMode.view === mode
                        ? {
                              label: "編集",
                              color: "success",
                              onClick: () => {
                                  setMode?.(() => CONTENT_MODE.edit);
                              },
                          }
                        : {
                              label: "登録",
                              color: "info",
                              type: "submit",
                              onClick: () => {
                                  // FIXME: 登録Mutation
                                  setMode?.(() => CONTENT_MODE.view);
                              },
                          },
                    isAttend
                        ? {
                              label: "参加をやめる",
                              color: "success",
                              onClick: () => {
                                  void deleteAttendee({
                                      variables: {
                                          params: {
                                              userId: Number(session?.user.userId),
                                              eventId: Number(key),
                                          },
                                      },
                                  });
                              },
                          }
                        : {
                              label: "イベント参加", // FIXME: 参加状態の場合、参加取り消しに変更
                              color: "primary",
                              disabled: isTemporaryEvent,
                              // disabled: isJoin(user.id)
                              onClick: (data: any) => {
                                  console.log(data);
                                  void upsertAttendee({
                                      variables: {
                                          params: {
                                              userId: Number(session?.user.userId),
                                              eventId: Number(key),
                                          },
                                      },
                                  });
                              },
                          },
                    {
                        label: "イベントを削除",
                        color: "error",
                        onClick: () => {
                            doToggleDrawer?.(anchor, false);
                            void deleteEvent();
                        },
                        disabled: !isCreated, // 主催者以外は削除できないよ
                    },
                ]}
            />
        </>
    );
};
