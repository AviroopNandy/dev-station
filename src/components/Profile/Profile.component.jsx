import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.component";
import About from "./About/About.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";
import { CircularProgress } from "@material-ui/core";

import "./Profile.style.css";

const Profile = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const { getAllUserPosts, viewUserMode, changeViewUserMode } = useContext(DevStationContext);

    useEffect(() => {
        // changeViewUserMode(false);
        if(!viewUserMode) {
            getAllUserPosts();
        }
    }, []);

    return (
        <DevStationConsumer>
            {value => {
                const { allUserPosts, viewUserMode, viewUsername } = value;
                console.log(viewUsername);
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
                        { viewUserMode ? (
                            <About viewUserMode={viewUserMode} username={viewUsername} />
                        ) : (
                            <About viewUserMode={viewUserMode} username={user} />
                        ) }
                        { allUserPosts ? (
                            // {allUserPosts.length > 0 ? (
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
                                {/* <CircularProgress className="loader" /> */}
                                <h4>Your posts will show here. Create your first post from the home page</h4>
                            </div>
                        ) }
                    </div>
                )
            }}
        </DevStationConsumer>
    )
}

export default Profile;