import { useState } from "react";

import JsonView from "react18-json-view";
import { Container, Typography, Box } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Requests = ({ chosenEndpointRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState("");
  // const COLLAPSE_LENGTH = 200; // To prevent non-HTTP responses (e.g. test data) from being auto-collapsed
  // const [style, setStyle] = useState("reqs");
  // const [jsonContent, setJsonContent] = useState(
  //   "Select a request on the left"
  // );

  // if (chosenEndpointRequests.length === 0) {
  //   output = "No requests yet...";
  // } else {
  // output = reqs.map((req) => {
  //   let method = req.request_body.method ? req.request_body.method : "";
  //   let src = req.request_body.body
  //     ? req.request_body.body
  //     : req.request_body;
  //   let collapseLength = req.request_body.method ? 0 : COLLAPSE_LENGTH;
  //   return (
  //     <div className={style}>
  //       {method}{" "}
  //       <JsonView
  //         key={req.id}
  //         src={src}
  //         collapseObjectsAfterLength={collapseLength}
  //       />
  //     </div>
  //   );
  // });
  // }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Box>
        <Typography variant="h5">Requests:</Typography>
        <List>
          {chosenEndpointRequests.map((req) => (
            <ListItem key={req.id} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={req.insert_time}
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box></Box>
    </Container>
  );
};

export default Requests;
