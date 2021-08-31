import { BrowserRouter, Route, Switch } from "react-router-dom"
import SideBar from "./components/templates/SideBar"
import { Events, Home, Login, Setting, Signup, User } from "./pages"
import Auth from "./utils/Auth"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />

                <Auth>
                    <SideBar />
                    <Switch>
                        <Route exact path="/setting" component={Setting} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/users" component={User} />
                        <Route exact path="/events" component={Events} />

                        {/* TODO: Admin User のみ遷移可能にする */}
                        {/* <Route exact path="/admin" component={Admin} /> */}
                        {/* <Route exact path='/getDetail/:cd' component={GetDetail} /> */}
                    </Switch>
                </Auth>
            </Switch>
        </BrowserRouter>
    )
}

export default App
