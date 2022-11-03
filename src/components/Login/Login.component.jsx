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
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.post("https://devstation.up.railway.app/user/login", {
            ...data
        }, {
            ...headerConfig
        })
        .then(res => {
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
