import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Login.style.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        console.log("Data: ", data);
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.post("http://0.0.0.0:8000/user/login", {
            ...data
        }, {
            ...headerConfig
        })
        .then(res => {
            // console.log(res.access_token);
            console.log("Logged In");
            sessionStorage.setItem("user", username);
            history.push("/");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        });
    }
    return (
        <div className="login">
            <form>
                <div className="login__form-inner">
                    <h2>Login</h2>
                    <div className="login__form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="login__form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="login__form-button">
                        <input type="submit" value="LOGIN" onClick={(e) => loginUser(e)} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;