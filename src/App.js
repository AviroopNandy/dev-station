import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import Landing from "./components/Landing/Landing.component";
import Login from "./components/Login/Login.component";
import Register from "./components/Register/Register.component";
import Devs from "./components/Devs/Devs.component";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.component";
import Home from "./components/Home/Home.component";
import Explore from "./components/Explore/Explore.component";
import Profile from "./components/Profile/Profile.component";
import RightSidebar from "./components/RightSidebar/RightSidebar.component";

import "./App.css";

function App() {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(user) {
            setIsLoggedIn(true);
        }
    }, []);

    return(
        <div className="app">
            <Router>
                <Switch>
                    { isLoggedIn ? (
                        <>
                            <Route exact path="/">
                                <div className="app__home">
                                    <LeftSidebar home={true} explore={false} profile={false} />
                                    <Home />
                                    <RightSidebar />
                                </div>
                            </Route>
                            <Route path="/explore">
                                <div className="app__home">
                                    <LeftSidebar home={false} explore={true} profile={false} />
                                    <Explore />
                                    <RightSidebar />
                                </div>
                            </Route>
                            <Route path="/profile">
                                <div className="app__home">
                                    <LeftSidebar home={false} explore={false} profile={true} />
                                    <Profile />
                                    <RightSidebar />
                                </div>
                            </Route>
                        </>
                    ) : (
                        <>
                            <Route exact path="/">
                                <Landing />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/devs">
                                <Navbar />
                                <Devs />
                            </Route>
                        </>
                    ) }
                </Switch>
            </Router>
        </div>
    );
}

export default App;