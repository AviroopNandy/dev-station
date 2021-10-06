import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.component";
import Landing from "./components/Landing/Landing.component";
import Devs from "./components/Devs/Devs.component";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.component";
import Feed from "./components/Feed/Feed.component";
import RightSidebar from "./components/RightSidebar/RightSidebar.component";

import "./App.css";

function App() {
    return(
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route path="/devs">
                        <Navbar />
                        <Devs />
                    </Route>
                    <Route path="/home">
                        <div className="app__home">
                            <LeftSidebar />
                            <Feed />
                            <RightSidebar />
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;