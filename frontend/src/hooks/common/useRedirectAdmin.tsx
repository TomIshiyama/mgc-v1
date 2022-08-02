import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { pagesPath } from "../../utils/$path";

export const useRedirectAdmin = () => {
    const { data: session } = useSession();
    const router = useRouter();

    React.useEffect(() => {
        if (!session) {
            void router.replace(pagesPath.signin.$url());
        }
        if (session?.user?.admin === false) {
            void router.replace(pagesPath.error.forbidden.$url());
        }
    }, []);
};
