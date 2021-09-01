import React from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import avatarImg from "../../assets/images/avatar.png";
import sampleImg from "../../assets/images/login_image.jpg";

import "./Post.style.css";

const Post = ({ displayName, username, verified, text, image, avatar}) => {
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
                            Aviroop Nandy
                            <span className="post__headerSpecial">
                                <VerifiedUserIcon className="post__badge" />
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, doloribus.</p>
                        <p>#lorem #ipsum #dolor #sit #amet #consectetur #adipisicing #elit #Obcaecati</p>
                    </div>
                </div>
                <img src={ sampleImg } alt="" />
                <div className="post__footer">
                    <div className="like">
                        <FavoriteBorderIcon fontSize="small" className="post__footerOption" /><span>5</span>
                    </div>
                    <div className="comment">
                        <ChatBubbleIcon fontSize="small" className="post__footerOption" /><span>8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;