import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import avatarImg from "../../assets/images/avatar.png";
import axios from "axios";

import "./PostBox.style.css";

const PostBox = () => {
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [tagsArr, setTagsArr] = useState([]);
    const [showTags, setShowTags] = useState(false);
    const [username, setUsername] = useState(sessionStorage.getItem("user"));

    const extractTags = async (e) => {
        e.preventDefault();
        // console.log(tags);
        await tags.split(" ");
        console.log(typeof tags);
    }

    const submitPost = (e) => {
        e.preventDefault();
        // for (var tag in tags.split(" ")) {
        //     console.log(tags[tag]);
        // }
        setTagsArr(tags.split(" "));
        // console.log("Tags: ", tags);
        const post = {
            username: username,
            body: body,
            tags: tagsArr
        };
        // console.log(post);
        const headerConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        };
        axios.post("https://devdevss.herokuapp.com/post/", {
            ...post
        }, {
            ...headerConfig
        })
        .then(res => {
            alert("Post created successfully!");
        })
        .catch(err => {
            alert(err);
            console.log(tags);
            console.log(post);
        });
        setBody("");
        setTags("");
    }

    return (
        <div className="postBox">
            <form>
                <div className="postBox__input">
                    <Avatar src={ avatarImg } alt="" />
                    <div>
                        <input type="text"
                            placeholder="What's new?"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            size="50"
                            onClick={() => setShowTags(!showTags)}
                        />
                        { showTags ? (
                            <input type="text"
                                placeholder="Add tags (space separated, starting with #)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        ) : (null) }
                    </div>
                </div>
                {/* <input className="postBox__imageInput" type="text" placeholder="Enter image URL" /> */}
                <Button variant="contained" onClick={(e) => submitPost(e)}>Post!</Button>
            </form>
        </div>
    );
}

export default PostBox;