import React, { useContext, useEffect, useState } from "react";
import PostBox from "../PostBox/PostBox.component";
import Post from "../Post/Post.component";
import { CircularProgress } from "@material-ui/core";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";

import "./Home.style.css";

const Home = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const { getUserFeed } = useContext(DevStationContext);

    useEffect(() => {
        getUserFeed();
    }, []);

    return (
        <DevStationConsumer>
        { value => {
            const { userFeed } = value;
            console.log(userFeed);
            return(
                <div className="home">
                    <div className="home__header">
                        <h2>Home</h2>
                        { user ? (
                            <h3>@{user}</h3>
                        ) : (
                            null
                        ) }
                    </div>
                    <PostBox />
                    { userFeed ? (
                        userFeed.length > 0 ? (
                            <div>
                                { userFeed.map((post, id) => (
                                    <Post username={post.username} body={post.body} id={post._id} key={id} />
                                ))}
                            </div>
                        ) : (
                            <div className="loading">
                                <h3>Follow someone to see their posts on your feed</h3>
                                {/* <CircularProgress className="loader" /> */}
                            </div>
                        )
                    ) : (
                        <div className="loading">
                            <CircularProgress className="loader" />
                            {/* <h3>Follow someone to see their posts on your feed</h3> */}
                        </div>
                    ) }
                </div>
            )
        }}
    </DevStationConsumer>
    )
}

export default Home;