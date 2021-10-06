import React, { useState } from "react";
import axios from "axios";

const DevStationContext = React.createContext();

const DevStationProvider = ({ children }) => {
    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = () => {
        axios.get("http://127.0.0.1:8000/post", {
            headers: {
                "Accept": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(res => {
            setAllPosts(res.data);
            // console.log("All Posts: ", allPosts);
        })
    }

    return(
        <DevStationContext.Provider
            value={{
                allPosts,
                getAllPosts: getAllPosts
            }}
        >
            { children }
        </DevStationContext.Provider>
    )
}

const DevStationConsumer = DevStationContext.Consumer;

export { DevStationProvider, DevStationContext, DevStationConsumer };