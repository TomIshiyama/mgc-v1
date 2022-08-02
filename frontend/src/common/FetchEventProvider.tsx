import React, { createContext } from "react";
import { useGetEventAllQuery } from "../generated/graphql";
import { useFetch, UseFetchResponse } from "../hooks/request/useFetch";
import {
    BaseAttendeeProps,
    BaseCategoryProps,
    BaseEventProps,
} from "../types/connection";

const userId = 1;

export const FetchEventContext = createContext<{
    event: UseFetchResponse<BaseEventProps[]> | undefined;
    category: UseFetchResponse<BaseCategoryProps[]> | undefined;
    attendee: UseFetchResponse<BaseAttendeeProps[]> | undefined;
}>({ event: undefined, category: undefined, attendee: undefined });

export const FetchEventProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
    const event = useFetch<BaseEventProps[]>({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}events?user_id=${userId}`,
        headers: {},
    });

    const category = useFetch<BaseCategoryProps[]>({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}categories`,
        headers: {},
    });

    const attendee = useFetch<BaseCategoryProps[]>({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}attendees?user_id=${userId}`,
        headers: {},
    });

    const { data: eventData } = useGetEventAllQuery();

    return (
        <FetchEventContext.Provider
            value={{
                event:
                    eventData?.getEventAll.map((datum) => ({
                        id: datum.id,
                        userId: datum.userId,
                        categoryId: datum.categoryId,
                        name: datum.name,
                        location: datum.location,
                        detail: datum.detail,
                        begin: datum.begin as Date,
                        end: datum.end as Date,
                        isTemporary: datum.isTemporary,
                        lastUpdate: datum.lastUpdate as Date,
                        createdDate: datum.createdDate as Date,
                    })) ?? [],
                category,
                attendee,
            }}
        >
            {children}
        </FetchEventContext.Provider>
    );
};
