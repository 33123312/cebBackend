const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/createPeriodoBackupsDir/:periodo",(req,res) =>{
    createPeriodoDir(req.params.periodo);
    res.sendStatus(200)

})

function createPeriodoDir(periodo){
    let comand = "mkdir /mysqlDumps/" + periodo
    shellExecuter(comand)
    comand = comand + "/backups"
    shellExecuter(comand)

}

module.exports = routes;