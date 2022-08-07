import { DefaultSession } from "next-auth";

// ref: https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            userId: string;
            admin: boolean;
        } & DefaultSession["user"];
    }
}
