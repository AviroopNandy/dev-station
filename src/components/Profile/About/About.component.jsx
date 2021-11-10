import React, { useState } from "react";
import avatarImg from "../../../assets/images/avatar.png";
import { Avatar, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import "./About.style.css";

const About = () => {
    const [username, setUsername] = useState(sessionStorage.getItem("user"));
    return (
        <div className="about">
            <div className="about__header">
                <div className="about__image">
                    <Avatar src={avatarImg} alt="" style={{ height: "100px", width: "100px" }} />
                </div>
                <div className="about__details">
                    <div className="about__info">
                        <span className="about__name">Aviroop Nandy</span><br />
                        <span className="about__username">@{username}</span>
                    </div>
                    <div className="about__edit">
                        <Button variant="contained">Edit Profile</Button>
                        {/* <EditOutlinedIcon /> */}
                    </div>
                </div>
            </div>
            <div className="about__stats">
                <div className="about__posts">
                    <span className="about__stat">Posts</span><br />
                    <span className="about__statCount">25</span>
                </div>
                <div className="about__followers">
                    <span className="about__stat">Followers</span><br />
                    <span className="about__statCount">600</span>
                </div>
                <div className="about__following">
                    <span className="about__stat">Following</span><br />
                    <span className="about__statCount">1000</span>
                </div>
            </div>
        </div>
    )
}

export default About;