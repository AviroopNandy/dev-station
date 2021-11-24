import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { DevStationConsumer, DevStationContext } from "../../helpers/Context";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import "./RightSidebar.style.css";

const RightSidebar = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [activeUsers, setActiveUsers] = useState([]);

    const { getTop3Users } = useContext(DevStationContext);

    useEffect(() => {
        getTop3Users();
        // const headerConfig = {
        //     headers: {
        //         "Content-Type": "Application/json"
        //     }
        // };
        // axios.get("https://devdevss.herokuapp.com/user/active", {
        //     ...headerConfig
        // })
        // .then(res => {
            
        // })
        // .catch(error => {
        //     alert(error);
        // });

    }, []);

    return (
        <DevStationConsumer>
            {value => {
                const { top3Users } = value
                return (
                    <div className="rightSidebar">
                        <div className="rightSidebar__card">
                            <h2>People Active Now</h2>
                            <br />
                            {activeUsers ? (
                                <>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="loading">
                                    <CircularProgress className="loader" />
                                </div>
                            )}
                        </div>
                        <div className="rightSidebar__card">
                            <h2>People To Follow</h2>
                            { top3Users ? (
                                <>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                    <div className="rightSidebar__user">
                                        <div className="rightSidebar__follow">
                                            <p>Aviroop Nandy @aviroop_nandy</p>
                                            {/* <Button variant="contained">Follow</Button> */}
                                            <PersonAddIcon fontSize="medium" className="rightSidebar__followBtn" titleAccess={`Follow aviroop_nandy`} /><span></span>
                                        </div>
                                        <div className="rightSidebar__desc">
                                            <p><b>10</b> followers, <b>8</b> following, <b>5</b> posts</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <h1>No</h1>
                            ) }
                        </div>
                    </div>
                )
            } }
        </DevStationConsumer>
    )
}

export default RightSidebar;