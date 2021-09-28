const express = require("express");
const consultSystemV = require("./routes/consultSystemV")
const downloadSystemUpdate = require("./routes/downloadSystemUpdate")

const app = new express();

app.listen(3000,() => console.log("server en el 3000"));

app.use(consultSystemV)
app.use(downloadSystemUpdate)


