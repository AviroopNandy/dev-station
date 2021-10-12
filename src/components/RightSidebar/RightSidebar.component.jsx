import axios from "axios";
import React, { useEffect, useState } from "react";

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
            {/* <h2>Right Side Bar</h2> */}
            <div className="rightSidebar__profile">
                {user}'s Profile Card here
                <br />
                {userDetails ? (
                    <>
                        Followers: {userDetails.followers_count}
                        <br />
                        Following: {userDetails.following_count}
                        <br />
                        Posts: {userDetails.posts_id.length}
                    </>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default RightSidebar;