const express = require("express");
require('dotenv').config()

const consultSystemV       = require("./routes/consultSystemV")
const downloadSystemUpdate = require("./routes/downloadSystemUpdate")
const orderBackup          = require("./routes/orderBackup")
const chargeBackup         = require("./routes/chargeBackup")
const getPeriodosBack      = require("./routes/getPeriodosBack")
const getBackup            = require("./routes/getBackup")
const createBackDir        = require("./routes/createNewPeriodoBackupsDir")
const deleteBackDir        = require("./routes/deletePeriodoBackDir") 
const useAsMainDatabase    = require("./routes/useAsMainDatabase") 
const passGen              = require("./routes/passwordGenerator")
const login                = require("./routes/login")

const passport = require("passport")


//const bcrypt = require("bcrypt")
//console.log(bcrypt.hashSync("pocheto", 10))

const app = new express();

app.use(express.json())

require("./Auth")
app.use(login)

app.use(passport.authenticate("jwt",{session:false}))
app.use(passGen)
app.use(consultSystemV)
app.use(downloadSystemUpdate)
app.use(orderBackup)
app.use(chargeBackup)
app.use(getPeriodosBack)
app.use(getBackup)
app.use(createBackDir)
app.use(deleteBackDir)
app.use(useAsMainDatabase)

app.listen(process.env.APP_PORT,() => console.log("running"));


