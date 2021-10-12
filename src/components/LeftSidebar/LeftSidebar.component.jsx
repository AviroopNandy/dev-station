import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LeftSidebarOption from "./LeftSidebarOption";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import { Button } from "@material-ui/core";

import "./LeftSidebar.style.css";

const LeftSidebar = ({ home, explore, profile }) => {
    const [isActiveHome, setIsActiveHome] = useState(home);
    const [isActiveExplore, setIsActiveExplore] = useState(explore);
    const [isActiveProfile, setIsActiveProfile] = useState(profile);

    const history = useHistory();

    const changeActiveStatusHome = () => {
        setIsActiveHome(true);
        setIsActiveExplore(false);
        setIsActiveProfile(false);
        history.push("/");
    }

    const changeActiveStatusExplore = () => {
        setIsActiveHome(false);
        setIsActiveExplore(true);
        setIsActiveProfile(false);
        history.push("/explore");
    }

    const changeActiveStatusProfile = () => {
        setIsActiveHome(false);
        setIsActiveExplore(false);
        setIsActiveProfile(true);
        history.push("/profile");
    }

    const logoutUser = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        history.push("/");
        window.location.reload();
    }
    
    return (
        <div className="leftSidebar">
            <h3 className="leftSidebar__logo">DevStation</h3>
            <div onClick={() => changeActiveStatusHome() }>
                <LeftSidebarOption title="Home" Icon={ HomeIcon } active={isActiveHome} />
            </div>
            <div onClick={() => changeActiveStatusExplore() }>
                <LeftSidebarOption title="Explore" Icon={ SearchIcon } active={isActiveExplore} />
            </div>
            <div onClick={() => changeActiveStatusProfile() }>
                <LeftSidebarOption title="Profile" Icon={ PersonIcon } active={isActiveProfile} />
            </div>
            <Button variant="contained" fullWidth onClick={(e) => logoutUser(e)}>Logout</Button>
        </div>
    );
}

export default LeftSidebar;