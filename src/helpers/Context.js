import React, { useState } from "react";
import axios from "axios";

const DevStationContext = React.createContext();

const DevStationProvider = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [allPosts, setAllPosts] = useState(null);
    const [allUserPosts, setAllUserPosts] = useState(null);
    const [userFeed, setUserFeed] = useState(null);
    const [userAbout, setUserAbout] = useState({
        firstName: "",
        lastName: "",
        posts: 0,
        followers: 0,
        following: 0
    });
    const [top3Users, setTop3Users] = useState([{}]);

    const getAllPosts = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get("https://devdevss.herokuapp.com/post", {
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
        axios.get(`https://devdevss.herokuapp.com/post/user/${user}`, {
            ...headerConfig
        })
        .then(res => {
            console.log(res.data);
            // setAllUserPosts(res);
            setAllUserPosts(res.data);
            console.log(allUserPosts);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getUserFeed = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        axios.get(`https://devdevss.herokuapp.com/user/${user}/feed`, {
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
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get(`https://devdevss.herokuapp.com/user/${username}/details`, {
            ...headerConfig
        })
        .then(async res => {
            await setUserAbout({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
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
        axios.get("http://localhost:8000/user/users/top3", {
            ...headerConfig
        })
        .then(res => {
            // res.data.forEach(user => {
            //     console.log(user);
            //     setTop3Handler(user);
            //     // setTop3Users(top3Users => [...top3Users, user]);
            // });
            console.log(top3Users);
            for(let i = 0; i < 3; i++) {
                setTop3Users(top3Users => [...top3Users, res.data[i]]);
            }
        })
    }

    // const setTop3Handler = (user) => {
    //     setTop3Users(top3Users => [...top3Users, user]);
    // }

    return(
        <DevStationContext.Provider
            value={{
                allPosts,
                allUserPosts,
                userFeed,
                userAbout,
                getAllPosts: getAllPosts,
                getAllUserPosts: getAllUserPosts,
                getUserFeed: getUserFeed,
                getUserAbout: getUserAbout,
                getTop3Users: getTop3Users
            }}
        >
            { children }
        </DevStationContext.Provider>
    )
}

const DevStationConsumer = DevStationContext.Consumer;

export { DevStationProvider, DevStationContext, DevStationConsumer };