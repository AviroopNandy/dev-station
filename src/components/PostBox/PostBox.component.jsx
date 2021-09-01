import React from "react";
import { Avatar, Button } from "@material-ui/core";
import avatarImg from "../../assets/images/avatar.png";

import "./PostBox.style.css";

const PostBox = () => {
    return (
        <div className="postBox">
            <form>
                <div className="postBox__input">
                    <Avatar src={ avatarImg } alt="" />
                    <input type="text" placeholder="What's new?" />
                </div>
                {/* <input className="postBox__imageInput" type="text" placeholder="Enter image URL" /> */}
                <Button variant="contained">Post!</Button>
            </form>
        </div>
    );
}

export default PostBox;