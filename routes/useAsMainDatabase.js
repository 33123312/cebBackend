const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter");

let user;
let password

routes.post("/useAsMainDatabase",(req,res) =>{
    let info = req.body;

    user = info.user;
    password = info.password

    if(info.type == "backup"){
        chargeBackup(info.periodo,info.file)
        res.sendStatus(200)
    }
    else if (info.type == "periodoBackup"){
        chargePeriodo(info.periodo)
        res.sendStatus(200)
    }
    else
        res.sendStatus(400)

})

function chargeBackup(file,periodo){
    let dir =  "backups/" + file;
    executeShell(periodo,dir)
}

function chargePeriodo(periodo){
    let dir =  periodo + ".sql"
    executeShell(periodo,dir)
}

function executeShell(periodo, dir){
    let finDir = "/mysqlDumps/" + periodo + "/" + dir;

    let shell = "mysql -u " + user+ " -p" + password + "  cebdatabase < " + finDir
    shellExecuter(shell)
}

module.exports = routes;