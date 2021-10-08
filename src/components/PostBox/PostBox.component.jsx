import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import avatarImg from "../../assets/images/avatar.png";
import axios from "axios";

import "./PostBox.style.css";

const PostBox = () => {
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [username, setUsername] = useState(sessionStorage.getItem("user"));

    const submitPost = (e) => {
        e.preventDefault();
        const post = {
            username: username,
            body: body
        };
        console.log(post);
        const headerConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        };
        axios.post("http://127.0.0.1:8000/post/", {
            ...post
        }, {
            ...headerConfig
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        setBody("");
    }

    return (
        <div className="postBox">
            <form>
                <div className="postBox__input">
                    <Avatar src={ avatarImg } alt="" />
                    <div>
                        <input type="text" placeholder="What's new?" value={body} onChange={(e) => setBody(e.target.value)} size="50" />
                        {/* <input type="text" placeholder="Add tags (space separated, starting with #)" value={tags} onChange={(e) => setTags(e.target.value)} /> */}
                    </div>
                </div>
                {/* <input className="postBox__imageInput" type="text" placeholder="Enter image URL" /> */}
                <Button variant="contained" onClick={(e) => submitPost(e)}>Post!</Button>
            </form>
        </div>
    );
}

export default PostBox;