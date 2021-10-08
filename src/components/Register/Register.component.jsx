import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Register.style.css";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState("");

    const history = useHistory();

    const registerUser = (e) => {
        e.preventDefault();
        if(password === confirm) {
            const data = {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password,
                gender: gender,
                phone: mobile
            };
            console.log("User data: ", data);
            const headerConfig = {
                headers: {
                    "Accept": "Application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            };
            axios.post("http://127.0.0.1:8000/user/signup", {
                ...data
            }, {
                ...headerConfig
            })
            .then(res => {
                console.log(res);
                alert("Successfully registered!")
            })
            .catch(error => {
                console.log(error);
            });
            history.push("/login");
        } else {
            alert("Password and Confirm Password fields do not match");
        }
    }

    return (
        <div className="register">
            <form>
                <div className="register__form-inner">
                    <h2>Register</h2>
                    <div className="register__form-group">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name="fname" id="fname" onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name="confirm" id="confirm" onChange={(e) => setConfirm(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" name="gender" id="gender" onChange={(e) => setGender(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="number" name="mobile" id="mobile" onChange={(e) => setMobile(e.target.value)} required />
                    </div>
                    <div className="register__form-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="register__form-button">
                        <input type="submit" value="Register" onClick={(e) => registerUser(e)} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;