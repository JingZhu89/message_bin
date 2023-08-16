import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Container } from "@mui/system";
import { getNewUUID } from "./service";
let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3001/";
} else {
  baseURL = "/";
}

const Urlgen = ({ addEndpoint }) => {
  const [copyText, setCopyText] = useState("Copy");
  const [newURL, setNewURL] = useState("");
  const [buttonText, setButtonText] = useState("Create new endpoint URL");

  const generateURL = async (event) => {
    event.preventDefault();
    let res = await getNewUUID();
    setNewURL(res.prefix + res.uuid);
    setButtonText("Endpoint generated!");
    setCopyText("Copy");
    addEndpoint(res.uuid);
  };

  const copyUrl = (event) => {
    navigator.clipboard.writeText(newURL);
    setCopyText("Copied!");
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
      <form onSubmit={generateURL}>
        <Button type="submit" variant="contained">
          {buttonText}
        </Button>
      </form>
      {newURL ? (
        <Box>
          <Typography>Your endpoint URL:</Typography>
          <TextField
            variant="filled"
            className="endpoint"
            value={newURL}
            fullWidth
          />
          <Button className="copytext" onClick={copyUrl}>
            ({copyText})
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default Urlgen;
