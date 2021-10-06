import React from "react";
import Navbar from "../Navbar/Navbar.component";
import TypewriterComponent from "typewriter-effect";

import "./Landing.style.css";

const Landing = () => {
    return (
        <div className="landing">
            <Navbar />
            <div className="landing__container">
                <h3><span>DevStation</span> - the perfect platform for</h3>
                <div className="landing__typewriter">
                    <TypewriterComponent
                        options={{
                            strings: ["Pro Developers", "Software Geeks", "Freelancers", "Coding Enthusiasts"],
                            autoStart: true,
                            loop: true,
                            delay: 125,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Landing;
