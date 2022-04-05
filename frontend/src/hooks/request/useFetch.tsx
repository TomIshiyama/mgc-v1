import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import React from "react";

export type UseFetchType = <T>(props: UseFetchProps<T>) => UseFetchResponse<T>;

export type UseFetchProps<T> = {
    initialUrl: string;
    initialData?: T;
    method?: "get" | "post";
    params?: Params;
    headers: AxiosRequestConfig["headers"];
    skip?: boolean;
    onSuccess?: (data?: T) => void;
    onError?: (err: any) => void; // TODO: 型定義
};

export type UseFetchResponse<T> = {
    data: T | null;
    // setUrl: Dispatch<SetStateAction<string>>
    url: string;
    error: Error | null;
    refetch: Refetch<T>;
    hasError: boolean;
    loading: boolean;
};

type Refetch<T> = ({ url, params }?: RefetchArgs<T>) => Promise<T | null>;

type RefetchArgs<T> = {
    url?: string;
    method?: Pick<Method, "get" & "post">;
    params?: Params;
    body?: Params;
    onSuccess?: (data?: T) => void;
    onError?: (err: AxiosError) => void;
};

type Params = {
    [key: string]: any;
};

export const useFetch: UseFetchType = <T,>({
    initialUrl,
    initialData,
    method = "get",
    params,
    headers,
    skip = false,
    onError,
}: UseFetchProps<T>) => {
    const [data, setData] = React.useState<T | null>(initialData ?? null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<AxiosError | null>(null);
    const [hasError, setHasError] = React.useState<boolean>(false);

    const url = React.useMemo(() => initialUrl, [initialUrl]);
    //   const [url, setUrl] = React.useState<string>(initialUrl);

    const refetch = React.useCallback<Refetch<T>>(
        async <T,>(args?: RefetchArgs<T>) => {
            try {
                setLoading(true);

                const axiosInstance = axios[method];
                const res = await axiosInstance(`${url}`, params, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        ...headers,
                    },
                });

                const data = res.data as T;
                setData(data as any);
                args?.onSuccess?.(data);
                return data;
            } catch (err) {
                onError?.(err);
                setError(err as AxiosError);
                setHasError(true);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [headers, url, method, onError, params]
    );

    const clear = React.useCallback(() => {
        setData(null);
        setLoading(false);
        setHasError(false);
        setError(null);
    }, []);

    React.useEffect(() => {
        if (skip) return;
        if (url) {
            const fetchData = async () => {
                setHasError(false);
                setLoading(true);

                const res = await refetch({});
                res && setData(res);

                setLoading(false);
            };

            void fetchData();
        }
    }, [url]);

    return {
        data,
        // setUrl,
        url,
        refetch,
        error,
        hasError,
        loading,
    };
};
