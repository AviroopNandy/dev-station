import React from "react";
import LeftSidebarOption from "./LeftSidebarOption";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";

import "./LeftSidebar.style.css";

const LeftSidebar = () => {
    return (
        <div className="leftSidebar">
            {/* <TwitterIcon className="leftSidebar__logo" /> */}
            <h3 className="leftSidebar__logo">DevStation</h3>
            <LeftSidebarOption title="Home" Icon={ HomeIcon } active />
            <LeftSidebarOption title="Explore" Icon={ SearchIcon } />
            <LeftSidebarOption title="Profile" Icon={ PersonIcon } />
            <Button variant="contained" fullWidth>Logout</Button>
        </div>
    );
}

export default LeftSidebar;