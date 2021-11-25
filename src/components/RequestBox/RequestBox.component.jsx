import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import "./RequestBox.style.css";

const RequestBox = () => {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [body, setBody] = useState("");
    const [type, setType] = useState("Frontend");

    const postRequest = (e) => {
        e.preventDefault();
        const post = {
            user_to_request: userId,
            type: type,
            body: body
        };
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.post("http://localhost:8000/request/create", {
            ...post
        }, {
            ...headerConfig
        })
        .then(res => {
            alert("Request created successfully!");
        })
        .catch(error => {
            alert(error);
        });
    }

    return (
        <div className="requestBox">
            <div className="requestBox__display">
                <h2>Request Box</h2>
                <div className="requestBox_input">
                    <div className="requestBox__inputBox">
                        <input type="text"
                            placeholder="Write your request here..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            size="30"
                        />
                    </div>
                    <div className="requestBox__inputBox">
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="App">App</option>
                            <option value="AI/ML">AI/ML</option>
                        </select>
                        {/* <input type="text"
                            placeholder="Type of Request (Frontend or Backend or App or AI/ML)"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            size="30"
                        /> */}
                    </div>
                    <div className="requestBox__button">
                        <Button variant="contained" onClick={(e) => postRequest(e)}>Create Request</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestBox;