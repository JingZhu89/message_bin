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
  const [buttonText, setButtonText] = useState("Get new URL");

  const generateURL = async (event) => {
    event.preventDefault();
    let res = await getNewUUID();
    setNewURL(res.prefix + res.uuid);
    setButtonText("URL generated!");
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
        gap: "30px",
      }}
    >
      <form onSubmit={generateURL}>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#004791" }}
        >
          {buttonText}
        </Button>
      </form>
      {newURL ? (
        <Box>
          <TextField
            variant="standard"
            className="endpoint"
            value={newURL}
            sx={{ width: "550px" }}
          />
          <Button
            onClick={copyUrl}
            variant="contained"
            sx={{ backgroundColor: "#004791" }}
          >
            {copyText}
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default Urlgen;
