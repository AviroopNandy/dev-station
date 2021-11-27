import React, { useContext, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Avatar, Modal } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import avatarImg from "../../assets/images/avatar.png";
import sampleImg from "../../assets/images/login_image.jpg";
import Comment from "../Comment/Comment.component";
import axios from "axios";
import Profile from "../Profile/Profile.component";
import { DevStationConsumer, DevStationContext } from "../../helpers/Context";

import "./Post.style.css";

const Post = ({ id, username, body, timeAdded, deletePost, followUser, likesCount, allTags }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [likes, setLikes] = useState(likesCount);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [tags, setTags] = useState([]);
    const [followingIds, setFollowingIds] = useState([]);
    const [creatorId, setCreatorId] = useState("");

    const history = useHistory();

    const { getAllViewUserPosts } = useContext(DevStationContext);

    useEffect(() => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
            }
        };

        axios.get(`http://0.0.0.0:8000/user/${user}/details`, {
            ...headerConfig
        })
        .then(res => {
            setFollowingIds([...res.data.following]);
        })
        .catch(error => {
            alert(error);
        });

        axios.get(`http://0.0.0.0:8000/user/${username}/details`, {
            ...headerConfig
        })
        .then(res => {
            setCreatorId(res.data._id);
        })
        .catch(error => {
            alert(error);
        });
        
        axios.get(`http://0.0.0.0:8000/post/${id}`, {
            ...headerConfig
        })
        .then(async res => {
            setTags(res.data.tags);
            await setComments(res.data.comments);
            // console.log(comments);
        })
    }, []);

    const likePostHandler = () => {
        console.log(id);
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        };
        axios.post(`http://0.0.0.0:8000/post/${id}/like`, {
            ...headerConfig
        })
        .then(res => {
            // console.log("Likes: ", res.data.likes);
            setLikes(res.data.likes);
            // window.location.reload();
        })
    }

    const commentPostHandler = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Credentials": "true",
            }
        }
        // axios.get()
    }

    const followUserHandler = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.post(`http://0.0.0.0:8000/user/${user}/follow/${username}`, {
            ...headerConfig
        })
        .then(res => {
            alert("User followed successfully!");
        })
        .catch(error => {
            alert(error);
        });
    }

    const unfollowUserHandler = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Credentials": "true"
            }
        };
        axios.post(`http://0.0.0.0:8000/user/${user}/unfollow/${username}`, {
            ...headerConfig
        })
        .then(res => {
            alert("User unfollowed successfully!");
        })
        .catch(error => {
            alert(error);
        })
    }

    const deletePostHandler = () => {
        const returnValue = window.confirm(`Are you sure you want to delete this post? Once deleted, the process cannot be undone. Click "OK" to delete this post`);
        if(returnValue === true) {
            const headerConfig = {
                headers: {
                    "Content-Type": "Application/json",
                    "Access-Control-Allow-Credentials": "true"
                }
            };
            axios.delete(`http://0.0.0.0:8000/post/${id}`, {
                ...headerConfig
            })
            .then(res => {
                alert("Post Deleted!");
                window.location.reload();
            })
            .catch(error => {
                alert(error);
            })
        }
    }

    const viewUser = (username) => {
        console.log("username on click: ", username);
        getAllViewUserPosts(username);
        history.push("/profile");
    }
    
    return (
        <DevStationConsumer>
            {value => {
                const { viewUserMode } = value
                return (
                    <div className="post">
                        {/* <div className="post__author"> */}
                        <div className="post__avatar">
                            <Avatar src={ avatarImg } alt="" />
                        </div>
                        <div className="post__body">
                            <div className="post__header">
                                <div className="post__headerText">
                                    <h3 onClick={() => viewUser(username)}>
                                        { username }
                                        <span className="post__headerSpecial">
                                            <VerifiedUserIcon className="post__badge" titleAccess="This user is verified" />
                                        </span>
                                        {/* <div className="post__timeAdded">
                                            { timeAdded }
                                        </div> */}
                                    </h3>
                                </div>
                                <div className="post__headerDescription">
                                    <p>{ body }</p>
                                    <div className="post__tags">
                                        { tags?.map((tag, id) => (
                                                <p key={id}>{tag}</p>
                                        ))}
                                    </div>
                                    {/* <p>#lorem #ipsum #dolor #sit #amet #consectetur #adipisicing #elit #Obcaecati</p> */}
                                </div>
                            </div>
                            {/* <img src={ sampleImg } alt="" /> */}
                            <div className="post__footer">
                                <div className="like">
                                    <FavoriteBorderIcon fontSize="small" className="post__footerOption" titleAccess="Like Post" onClick={() => likePostHandler()} /><span>{likes}</span>
                                </div>
                                <div className="comment">
                                    <ChatBubbleIcon fontSize="small" className="post__footerOption" titleAccess="Add Comment" onClick={() => setShowComments(!showComments)} /><span>{comments.length}</span>
                                    <Modal
                                        open={showComments}
                                        onClose={() => setShowComments(false)}
                                    >
                                        <Comment id={id}/>
                                    </Modal>
                                </div>
                                {/* { showComments ? (
                                    <h3>Comments here!</h3>
                                ) : (
                                    null
                                ) } */}
                                { followUser ? (
                                    user === username ? (
                                        null
                                    ) : followingIds.includes(creatorId) ? (
                                        <div className="follow">
                                            <RemoveIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Unfollow ${username}`} onClick={() => unfollowUserHandler(username)} />
                                        </div>
                                    ) : (
                                        <div className="follow">
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow ${username}`} onClick={() => followUserHandler(username)} />
                                        </div>
                                    )
                                ) : (
                                    null
                                ) }
                                { deletePost ? (
                                    viewUserMode ? (
                                        null
                                    ) : (
                                        <div className="delete">
                                            <DeleteIcon fontSize="small" className="post__footerOption" titleAccess="Delete Post" onClick={() => deletePostHandler()} /><span></span>
                                        </div>
                                    )
                                ) : (
                                    null
                                ) }
                            </div>
                        </div>
                    </div>
                )
            }}
        </DevStationConsumer>
    );
}

export default Post;