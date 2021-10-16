import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";

import "./Profile.style.css";

const Profile = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const { getAllUserPosts } = useContext(DevStationContext);

    useEffect(() => {
        getAllUserPosts();
    }, []);

    return (
        <DevStationConsumer>
            { value => {
                const { allUserPosts } = value;
                console.log("All User Posts: ", allUserPosts);
                return(
                    <div className="profile">
                        <div className="profile__header">
                            <h2>Profile</h2>
                            { user ? (
                                <h3>@{user}</h3>
                            ) : (
                                null
                            ) }
                        </div>
                        { allUserPosts ? (
                            <div>
                                { allUserPosts.map((post, id) => (
                                    <Post username={post.username} body={post.body} key={id} deletePost={true} />
                                ))}
                            </div>
                        ) : (
                            null
                        ) }
                    </div>
                )
            }}
        </DevStationConsumer>
    )
}

export default Profile;