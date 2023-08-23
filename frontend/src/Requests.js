import { useState } from "react";

import JsonView from "react18-json-view";
import { Container, Typography, Box } from "@mui/material";
import List from "@mui/material/List";

import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const Requests = ({ chosenEndpointRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const parseDate = (insert_time) => {
    const miliSec = Date.parse(insert_time);
    const parsedDate = new Date(miliSec);
    const timeZone = parsedDate
      .toString()
      .split("(")[1]
      .split(" ")
      .map((word) => word[0])
      .join("");

    return parsedDate.toString().slice(0, 24) + " " + timeZone;
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        marginTop: "20px",
        height: "600px",
      }}
    >
      <Box
        sx={{
          border: "solid",
          borderRight: "none",
          borderWidth: "thick",
          borderColor: "#004791",
          height: "100%",
          width: "30%",
          overflowY: "scroll",
        }}
      >
        <nav>
          <Typography
            variant="h5"
            textAlign={"center"}
            backgroundColor="#004791"
            color="white"
          >
            Requests
          </Typography>
          <List>
            {chosenEndpointRequests.map((req) => (
              <MenuItem
                key={req.id}
                selected={
                  selectedRequest ? req.id === selectedRequest.id : false
                }
                onClick={(e) => setSelectedRequest(req)}
              >
                <ListItemText
                  primary={parseDate(req.insert_time)}
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {req.requestdata.method ? req.requestdata.method : ""}
                    </Typography>
                  }
                />
              </MenuItem>
            ))}
          </List>
        </nav>
      </Box>
      <Box
        sx={{
          border: "solid",

          backgroundColor: "#F5F5F5",
          borderWidth: "thick",
          borderColor: "#004791",
          width: "70%",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h5"
          textAlign={"center"}
          backgroundColor="#004791"
          color="white"
        >
          Details
        </Typography>
        <Box sx={{ paddingLeft: "50px" }}>
          {selectedRequest ? (
            <>
              <Typography variant="h6" color="#004791">
                Headers
              </Typography>
              <JsonView
                key={selectedRequest.id}
                src={selectedRequest.requestdata.headers}
              />
            </>
          ) : null}
        </Box>
        <Box sx={{ paddingLeft: "50px" }}>
          {selectedRequest ? (
            <>
              {" "}
              <Typography variant="h6" color="#004791">
                Body
              </Typography>
              <JsonView
                key={selectedRequest.id}
                src={selectedRequest.requestdata.body}
              />
            </>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default Requests;
