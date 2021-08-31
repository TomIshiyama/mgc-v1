import { getSession } from "./routing"

const errorMessage = "ログインしてください。"

// TODO: Login/Logout 機能実装後 コメントを解除
const Auth = (props) =>
    !(getSession() === null || getSession() === "")
        ? props.children
        : props.children
// : <Redirect to={{
//   pathname: "/login",
//   // search:"error",
//   state: { errorMessage: errorMessage }
// }}/> ;

export default Auth
