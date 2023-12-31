const { Server } = require("socket.io");
const { readFileSync } = require("fs");
const { createServer } = require("https");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const pgService = require("./services/pgService.js");
const crypto = require("crypto");
// const mgService = require('./mgService.js')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

let prefix;
let io;
if (process.env.NODE_ENV === "development") {
  prefix = process.env.DEVURL;
  io = new Server({ cors: { orgins: "*" } });
  io.listen(3002);
} else {
  prefix = process.env.PRODURL;
  const httpsServer = createServer({
    key: readFileSync(process.env.SSLKEY),
    cert: readFileSync(process.env.SSLCERT),
  });
  httpsServer.listen(3002);
  io = new Server(httpsServer, {
    cors: {
      origins: "*",
    },
  });
}

io.on("connection", (socket) => {
  console.log("socket.io connected");
});

//get new uuid & insert to requestbin table
app.get("/createuuid", async (req, res) => {
  const uuid = crypto.randomUUID();
  try {
    await pgService.insertUUID({ uuid: uuid });
    res.send({ prefix, uuid });
  } catch (err) {
    res.send("Opps " + err.message);
  }
});

//send body
app.post("/questbin/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const requestData = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    url: req.originalUrl,
    query: req.query,
  };

  try {
    const dbResponse = await pgService.insertRequestData({ uuid, requestData });
    io.sockets.emit("new", { uuid, data: dbResponse });
    res.sendStatus(200);
  } catch (err) {
    res.send("Opps " + err.message);
  }
});

//get all uuid
app.get("/uuids", async (req, res) => {
  try {
    const dbResponse = await pgService.getAlluuids();
    res.send({ uuids: dbResponse, prefix });
  } catch (err) {
    res.send("Opps " + err.message);
  }
});

//get all data related to one uuid
app.get("/requests/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const dbResponse = await pgService.getUuidData(uuid);
    res.send(dbResponse);
  } catch (err) {
    res.send("Opps " + err.message);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
