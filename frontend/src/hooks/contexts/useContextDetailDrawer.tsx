import { useContext } from "react";
import { DetailDrawerContext } from "../../common/DetailDrawerProvider";

/**
 * DetailDrawerContextを内部で呼び出しHooksとして提供するカスタムフック
 * @param state 上下左右どこにDrawerを表示するか
 * @param toggleDrawer イベントハンドラを含めた開閉を制御する関数
 * @param doToggleDrawer 開閉を制御する関数
 * @param mode イベント詳細Drawerの表示モード
 * @param setMode 表示モードをセットする
 * @param key 本アプリでは表示するイベント詳細Drawerで表示するEventIDを指す
 * @param setKey EventIDをセットする
 */
export const useContextDetailDrawer = () => {
    const detailDrawer = useContext(DetailDrawerContext);

    if (detailDrawer === null)
        throw new Error("detailDrawerProvider でラップしてください。");

    const { state, toggleDrawer, doToggleDrawer, mode, setMode, key, setKey } =
        detailDrawer;
    return {
        state,
        toggleDrawer: toggleDrawer!,
        doToggleDrawer: doToggleDrawer!,
        mode,
        setMode,
        key,
        setKey,
    };
};
