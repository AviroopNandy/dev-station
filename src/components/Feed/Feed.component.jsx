import React from "react";
import PostBox from "../PostBox/PostBox.component";
import Post from "../Post/Post.component";

import "./Feed.style.css";

const Feed = () => {
    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <PostBox />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Feed;