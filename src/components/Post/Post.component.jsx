import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import avatarImg from "../../assets/images/avatar.png";
import sampleImg from "../../assets/images/login_image.jpg";
import axios from "axios";

import "./Post.style.css";

const Post = ({ username, body, timeAdded, deletePost, followUser }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));

    const followUserHandler = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        };
        axios.post(`http://127.0.0.1:8000/user/${user}/follow/${username}`, {
            ...headerConfig
        })
        .then(res => {
            alert("User followed successfully!")
        })
        .catch(error => {
            alert(error);
        });
    }

    const deletePostHandler = () => {
        const returnValue = window.confirm(`Are you sure you want to delete this post? Once deleted, the process cannot be undone. Click "OK" to delete this post`);
        if(returnValue === true) {
            console.log("Post Deleted");
            // const 
        }
    }
    return (
        <div className="post">
            {/* <div className="post__author"> */}
            <div className="post__avatar">
                <Avatar src={ avatarImg } alt="" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            { username }
                            <span className="post__headerSpecial">
                                <VerifiedUserIcon className="post__badge" titleAccess="This user is verified" />
                            </span>
                            <div className="post__timeAdded">
                                { timeAdded }
                            </div>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{ body }</p>
                        {/* <p>#lorem #ipsum #dolor #sit #amet #consectetur #adipisicing #elit #Obcaecati</p> */}
                    </div>
                </div>
                {/* <img src={ sampleImg } alt="" /> */}
                <div className="post__footer">
                    <div className="like">
                        <FavoriteBorderIcon fontSize="small" className="post__footerOption" titleAccess="Like Post" /><span>5</span>
                    </div>
                    <div className="comment">
                        <ChatBubbleIcon fontSize="small" className="post__footerOption" titleAccess="Add Comment" /><span>8</span>
                    </div>
                    { followUser ? (
                        user === username ? (
                            null
                        ) : (
                            <div className="follow">
                                <PersonAddIcon fontSize="small" className="post__footerOption" titleAccess={`Follow ${username}`} onClick={() => followUserHandler()} /><span></span>
                            </div>
                        )
                    ) : (
                        null
                    ) }
                    { deletePost ? (
                        <div className="delete">
                            <DeleteIcon fontSize="small" className="post__footerOption" titleAccess="Delete Post" onClick={() => deletePostHandler()} /><span></span>
                        </div>
                    ) : (
                        null
                    ) }
                </div>
            </div>
        </div>
    );
}

export default Post;