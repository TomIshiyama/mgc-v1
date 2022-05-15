import React, { createContext } from "react";
import { Anchor, TemporaryDrawerStateType } from "../components/common/TemporaryDrawer";
import { ContentModeType } from "../components/event/EventDetailDrawer";
import { useDrawer } from "../hooks/components/useDrawer";

/**
 * @param state 上下左右どこにDrawerを表示するか
 * @param toggleDrawer イベントハンドラを含めた開閉を制御する関数
 * @param doToggleDrawer 開閉を制御する関数
 * @param mode イベント詳細Drawerの表示モード
 * @param setMode 表示モードをセットする
 * @param key 本アプリでは表示するイベント詳細Drawerで表示するEventIDを指す
 * @param setKey EventIDをセットする
 */
export const DetailDrawerContext = createContext<{
    state: TemporaryDrawerStateType;
    toggleDrawer?: (
        anchor: Anchor,
        open: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    doToggleDrawer?: (anchor: Anchor, open: boolean) => void;
    mode?: ContentModeType;
    setMode?: React.Dispatch<React.SetStateAction<ContentModeType>>;
    key?: React.Key;
    setKey?: React.Dispatch<React.SetStateAction<React.Key | undefined>>;
}>({
    state: {
        right: false,
        top: false,
        left: false,
        bottom: false,
    },
});

/** イベント詳細のDrawerのステートを配布する */
export const DetailDrawerProvider = ({ children }) => {
    const { state, toggleDrawer, doToggleDrawer } = useDrawer(false);
    const [mode, setMode] = React.useState<ContentModeType>("top");
    const [key, setKey] = React.useState<React.Key | undefined>(undefined);

    return (
        <DetailDrawerContext.Provider
            value={{ state, toggleDrawer, doToggleDrawer, mode, setMode, key, setKey }}
        >
            {children}
        </DetailDrawerContext.Provider>
    );
};
