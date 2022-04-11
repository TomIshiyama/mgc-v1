import React, { createContext } from "react";
import { useFetch, UseFetchResponse } from "../hooks/request/useFetch";
import { BaseCategoryProps, BaseEventProps } from "../types/connection";

export const FetchEventContext = createContext<{
    event: UseFetchResponse<BaseEventProps[]> | undefined;
    category: UseFetchResponse<BaseCategoryProps[]> | undefined;
}>({ event: undefined, category: undefined });

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

    return (
        <FetchEventContext.Provider value={{ event, category }}>
            {children}
        </FetchEventContext.Provider>
    );
};
