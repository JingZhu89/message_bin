import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Container } from "@mui/system";
import Requests from "./Requests.js";
import { getRequestsForEndpoint } from "./service.js";
const Urllist = ({
  endpoints,
  setChosenEndpoint,
  chosenEndpoint,
  chosenEndpointRequests,
  setChosenEndpointRequests,
  urlprefix,
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const chooseUUID = async (event) => {
    event.preventDefault();
    setChosenEndpoint(selectedEndpoint);
    const res = await getRequestsForEndpoint(selectedEndpoint);
    console.log("initial", res);
    if (res !== "Opps No data returned from the query.") {
      setChosenEndpointRequests(res);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <hr />

      <form onSubmit={chooseUUID}>
        <FormControl>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Typography>Choose an Endpoint</Typography>
            <Select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              sx={{ width: "350px", height: "40px", borderRadius: 28 }}
            >
              <MenuItem value="">Choose an endpoint:</MenuItem>
              {endpoints.map((endpoint) => (
                <MenuItem key={endpoint.uuid} value={endpoint.uuid}>
                  {endpoint.uuid}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#004791" }}
            >
              View
            </Button>
          </Container>
        </FormControl>
      </form>
      <Requests chosenEndpointRequests={chosenEndpointRequests} />
    </Container>
  );
};

export default Urllist;
