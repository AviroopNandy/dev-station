import React, { useContext, useEffect, useState } from "react";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";
import { CircularProgress, Button } from "@material-ui/core";
import axios from "axios";

import "./Requests.style.css";

const Requests = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    // const [creatorUsername, setCreatorUsername] = useState({});

    const { getAllRequests, getUserFeedRequests } = useContext(DevStationContext);

    useEffect(() => {
        getAllRequests();
        getUserFeedRequests();
    }, []);

    const acceptRequest = (id) => {
        const headerConfig = {
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "*"
            }
        };
        const body = {
            user_to_accept: userId
        };
        axios.put(`https://devdevss.herokuapp.com/request/${id}/accept`, {
            ...body
        }, {
            ...headerConfig
        })
        .then(res => {
            alert("Request accepted successfully!");
            window.location.reload();
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <DevStationConsumer>
            { value => {
                const { allRequests, userFeedRequests } = value;
                // getUsersWhoAccepted(userFeedRequests);
                // window.location.reload();
                console.log(userFeedRequests);
                return (
                    <div className="requests">
                        <div className="requests__header">
                            <h2>Requests</h2>
                            { user ? (
                                <h3>@{user}</h3>
                            ) : (
                                null
                            ) }
                        </div>
                        <div className="requests__header">
                            <h3>Created by you: </h3>
                        </div>
                        <div className="requests__col-rev">
                        { allRequests ? (
                            allRequests.length > 0 ? (
                                allRequests.map(({id, body, type, accepted}) => (
                                    accepted ? (
                                        <div className="requests__show" key={id}>
                                            <h3>{body}</h3>
                                            <p>Request Type: {type}</p>
                                            <p>Request Status: ACCEPTED!</p>
                                        </div>
                                    ) : (
                                        <div className="requests__show" key={id}>
                                            <h3>{body}</h3>
                                            <p>Request Type: {type}</p>
                                            <p>Request Status: NOT YET ACCEPTED!</p>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className="loading requests__none">
                                    <h3>You dont have any requests pending at the moment</h3>
                                </div>
                            )
                        ) : (
                            <div className="loading">
                                <CircularProgress className="loader" />
                            </div>
                        ) }
                        </div>
                        <div className="requests__header others">
                            <h3>Created by others: </h3>
                        </div>
                        <div className="requests__col-rev">
                            { userFeedRequests ? (
                                userFeedRequests.length > 0 ? (
                                    userFeedRequests.map(({id, creator, firstName, lastName, acceptedBy, body, type, accepted}) => (
                                        <>
                                            <div className="requests__show" key={id}>
                                                <h3>{body}</h3>
                                                <p>Request Type: {type}</p>
                                                <p>Creator: {firstName} {lastName} (@{creator})</p>
                                                <p>Request Status: NOT YET ACCEPTED!</p>
                                                <div className="requests__btn">
                                                    <Button variant="contained" fullWidth onClick={() => acceptRequest(id)}>Accept</Button>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                ) : (
                                    <div className="loading requests__none">
                                        <h3>You currently have no requests</h3>
                                    </div>
                                )
                            ) : (
                                <div className="loading">
                                    <CircularProgress className="loader" />
                                </div>
                            )}
                        </div>
                    </div>
                )
            } }
        </DevStationConsumer>
    )
}

export default Requests;