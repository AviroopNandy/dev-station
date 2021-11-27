import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./EditProfile.style.css";
import axios from "axios";

const EditProfile = () => {
    let history = useHistory();
    const [user, setUseer] = useState(sessionStorage.getItem("user"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        gender: "",
        phone: ""
    });

    useEffect(() => {
        setUserDetails({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            gender: "",
            phone: ""
        });
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.get(`http://0.0.0.0:8000/user/${user}/details`, {
            ...headerConfig
        })
        .then(res => {
            setUserDetails({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                username: res.data.username,
                email: res.data.email,
                gender: res.data.gender,
                phone: res.data.phone
            });
        })
    }, []);

    const saveChangesHandler = (e) => {
        e.preventDefault();
        const body = {
            first_name: userDetails.firstName,
            last_name: userDetails.lastName,
            username: userDetails.username,
            email: userDetails.email,
            gender: userDetails.gender,
            phone: userDetails.phone
        }
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.put(`https://devdevss.herokuapp.com/user/update/${userId}`, {
            ...body
        }, {
            ...headerConfig
        })
        .then(res => {
            alert("User updated successfully!");
            sessionStorage.setItem("user", userDetails.username);
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }

    const deleteUserHandler = (e) => {
        e.preventDefault();
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.delete(`https://devdevss.herokuapp.com/user/${userId}/delete`, {
            ...headerConfig
        })
        .then(res => {
            alert("User deleted successfully!");
            sessionStorage.clear();
            history.push("/");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <div className="edit">
            <div className="edit__display">
                <h2>Edit Profile</h2>
                <div className="edit_input">
                    <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.firstName}
                            onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                            size="30"
                        />
                    </div>
                    <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.lastName}
                            onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                            size="30"
                        />
                    </div>
                    <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.username}
                            onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
                            size="30"
                        />
                    </div>
                    {/* <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.password}
                            onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                            size="30"
                        />
                    </div> */}
                    <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.email}
                            onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                            size="30"
                        />
                    </div>
                    <div className="edit__inputBox">
                        <input type="text"
                            // placeholder="Write your comment here..."
                            value={userDetails.gender}
                            onChange={(e) => setUserDetails({...userDetails, gender: e.target.value})}
                            size="30"
                        />
                    </div>
                    <div className="edit__inputBox">
                        <input type="number"
                            // placeholder="Write your comment here..."
                            value={userDetails.phone}
                            onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                            size="30"
                        />
                    </div>
                    <div className="edit__button">
                        <Button variant="contained" className="edit__editProfile" onClick={(e) => saveChangesHandler(e)}>Save Changes</Button>
                        <Button variant="contained" className="edit__deleteProfile" onClick={(e) => deleteUserHandler(e)}>Delete User</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;