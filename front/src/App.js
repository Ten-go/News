import React, {Fragment} from "react";
import { BrowserRouter as Router,  Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import useAuth from './hook'

import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import SavedNews from "./pages/SavedNews";
import Create from "./pages/Create";
import Change from "./pages/Change";
import Nav from "./components/Nav";

const loader = (<div className="container">
                    <div className="progress">
                        <div className="indeterminate">
                        </div>
                    </div>
                </div>)

export default function App(props) {
    const {auth, login, logout, ready} = useAuth()

    if (!ready) return(loader)
    return (
        <Router>
        {(auth)?
            <Fragment>
                <Nav logout={logout}/>
                <Switch>
                    <Route exact path="/news"><NewsList loader={loader} auth={auth}/></Route>
                    <Route exact path="/saved"><SavedNews loader={loader} auth={auth}/></Route>
                    <Route exact path="/create"><Create auth={auth}/></Route>
                    <Route path="/change/:id"><Change auth={auth} loader={loader} /></Route>
                    <Redirect to="/news"/>
                </Switch>
            </Fragment>
            :
            <Switch>
                <Route exact path="/login"><Login login={login} /></Route>
                <Redirect to="/login"/>
            </Switch>
        }
        </Router>
    )
}