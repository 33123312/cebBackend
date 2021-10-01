
const express = require("express")

const routes = express.Router();

routes.post("/orderBackup",(req,res)=>{
    let backInfo = req.body;

    console.log(backInfo)


    if(backInfo.type == "backup"){
        orderBackup(backInfo.periodo,backInfo.user,backInfo.password)
        res.sendStatus(200)
    }
        
    else if (backInfo.type == "periodoBackup"){
        orderPeriodoBackup(backInfo.periodo,backInfo.user,backInfo.password)
        res.sendStatus(200)
        }
    else
        res.sendStatus(400)

    
    
})

async function orderBackup (periodo,user,password){
    let date_ob = new Date();

    let name = periodo + "-" + date_ob.getDate() + "-" + date_ob.getMonth() + "-" + date_ob.getFullYear() + "-" + date_ob.getHours() + "-" + date_ob.getSeconds();

    let route = "/mysqlDumps/" + periodo + "/backups/";

    let fullRoute = route + name + ".sql"

    executeDump(user,password,fullRoute);

}

async function orderPeriodoBackup(periodo,user,password){
    createPeriodoDir(periodo)
    let route = "/mysqlDumps/" + periodo + "/" + periodo + ".sql";

    executeDump(user,password,route);

}

function createPeriodoDir(periodo){
    let comand = "mkdir /mysqlDumps/" + periodo
    executeShell(comand)
    comand = comand + "/backups"
    executeShell(comand)

}

function executeDump(user, password, route){
    let comand = "mysqldump -u " + user + " -p" + password + " cebdatabase > " + route

    executeShell(comand)


}

function executeShell(comand){
    console.log(comand)
    const { exec } = require('child_process');
    exec(comand, (err, stdout, stderr) => {
        if (err) {
            return;
        }
    
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        });

}

module.exports = routes;
