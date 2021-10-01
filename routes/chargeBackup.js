
const express = require("express")

const routes = express.Router();

let user;
let password;

routes.post("/chargeBackup",(req,res)=>{
    let backInfo = req.body;

    user = backInfo.user
    password = backInfo.password

    if(backInfo.type == "backup"){
        chargeBackup(backInfo.periodo,backInfo.file)
        res.sendStatus(200)
    }
    else if (backInfo.type == "periodoBackup"){
        chargePeriodoBackup(backInfo.periodo,backInfo.file)
        res.sendStatus(200)
    }
    else
        res.sendStatus(400)

})

async function chargeBackup (periodo,file){

    let route = "/mysqlDumps/" + periodo + "/backups/";

    concactAndExecute(route,file)

}

async function chargePeriodoBackup(periodo,file){

    let route = "/mysqlDumps/" + periodo + "/";
    concactAndExecute(route,file)

}

function concactAndExecute(route,file){

    let fullRoute = route + file
    executeShell(fullRoute)
}

function executeShell(comand){
    

    let shell = "mysql -u " + user+ " -p" + password + "  backDatabase < " + comand
    console.log(shell);

    const { exec } = require('child_process');
    exec(shell, (err, stdout, stderr) => {
        if (err) 
            return;
        

        });
}

module.exports = routes;