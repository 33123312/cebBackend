const express = require("express");

const consultSystemV       = require("./routes/consultSystemV")
const downloadSystemUpdate = require("./routes/downloadSystemUpdate")
const orderBackup          = require("./routes/orderBackup")
const chargeBackup =       require("./routes/chargeBackup")
const getPeriodosBack =    require("./routes/getPeriodosBack")
const getBackup =         require("./routes/getBackup")

  
const app = new express();

app.listen(3000,() => console.log("server en el 3000"));


app.use(express.json())

app.use(consultSystemV)
app.use(downloadSystemUpdate)
app.use(orderBackup)
app.use(chargeBackup)
app.use(getPeriodosBack)
app.use(getBackup)



