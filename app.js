const express = require("express");
const photoRouter = require("./routes/photo-routes");

const app = express();
app.use(express.json());
app.use("/", photoRouter);

app.listen(5001, console.log("Server is listening on port 5001."));
