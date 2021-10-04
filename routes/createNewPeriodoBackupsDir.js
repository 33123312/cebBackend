const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/createPeriodoBackupsDir",(req,res) =>{
    let info = req.body;
    createPeriodoDir(info.periodo);
    res.sendStatus(200)

})

function createPeriodoDir(periodo){
    let comand = "mkdir /mysqlDumps/" + periodo
    shellExecuter(comand)
    comand = comand + "/backups"
    shellExecuter(comand)

}

module.exports = routes;