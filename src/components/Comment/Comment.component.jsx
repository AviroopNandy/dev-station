import React, { useState, useEffect } from "react";
import { CircularProgress, Button } from "@material-ui/core";
import axios from "axios";

import "./Comment.style.css";

const Comment = ({ id }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    
    useEffect(() => {
        getCommentIds();
    }, []);

    const getCommentIds = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.get(`http://0.0.0.0:8000/post/${id}/comments`, {
            ...headerConfig
        })
        .then(res => {
            getComments(res.data);
        });
    }

    const getComments = (cids) => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        cids.forEach(cid => {
            axios.get(`https://devdevss.herokuapp.com/post/${cid}/comment/metadata`, {
                ...headerConfig
            })
            .then(res => {
                setComments(comments => [...comments, res.data]);
            })
        });
    }

    const postComment = (e) => {
        e.preventDefault();
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        }
        const body = {
            body: commentBody,
            username: user,
            post_id: id
        };
        axios.post(`https://devdevss.herokuapp.com/post/${id}/comment`, {
            ...body
        }, {
            ...headerConfig
        })
        .then(res => {
            alert("Commented successfully!");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <div className="comment">
            <div className="comment__display">
                <h2>All Comments</h2>
                { comments.length > 0 ? (
                    comments.map((comment, id) => (
                        <div className="comment__view">
                            <p key={id}>{comment.username}: {comment.body}</p>
                        </div>
                    ))
                ) : (
                    <div className="loading">
                        <h4>No comments on this post</h4>
                    </div>
                ) }
                <div className="comment__input">
                    <input type="text"
                        placeholder="Write your comment here..."
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        size="30"
                    />
                    <Button variant="contained" onClick={(e) => postComment(e)}>Post!</Button>
                </div>
            </div>
        </div>
    )
}

export default Comment;