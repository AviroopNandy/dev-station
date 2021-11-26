import React, { useContext, useEffect, useState } from "react";
import { DevStationContext, DevStationConsumer } from "../../helpers/Context";
import { CircularProgress, Button } from "@material-ui/core";
import axios from "axios";

import "./Requests.style.css";

const Requests = () => {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [creatorUsername, setCreatorUsername] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const { getAllRequests, getUserFeedRequests } = useContext(DevStationContext);

  useEffect(() => {
    getAllRequests();
    getUserFeedRequests();
    // const getUsersWhoAccepted = (feed) => {
    //     feed.forEach(({id, creator, acceptedBy, body, type, accepted}) => {
    //         if(accepted) {

    //         }
    //     })
    // }
    // getAcceptedRequests();
  }, []);

  // const getUsername = async (id, creator, acceptedBy, body, type, accepted) => {
  //     // const creatorUsername = {
  //     //     firstName: "",
  //     //     lastName: "",
  //     //     username: ""
  //     // };
  //     const headerConfig = {
  //         headers: {
  //             "Content-Type": "Application/json",
  //             "Access-Control-Allow-Origin": "*"
  //         }
  //     };
  //     const res = await axios.get(`https://devdevss.herokuapp.com/user/${creator}`,
  //             { ...headerConfig }
  //         );

  //     if (res.status !== 200) return;

  //     return (
  //         <>
  //         <div className="requests__show" key={id}>
  //             <h3>{body}</h3>
  //             <p>Request Type: {type}</p>
  //             <p>
  //                 Creator: {res.data.first_name} {res.data.last_name} (@{res.data.username})
  //             </p>
  //             <p>Request Status: ACCEPTED!</p>
  //         </div>
  //         </>
  //     );
  // }

  const renderUserFeedRequests = ({
    id,
    creator,
    acceptedBy,
    body,
    type,
    accepted
  }, user) => {
        return (
        <>
            <div className="requests__show" key={id}>
            <h3>{body}</h3>
            <p>Request Type: {type}</p>
            <p>
                Creator: {user.first_name} {user.last_name} (@
                {user.username})
            </p>
            <p>Request Status: ACCEPTED!</p>
            <div className="requests__btn">
                <Button variant="contained" fullWidth onClick={() => acceptRequest(id)}>Accept</Button>
                </div>
            </div>
        </>
    );
  }

  const getUsername = async ({
    id,
    creator,
    acceptedBy,
    body,
    type,
    accepted,
  }) => {
    const headerConfig = {
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const res = await axios.get(
      `https://devdevss.herokuapp.com/user/${creator}`,
      { ...headerConfig }
    );

    if (res.status !== 200)
      return { firstName: "", lastName: "", username: "" };

    return res?.data || { firstName: "", lastName: "", username: "" };

    // return (
    //   <>
    //     <div className="requests__show" key={id}>
    //       <h3>{body}</h3>
    //       <p>Request Type: {type}</p>
    //       <p>
    //         Creator: {res.data.first_name} {res.data.last_name} (@
    //         {res.data.username})
    //       </p>
    //       <p>Request Status: ACCEPTED!</p>
    //       <div className="requests__btn">
    //         <Button variant="contained" fullWidth onClick={() => acceptRequest(id)}>Accept</Button>
    //         </div>
    //     </div>
    //   </>
    // );
  };

  const acceptRequest = (id) => {
    const headerConfig = {
      headers: {
        "Content-Type": "Application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const body = {
      user_to_accept: userId,
    };
    axios
      .put(
        `https://devdevss.herokuapp.com/request/${id}/accept`,
        {
          ...body,
        },
        {
          ...headerConfig,
        }
      )
      .then((res) => {
        alert("Request accepted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <DevStationConsumer>
      {(value) => {
        const { allRequests, userFeedRequests } = value;
        // getUsersWhoAccepted(userFeedRequests);
        // window.location.reload();
        // console.log(allRequests.length);
        return (
          <div className="requests">
            <div className="requests__header">
              <h2>Requests</h2>
              {user ? <h3>@{user}</h3> : null}
            </div>
            <div className="requests__header">
              <h3>Created by you: </h3>
            </div>
            <div className="requests__col-rev">
              {allRequests ? (
                allRequests.length > 0 ? (
                  allRequests.map(({ id, body, type, accepted }) =>
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
                  )
                ) : (
                  <div className="loading requests__none">
                    <h3>You dont have any requests pending at the moment</h3>
                  </div>
                )
              ) : (
                <div className="loading">
                  <CircularProgress className="loader" />
                </div>
              )}
            </div>
            <div className="requests__header others">
              <h3>Created by others: </h3>
            </div>
            <div className="requests__col-rev">
              {userFeedRequests ? 
              (
                userFeedRequests.length > 0 ? 
                (
                  userFeedRequests.map(async (userFeedRequest) => {
                    // id,
                    // creator,
                    // acceptedBy,
                    // body,
                    // type,
                    // accepted,

                    const { id, creator, acceptedBy, body, type, accepted } = userFeedRequest;

                    let user = await getUsername({ ...userFeedRequest });

                    if(user) return (
                        <renderUserFeedRequests userFeedRequest={userFeedRequest} user={user} />
                    )

                    return (
                      <>
                        <div className="requests__show" key={id}>
                          <h3>{body}</h3>
                          <p>Request Type: {type}</p>
                          <p>Request Status: NOT YET ACCEPTED!</p>
                          <div className="requests__btn">
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={() => acceptRequest(id)}
                            >
                              Accept
                            </Button>
                          </div>
                        </div>
                      </>
                    );

                  })
                ) : (
                  <div className="loading requests__none">
                    <h3>You currently have no requests</h3>
                  </div>
                )
              )
               : (
                <div className="loading">
                  <CircularProgress className="loader" />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </DevStationConsumer>
  );
};

export default Requests;
