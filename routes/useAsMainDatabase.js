const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter");

let user;
let password
let response

routes.post("/useAsMainDatabase",(req,res) =>{
    let info = req.body;

    response = res;

    if(info.type == "backup")
        chargeBackup(info.periodo,info.file)
    
    else if (info.type == "periodoBackup")
        chargePeriodo(info.periodo)    
    else
        res.sendStatus(400)

})

function chargeBackup(periodo,file){
    let dir =  "backups/" + file;
    executeShell(periodo,dir)
}

function chargePeriodo(periodo){
    let dir =  periodo + ".sql"
    executeShell(periodo,dir)
}

function executeShell(periodo, dir){
    let finDir = "/mysqlDumps/" + periodo + "/" + dir;

    let shell = "mysql -u " + process.env.DB_USER + " -p" + process.env.DB_PASS + "  cebdatabase < " + finDir

    shellExecuter(shell).
    then(()=>response.sendStatus(200)).
    catch(error=>response.sendStatus(400))
}

module.exports = routes;