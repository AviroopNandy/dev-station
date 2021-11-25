import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar.component";
import Landing from "./components/Landing/Landing.component";
import Login from "./components/Login/Login.component";
import Register from "./components/Register/Register.component";
import Devs from "./components/Devs/Devs.component";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.component";
import Home from "./components/Home/Home.component";
import Explore from "./components/Explore/Explore.component";
import Profile from "./components/Profile/Profile.component";
import Requests from "./components/Requests/Requests.component";
import RightSidebar from "./components/RightSidebar/RightSidebar.component";

import "./App.css";

function App() {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // sessionStorage.setItem("user", "john123");
        if(user) {
            setIsLoggedIn(true);
            const headerConfig = {
                headers: {
                    "Content-Type": "Application/json",
                }
            };
            axios.get(`https://devdevss.herokuapp.com/user/${user}/details`, {
                ...headerConfig
            })
            .then(res => {
                sessionStorage.setItem("userId", res.data._id);
            })
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
                                    <LeftSidebar home={true} explore={false} profile={false} requests={false} />
                                    <Home />
                                    <RightSidebar />
                                </div>
                            </Route>
                            <Route path="/explore">
                                <div className="app__home">
                                    <LeftSidebar home={false} explore={true} profile={false} requests={false} />
                                    <Explore />
                                    <RightSidebar />
                                </div>
                            </Route>
                            <Route path="/profile">
                                <div className="app__home">
                                    <LeftSidebar home={false} explore={false} profile={true} requests={false} />
                                    <Profile />
                                    <RightSidebar />
                                </div>
                            </Route>
                            <Route path="/requests">
                                <div className="app__home">
                                    <LeftSidebar home={false} explore={false} profile={false} requests={true} />
                                    <Requests />
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
                            {/* <Route path="/devs">
                                <Navbar />
                                <Devs />
                            </Route> */}
                        </>
                    ) }
                </Switch>
            </Router>
        </div>
    );
}

export default App;