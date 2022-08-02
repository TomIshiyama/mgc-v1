import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { pagesPath } from "../../utils/$path";

export const useRedirectOwner = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { userId } = router.query as { userId: string };

    React.useEffect(() => {
        if (status === "unauthenticated") {
            void router.replace(pagesPath.signin.$url());
        }
        if (session?.user?.userId !== Number(userId)) {
            void router.replace(pagesPath.error.forbidden.$url());
        }
    }, []);
};
