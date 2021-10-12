import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";

import "./RightSidebar.style.css";

const RightSidebar = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.get(`https://devdevss.herokuapp.com/user/${user}`, {
            ...headerConfig
        })
        .then(res => {
            setUserDetails(res.data);
        })
        .catch(error => {
            alert(error);
        });
    }, [userDetails]);

    return (
        <div className="rightSidebar">
            <div className="rightSidebar__card">
                <h2>People to follow</h2>
                <br />
                {userDetails ? (
                    <>
                    <div className="rightSidebar__user">
                        <div className="rightSidebar__follow">
                            <p>Aviroop Nandy @aviroop_nandy</p>
                            <Button variant="contained">Follow</Button>
                        </div>
                        <div className="rightSidebar__desc">
                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                        </div>
                    </div>
                    <div className="rightSidebar__user">
                        <div className="rightSidebar__follow">
                            <p>Aviroop Nandy @aviroop_nandy</p>
                            <Button variant="contained">Follow</Button>
                        </div>
                        <div className="rightSidebar__desc">
                            <p>10 followers, 8 following, 5 posts</p>
                        </div>
                    </div>
                    <div className="rightSidebar__user">
                        <div className="rightSidebar__follow">
                            <p>Aviroop Nandy @aviroop_nandy</p>
                            <Button variant="contained">Follow</Button>
                        </div>
                        <div className="rightSidebar__desc">
                            <p>10 followers, 8 following, 5 posts</p>
                        </div>
                    </div>
                    <div className="rightSidebar__user">
                        <div className="rightSidebar__follow">
                            <p>Aviroop Nandy @aviroop_nandy</p>
                            <Button variant="contained">Follow</Button>
                        </div>
                        <div className="rightSidebar__desc">
                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                        </div>
                    </div>
                    <div className="rightSidebar__user">
                        <div className="rightSidebar__follow">
                            <p>Aviroop Nandy @aviroop_nandy</p>
                            <Button variant="contained">Follow</Button>
                        </div>
                        <div className="rightSidebar__desc">
                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                        </div>
                    </div>
                    </>
                ) : (
                    <div className="loading">
                        <CircularProgress className="loader" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RightSidebar;