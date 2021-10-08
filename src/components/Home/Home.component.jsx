import React, { useContext, useEffect } from "react";
import PostBox from "../PostBox/PostBox.component";
import Post from "../Post/Post.component";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";

import "./Home.style.css";

const Home = () => {
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
                    </div>
                    <PostBox />
                    { userFeed ? (
                        <div>
                            { userFeed.map((post, id) => (
                                <Post username={post.username} body={post.body} key={id} />
                            ))}
                        </div>
                    ) : (
                        null
                    ) }
                </div>
            )
        }}
    </DevStationConsumer>
    )
}

export default Home;