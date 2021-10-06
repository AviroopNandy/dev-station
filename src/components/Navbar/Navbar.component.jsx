import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.style.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <nav>
                <NavLink to="/" className="navbar__nav-link navbar__title">
                    DevStation
                </NavLink>
                <div className="navbar__nav-menu">
                    <NavLink to="/about" className="navbar__nav-link">
                        About
                    </NavLink>
                    <NavLink to="/contact" className="navbar__nav-link">
                        Contact
                    </NavLink>
                    <NavLink to="/devs" className="navbar__nav-link">
                        Devs
                    </NavLink>
                </div>
                <div className="navbar__buttons">
                    <NavLink to="/login" className="navbar__btn login">Login</NavLink>
                    <NavLink to="/register" className="navbar__btn register">Register</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;