import React, { createContext } from "react";
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
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}events`,
        headers: {},
    });

    const category = useFetch<BaseCategoryProps[]>({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}categories`,
        headers: {},
    });

    const attendee = useFetch<BaseAttendeeProps[]>({
        initialUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT!}attendees?user_id=${userId}`,
        headers: {},
    });

    return (
        <FetchEventContext.Provider value={{ event, category, attendee }}>
            {children}
        </FetchEventContext.Provider>
    );
};
