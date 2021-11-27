import React, { useState } from "react";
import axios from "axios";

const DevStationContext = React.createContext();

const DevStationProvider = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [allPosts, setAllPosts] = useState(null);
    const [allUserPosts, setAllUserPosts] = useState(null);
    const [userFeed, setUserFeed] = useState(null);
    const [viewUserMode, setViewUserMode] = useState(false);
    const [viewUsername, setViewUsername] = useState("");
    const [userAbout, setUserAbout] = useState({
        firstName: "",
        lastName: "",
        role: "",
        posts: 0,
        followers: 0,
        following: 0
    });
    const [top3Users, setTop3Users] = useState([{}]);
    // const [allRequests, setAllRequests] = useState([{
    //     body: "",
    //     type: "",
    //     accepted: false
    // }]);

    const [allRequests, setAllRequests] = useState([]);
    const [userFeedRequests, setUserFeedRequests] = useState([]);

    const getAllPosts = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get("http://0.0.0.0:8000/post", {
            ...headerConfig
        })
        .then(res => {
            setAllPosts(res.data);
            // console.log("All Posts: ", allPosts);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getAllUserPosts = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/post/user/${user}`, {
            ...headerConfig
        })
        .then(res => {
            setViewUserMode(false);
            setAllUserPosts(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getUserFeed = () => {
        setUser(sessionStorage.getItem("user"));
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/user/${user}/feed`, {
            ...headerConfig
        })
        .then(res => {
            setUserFeed(res.data);
            console.log(userFeed);
        })
        // .catch(error => {
        //     console.log(error);
        // });
    }

    const getUserAbout = (username) => {
        setUserAbout({
            firstName: "",
            lastName: "",
            role: "",
            posts: 0,
            followers: 0,
            following: 0
        });
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/user/${username}/details`, {
            ...headerConfig
        })
        .then(res => {
            console.log("User Details: ",res.data);
            setUserAbout({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                role: res.data.role,
                posts: res.data.posts_id.length,
                followers: res.data.followers_count,
                following: res.data.following_count
            });
            // console.log("User About: ", userAbout);
        });
    }

    const getTop3Users = () => {
        setTop3Users([]);
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get("http://0.0.0.0:8000/user/users/top3", {
            ...headerConfig
        })
        .then(res => {
            console.log(top3Users);
            for(let i = 0; i < 3; i++) {
                setTop3Users(top3Users => [...top3Users, res.data[i]]);
            }
        })
    }

    const getAllRequests = () => {
        setAllRequests([]);
        const headerConfig = {
            heaeders: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/request/created/${userId}`, {
            ...headerConfig
        })
        .then(res => {
            if(res.status === 200) {
                res.data.forEach(request => {
                    setAllRequests(allRequests => [...allRequests, {
                        id: request._id,
                        body: request.body,
                        type: request.type,
                        accepted: request.accepted
                    }]);
                });
            }
            // console.log(allRequests.length);
        })
    }

    const getUserFeedRequests = () => {
        setUserFeedRequests([]);
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/user/${user}/feed/request`, {
            ...headerConfig
        })
        .then(res => {
            if(res.status === 200) {
                res.data.forEach(request => {
                    axios.get(`http://0.0.0.0:8000/user/${request.user_to_request}`, {
                        ...headerConfig
                    })
                    .then(res => {
                        setUserFeedRequests(userFeedRequests => [...userFeedRequests, {
                            id: request._id,
                            firstName: res.data.first_name,
                            lastName: res.data.last_name,
                            creator: res.data.username,
                            acceptedBy: request.user_to_accept,
                            type: request.type,
                            body: request.body,
                            accepted: request.accepted
                        }]);
                    })
                });
            }
        })
    }

    const getAllViewUserPosts = (username) => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`http://0.0.0.0:8000/post/user/${username}`, {
            ...headerConfig
        })
        .then(res => {
            setViewUsername(username);
            getUserAbout(username);
            setAllUserPosts(res.data);
            setViewUserMode(true);
        })
        .catch(error => {
            alert(error);
        })
    }

    const changeViewUserMode = (bool) => {
        setViewUserMode(bool);
    }

    return(
        <DevStationContext.Provider
            value={{
                allPosts,
                allUserPosts,
                userFeed,
                userAbout,
                allRequests,
                userFeedRequests,
                viewUserMode,
                viewUsername,
                getAllPosts: getAllPosts,
                getAllUserPosts: getAllUserPosts,
                getUserFeed: getUserFeed,
                getUserAbout: getUserAbout,
                getTop3Users: getTop3Users,
                getAllRequests: getAllRequests,
                getUserFeedRequests: getUserFeedRequests,
                getAllViewUserPosts: getAllViewUserPosts,
                changeViewUserMode: changeViewUserMode
            }}
        >
            { children }
        </DevStationContext.Provider>
    )
}

const DevStationConsumer = DevStationContext.Consumer;

export { DevStationProvider, DevStationContext, DevStationConsumer };