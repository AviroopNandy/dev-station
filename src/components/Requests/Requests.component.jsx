import React, { useContext, useEffect, useState } from "react";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";
import { CircularProgress } from "@material-ui/core";

import "./Requests.style.css";

const Requests = () => {
    const [user, setUser] = useState(sessionStorage.getItem("user"));

    const { getAllRequests } = useContext(DevStationContext);

    useEffect(() => {
        getAllRequests();
        // getAcceptedRequests();
    }, []);

    return (
        <DevStationConsumer>
            { value => {
                const { allRequests } = value;
                console.log(allRequests.length);
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
                        { allRequests ? (
                            allRequests.length > 0 ? (
                                allRequests.map(({id, body, type, accepted}) => (
                                    accepted ? (
                                        <div className="requests__show" key={id}>
                                            <h3>{body}</h3>
                                            <p>Request Type: {type}</p>
                                            <p>Request Status: Not yet accepted</p>
                                        </div>
                                    ) : (
                                        <div className="requests__show" key={id}>
                                            <h3>{body}</h3>
                                            <p>Request Type: {type}</p>
                                            <p>Request Status: Not yet accepted</p>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className="loading">
                                    <h3>You dont have any request pending at the moment</h3>
                                </div>
                            )
                        ) : (
                            <div className="loading">
                                <CircularProgress className="loader" />
                            </div>
                        ) }
                    </div>
                )
            } }
        </DevStationConsumer>
    )
}

export default Requests;