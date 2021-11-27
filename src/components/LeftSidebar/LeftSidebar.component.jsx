import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "@material-ui/core";
import LeftSidebarOption from "./LeftSidebarOption";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import MessageIcon from "@material-ui/icons/MessageOutlined";
import { Button } from "@material-ui/core";
import RequestBox from "../RequestBox/RequestBox.component";
import axios from "axios";

import "./LeftSidebar.style.css";

const LeftSidebar = ({ home, explore, profile, requests }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [isActiveHome, setIsActiveHome] = useState(home);
    const [isActiveExplore, setIsActiveExplore] = useState(explore);
    const [isActiveProfile, setIsActiveProfile] = useState(profile);
    const [isActiveRequests, setIsActiveRequests] = useState(requests);
    const [showRequests, setShowRequests] = useState(false);

    const history = useHistory();

    const changeActiveStatusHome = () => {
        setIsActiveHome(true);
        setIsActiveExplore(false);
        setIsActiveProfile(false);
        setIsActiveRequests(false);
        history.push("/");
    }

    const changeActiveStatusExplore = () => {
        setIsActiveHome(false);
        setIsActiveExplore(true);
        setIsActiveProfile(false);
        setIsActiveRequests(false);
        history.push("/explore");
    }

    const changeActiveStatusProfile = () => {
        setIsActiveHome(false);
        setIsActiveExplore(false);
        setIsActiveProfile(true);
        setIsActiveRequests(false);
        history.push("/profile");
    }

    const changeActiveStatusRequests = () => {
        setIsActiveHome(false);
        setIsActiveExplore(false);
        setIsActiveProfile(false);
        setIsActiveRequests(true);
        history.push("/requests");
    }

    const logoutUser = (e) => {
        e.preventDefault();
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.post(`http://0.0.0.0:8000/user/logout?username=${user}`, {
            ...headerConfig
        })
        .then(res => {
            sessionStorage.clear();
            history.push("/");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        });
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
            <div onClick={() => changeActiveStatusRequests() }>
                <LeftSidebarOption title="Requests" Icon={ MessageIcon } active={isActiveRequests} />
            </div>
            <Button variant="contained" fullWidth onClick={() => setShowRequests(!showRequests)}>Request</Button>
            { showRequests ? (
                <Modal
                    open={showRequests}
                    onClose={() => setShowRequests(false)}
                >
                    <RequestBox />
                </Modal>
            ) : (
                null
            )}
            <Button variant="contained" className="leftSidebar__logout" fullWidth onClick={(e) => logoutUser(e)}>Logout</Button>
        </div>
    );
}

export default LeftSidebar;