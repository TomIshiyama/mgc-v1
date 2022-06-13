// eslint-disable-next-line import/named
import * as React from "react";

// FIXME: ログインのスタイルを当てる
export const SignInLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main>{children}</main>;
};
