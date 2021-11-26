import axios from "axios";
import { Redirect } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { DevStationConsumer, DevStationContext } from "../../helpers/Context";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Profile from "../Profile/Profile.component";

import "./RightSidebar.style.css";

const RightSidebar = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [activeUsers, setActiveUsers] = useState([{
        firstName: "",
        lastName: "",
        username: "",
        followers: 0,
        following: 0,
        posts: 0
    }]);
    const [top3Users, setTop3Users] = useState([{
        firstName: "",
        lastName: "",
        username: "",
        followers: 0,
        following: 0,
        posts: 0
    }]);

    useEffect(() => {
        setTop3Users([]);
        setActiveUsers([]);
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get("https://devdevss.herokuapp.com/user/users/active", {
            ...headerConfig
        })
        .then(res => {
            res.data.forEach(user => {
                setActiveUsers(activeUsers => [...activeUsers, {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                    followers: user.followers_count,
                    following: user.following_count,
                    posts: user.posts_id.length
                }])
            })
        })
        .catch(error => {
            alert(error);
        });
        axios.get("https://devdevss.herokuapp.com/user/users/top3", {
            ...headerConfig
        })
        .then(res => {
            res.data.forEach(user => {
                setTop3Users(top3Users => [...top3Users, {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                    followers: user.followers_count,
                    following: user.following_count,
                    posts: user.posts_id.length
                }]);
            });
        });
    }, []);

    const showUserProfile = (username) => {
        return (
            <Redirect to="/profile">
                <Profile username={username} view={true} />
            </Redirect>
        )
    }

    const followUserHandler = (username) => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.post(`https://devdevss.herokuapp.com/user/${user}/follow/${username}`, {
            ...headerConfig
        })
        .then(res => {
            alert("User followed successfully!");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <DevStationConsumer>
            {value => {
                // const { top3Users } = value;
                return (
                    <div className="rightSidebar">
                        <div className="rightSidebar__card">
                            <h2>People Active Now</h2>
                            <br />
                            { activeUsers.length > 0 ? (
                                <>
                                    { activeUsers.map(({firstName, lastName, username, followers, following, posts}) => (
                                        <div key={username}>
                                            <div className="rightSidebar__user">
                                                <div className="rightSidebar__follow">
                                                    <p onClick={() => showUserProfile(username)}>{firstName} {lastName} @{username}</p>
                                                    { user === username ? (
                                                        null
                                                    ) : (
                                                        <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow ${username}`} onClick={() => followUserHandler(username)} />
                                                    ) }
                                                </div>
                                                <div className="rightSidebar__desc">
                                                    <p><b>{followers}</b> followers, <b>{following}</b> following, <b>{posts}</b> posts</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) }
                                </>
                            ) : (
                                <div className="loading">
                                    <CircularProgress className="loader" />
                                </div>
                            ) }
                        </div>
                        <div className="rightSidebar__card top3card">
                            <h2>People To Follow</h2>
                            <br />
                            { top3Users.length > 0 ? (
                                <>
                                    { top3Users.map(({firstName, lastName, username, followers, following, posts}) => (
                                        <div key={username}>
                                            <div className="rightSidebar__user">
                                                <div className="rightSidebar__follow">
                                                    <p>{firstName} {lastName} @{username}</p>
                                                    { user === username ? (
                                                        null
                                                    ) : (
                                                        <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow ${username}`} onClick={() => followUserHandler(username)} />
                                                    ) }
                                                </div>
                                                <div className="rightSidebar__desc">
                                                    <p><b>{followers}</b> followers, <b>{following}</b> following, <b>{posts}</b> posts</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) }
                                </>
                            ) : (
                                <div className="loading">
                                    <CircularProgress className="loader" />
                                </div>
                            ) }
                        </div>
                    </div>
                )
            } }
        </DevStationConsumer>
    )
}

export default RightSidebar;