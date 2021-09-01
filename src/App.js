import React from "react";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar.component";
import Feed from "./components/Feed/Feed.component";
import RightSidebar from "./components/RightSidebar/RightSidebar.component";

import "./App.css";

function App() {
    return(
        <div className="app">
            <LeftSidebar />
            <Feed />
            <RightSidebar />
        </div>
    );
}

export default App;