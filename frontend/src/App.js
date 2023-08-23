import { useState, useEffect } from "react";
import "react18-json-view/src/style.css";
import { io } from "socket.io-client";
import { Container } from "@mui/system";
import { getEndpoints, getRequestsForEndpoint } from "./service.js";
import { Typography } from "@mui/material";
import Urlgen from "./Urlgen.js";
import Urllist from "./Urllist.js";

const App = () => {
  const [endpoints, setEndpoints] = useState([]);
  const [urlprefix, setUrlPrefix] = useState("");
  const [chosenEndpoint, setChosenEndpoint] = useState("");
  const [chosenEndpointRequests, setChosenEndpointRequests] = useState([]);

  useEffect(() => {
    let socket;
    if (process.env.NODE_ENV === "development") {
      socket = io("ws://localhost:3002");
    } else {
      socket = io("wss://app.jingzwork.space:3002");
    }
    socket.on("new", (req) => {
      if (req.uuid === chosenEndpoint) {
        console.log("setting requests");
        setChosenEndpointRequests(chosenEndpointRequests.concat(req.data[0]));
      }
    });

    const getInitialEndpoints = async () => {
      const res = await getEndpoints();
      setEndpoints(res.uuids);
      setUrlPrefix(res.prefix);
    };
    getInitialEndpoints();
  }, []);

  const addEndpoint = (newEndpoint) => {
    setEndpoints(endpoints.concat({ uuid: newEndpoint }));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        textAlign={"center"}
        backgroundColor="#004791"
        color="white"
        width="1050px"
        height="68px"
      >
        MessageBin
      </Typography>
      <Urlgen addEndpoint={addEndpoint} />
      <Urllist
        endpoints={endpoints}
        urlprefix={urlprefix}
        setChosenEndpoint={setChosenEndpoint}
        chosenEndpoint={chosenEndpoint}
        chosenEndpointRequests={chosenEndpointRequests}
        setChosenEndpointRequests={setChosenEndpointRequests}
      />
    </Container>
  );
};

export default App;
