import React, { useEffect, useState, useContext } from "react";
import avatarImg from "../../../assets/images/avatar.png";
import { Avatar, Button } from "@material-ui/core";
import { DevStationContext, DevStationConsumer } from "../../../helpers/Context";

import "./About.style.css";

const About = () => {
    const [username, setUsername] = useState(sessionStorage.getItem("user"));
    const { getUserAbout } = useContext(DevStationContext);

    useEffect(() => {
        getUserAbout(username);
    }, []);
    return (
        <DevStationConsumer>
            { value => {
                const { userAbout } = value;
                return (
                    <div className="about">
                        <div className="about__header">
                            <div className="about__image">
                                <Avatar src={avatarImg} alt="" style={{ height: "100px", width: "100px" }} />
                            </div>
                            <div className="about__details">
                                <div className="about__info">
                                    <span className="about__name">{ userAbout.firstName } { userAbout.lastName }</span><br />
                                    <span className="about__username">@{username}</span>
                                </div>
                                <div className="about__edit">
                                    <Button variant="contained">Edit Profile</Button>
                                </div>
                            </div>
                        </div>
                        <div className="about__stats">
                            <div className="about__posts">
                                <span className="about__stat">Posts</span><br />
                                <span className="about__statCount">{ userAbout.posts }</span>
                            </div>
                            <div className="about__followers">
                                <span className="about__stat">Followers</span><br />
                                <span className="about__statCount">{ userAbout.followers }</span>
                            </div>
                            <div className="about__following">
                                <span className="about__stat">Following</span><br />
                                <span className="about__statCount">{ userAbout.following }</span>
                            </div>
                        </div>
                    </div>
                )
            } }
        </DevStationConsumer>
    )
}

export default About;