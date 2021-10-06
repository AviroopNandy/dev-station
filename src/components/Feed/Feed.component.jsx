import React, { useContext, useEffect } from "react";
import PostBox from "../PostBox/PostBox.component";
import Post from "../Post/Post.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";

import "./Feed.style.css";

const Feed = () => {
    const { getAllPosts } = useContext(DevStationContext);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        <DevStationConsumer>
            { value => {
                const { allPosts } = value;
                console.log("All Posts: ", allPosts[0]);
                return(
                    <div className="feed">
                        <div className="feed__header">
                            <h2>Home</h2>
                        </div>
                        <PostBox />
                        { allPosts.length ? (
                            <div>
                                { allPosts.map((post, id) => (
                                    <Post username={post.username} body={post.body} key={id} />
                                ))}
                            </div>
                        ) : (
                            null
                        ) }
                    </div>
                )
            }}
        </DevStationConsumer>
    );
}

export default Feed;