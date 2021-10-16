import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";

import "./Explore.style.css";

const Explore = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const { getAllPosts } = useContext(DevStationContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <DevStationConsumer>
            { value => {
                const { allPosts } = value;
                return(
                    <div className="explore">
                        <div className="explore__header">
                            <h2>Explore</h2>
                            { user ? (
                                <h3>@{user}</h3>
                            ) : (
                                null
                            ) }
                        </div>
                        { allPosts ? (
                            <div>
                                { allPosts.map((post, id) => (
                                    <Post username={post.username} body={post.body} key={id} followUser={true} />
                                )) }
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

export default Explore;