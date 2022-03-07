const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/createPeriodoBackupsDir",(req,res) =>{
    let info = req.body;
    createPeriodoDir(info.periodo,res);

})

function createPeriodoDir(periodo,res){
    let comand = "mkdir /mysqlDumps/" + periodo
    shellExecuter(comand).then(()=>{
        comand = comand + "/backups"
        shellExecuter(comand).
            then(() =>res.sendStatus(200)).
            catch(error=>res.sendStatus(400))
    }).catch(error=>res.sendStatus(400))


}

module.exports = routes;