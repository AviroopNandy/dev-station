import React, { useState } from "react";
import axios from "axios";

const DevStationContext = React.createContext();

const DevStationProvider = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [allPosts, setAllPosts] = useState(null);
    const [allUserPosts, setAllUserPosts] = useState(null);
    const [userFeed, setUserFeed] = useState(null);

    const getAllPosts = () => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        axios.get("https://devstation.up.railway.app/post", {
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
        axios.get(`https://devstation.up.railway.app/post/${user}`, {
            ...headerConfig
        })
        .then(res => {
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
        axios.get(`https://devstation.up.railway.app/user/${user}/feed`, {
            ...headerConfig
        })
        .then(res => {
            setUserFeed(res.data);
            console.log(userFeed);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <DevStationContext.Provider
            value={{
                allPosts,
                allUserPosts,
                userFeed,
                getAllPosts: getAllPosts,
                getAllUserPosts: getAllUserPosts,
                getUserFeed: getUserFeed
            }}
        >
            { children }
        </DevStationContext.Provider>
    )
}

const DevStationConsumer = DevStationContext.Consumer;

export { DevStationProvider, DevStationContext, DevStationConsumer };
