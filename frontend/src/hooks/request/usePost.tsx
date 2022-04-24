import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Params {
    [key: string]: any;
}

interface Args<T, V> {
    url?: string;
    params?: V;
    body?: V;
    method?: Method;
    onSuccess?: (data?: T) => void;
    onError?: (err: AxiosError) => void;
}

interface PostRequest<V> {
    method?: Method;
    url?: string;
    params?: V;
    body?: V;
    headers?: AxiosRequestConfig["headers"];
}

type DoPost<T, V = Params> = ({ url, params }: Args<T, V>) => Promise<void>;

interface PostResponse<T, V> {
    doPost: DoPost<T, V>;
    loading: boolean;
}

export function usePost<T, V = Params>({
    method = "post",
    url,
    params,
    headers,
}: PostRequest<V>): PostResponse<T, V> {
    const methodInternal = useMemo(() => method, [method]);
    const urlInternal = useMemo(() => url, [url]);
    const paramsInternal = useMemo(() => params, [params]);
    const [loading, setLoading] = useState(false);
    const doPost = useCallback<DoPost<T, V>>(
        async <T,>(args: Args<T, V>) => {
            const reqUrl = args.url ?? urlInternal ?? "";
            if (!reqUrl) {
                return;
            }
            if (!methodInternal) {
                return;
            }
            try {
                setLoading(true);
                const res: AxiosResponse<T> = await axios.request({
                    method: args?.method ?? methodInternal,
                    url: reqUrl,
                    data: args?.params ?? paramsInternal ?? undefined,
                    headers,
                });
                args.onSuccess?.(res.data);
            } catch (err) {
                args.onError?.(err as AxiosError);
            } finally {
                setLoading(false);
            }
        },
        [headers, methodInternal, paramsInternal, urlInternal]
    );

    const clear = useCallback(() => {
        setLoading(false);
    }, []);

    useEffect(() => () => clear(), [clear]);

    return {
        doPost,
        loading,
    };
}
