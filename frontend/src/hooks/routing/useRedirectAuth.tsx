import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { pagesPath } from "../../utils/$path";

// if session data does not exist, redirect to sign in page.
export const useRedirectAuth = (path?: string) => {
    const { push } = useRouter();
    const { data, status } = useSession();

    React.useEffect(() => {
        if (!data) {
            void push(path ?? pagesPath.signin.$url().pathname);
        }
    }, []);
};
