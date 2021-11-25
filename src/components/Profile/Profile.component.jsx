import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.component";
import About from "./About/About.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";
import { CircularProgress } from "@material-ui/core";

import "./Profile.style.css";

const Profile = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const { getAllUserPosts } = useContext(DevStationContext);

    useEffect(() => {
        setUser(sessionStorage.getItem("user"));
        getAllUserPosts();
    }, []);

    return (
        <DevStationConsumer>
            {value => {
                const { allUserPosts } = value;
                console.log("All User Posts: ", allUserPosts);
                return (
                    <div className="profile">
                        <div className="profile__header">
                            <h2>Profile</h2>
                            { user ? (
                                <h3>@{user}</h3>
                            ) : (
                                null
                            ) }
                        </div>
                        <About />
                        {allUserPosts ? (
                            <div>
                                {allUserPosts.map((post, id) => (
                                    <Post
                                        username={post.username}
                                        body={post.body}
                                        key={id}
                                        id={post._id}
                                        likesCount={post.likes}
                                        allTags={post.tags}
                                        deletePost={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="loading">
                                <CircularProgress className="loader" />
                            </div>
                        )}
                    </div>
                )
            }}
        </DevStationConsumer>
    )
}

export default Profile;