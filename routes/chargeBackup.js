
const express = require("express")
const shellExecuter = require("./shellExecuter")

const routes = express.Router();

let response;

routes.post("/chargeBackup",(req,res)=>{
    let backInfo = req.body;

    response = res;

    if(backInfo.type == "backup"){
        chargeBackup(backInfo.periodo,backInfo.file)
    }
    else if (backInfo.type == "periodoBackup"){
        chargePeriodoBackup(backInfo.periodo)
    }
    else
        res.sendStatus(400)

})

async function chargeBackup (periodo,file){

    let route = "/mysqlDumps/" + periodo + "/backups/";

    concactAndExecute(route,file)

}

async function chargePeriodoBackup(periodo){
    let route = "/mysqlDumps/" + periodo + "/";
    concactAndExecute(route,periodo + ".sql")

}

function concactAndExecute(route,file){

    let fullRoute = route + file
    executeShell(fullRoute)
}

function executeShell(comand){
    let shell = "mysql -u root -pPupet6113ñ$ backDatabase < " + comand
    shellExecuter(shell).
        then(()=>response.sendStatus(200)).
        catch(()=>response.sendStatus(400))
    
}

module.exports = routes;