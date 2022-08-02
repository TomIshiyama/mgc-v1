import { ApolloClient, InMemoryCache } from "@apollo/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    LoginDocument,
    LoginMutation,
    LoginMutationVariables,
} from "../../../generated/graphql";
import { pagesPath } from "../../../utils/$path";
import { getPagePath } from "../../../utils/routing";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "email",
                },
                password: { label: "Password", type: "password" },
                userId: { label: "userId" },
                admin: {
                    label: "admin",
                },
            },
            authorize: async (credentials, req) => {
                // FIXME: apollo client 導入後実装
                // ここで Server sideと疎通

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("あかんやつやで");
                }

                const apolloClient = new ApolloClient({
                    uri: process.env.NEXT_PUBLIC_GQL_API_ENDPOINT,
                    cache: new InMemoryCache(),
                });
                const { data } = await apolloClient.mutate<
                    LoginMutation,
                    LoginMutationVariables
                >({
                    mutation: LoginDocument,
                    variables: {
                        params: {
                            email: credentials.email,
                            password: credentials.password,
                        },
                    },
                });
                // 突合したステータスと照合
                if (data?.login.userId) {
                    const { login } = data;
                    // ログイン成功後、ユーザー情報を返却する。値はsessionに格納される。
                    return Promise.resolve({
                        // name: "fixme_man",
                        userId: login.userId,
                        email: login.email,
                        admin: login.isAdmin,
                        // image: login.
                    });
                } else {
                    // ログイン失敗 認証を拒否
                    // エラーメッセージを返却する。
                    throw new Error("あかんやつやで");
                }

                // FIXME: 実装 APIのpostにて、ユーザーテーブルからログインユーザデータを取得してくる
                // 暫定的に環境変数の固定値でログインできるようにする
                // if (
                //     process.env.USER_EMAIL === credentials?.email &&
                //     process.env.USER_PASSWORD === credentials?.password
                // ) {
                //     return {
                //         name: "fixme_man",
                //         userId: "fixme",
                //         email: credentials?.email,
                //         admin: true,
                //     };
                // } else {
                //     // null を返却することでsignIn 関数でErrorが返却される。
                //     return null;
                // }
            },
        }),
    ],
    callbacks: {
        /*async*/ jwt({ token, user, account }) {
            // 最初のサインイン
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                    userId: user.userId,
                    admin: user.admin,
                    email: user.email,
                    // image: user.image,
                };
            }

            return token;
        },
        // セッションに含める情報
        /*async*/ session({ session, token }) {
            session.accessToken = token?.accessToken;
            session.refreshToken = token?.refreshToken;
            session.accessTokenExpires = token?.accessTokenExpires;
            session.user.userId = token?.userId as string;
            session.user.admin = token?.admin;
            session.user.email = token?.email;
            // session.user?.image = token?.picture;
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        async redirect({ url, baseUrl }) {
            // login 関連画面にはredirectさせないようにする
            if (
                url.includes(pagesPath.signup.$url().pathname) ||
                url.includes(pagesPath.signin.$url().pathname)
            ) {
                return getPagePath(pagesPath.top.$url().pathname);
            }

            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            } else if (new URL(url).origin === baseUrl) {
                return url;
            }
            return getPagePath(pagesPath.top.$url().pathname);
        },
    },
    // secret: process.env.NEXTAUTH_SECRET,
    secret: "L2WfW7/0aibY5g95TzBfH8tz/jL0tM4MEfP/4xsPPPA=",
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour
        updateAge: 0,
    },
    jwt: {
        maxAge: 60 * 60, // 1hours
    },
    // サインイン・サインアウトで飛ぶカスタムログインページを指定
    // サインアウト時に、”Are you sure you want to sign out?”と聞かれるページを挟むのをスキップする
    pages: {
        signIn: getPagePath(pagesPath.signin.$url().pathname),
        // signOut: pagesPath.signout.$url().pathname,
        error: getPagePath(pagesPath.signin.$url().pathname),
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
});
