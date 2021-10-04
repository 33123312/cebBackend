
const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter");

let response

routes.post("/orderBackup",(req,res)=>{
    let backInfo = req.body;

    response = res;

    if(backInfo.type == "backup")
        orderBackup(backInfo.periodo,backInfo.user,backInfo.password)
    else if (backInfo.type == "periodoBackup")
        orderPeriodoBackup(backInfo.periodo,backInfo.user,backInfo.password)
        
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
    let route = "/mysqlDumps/" + periodo + "/" + periodo + ".sql";

    executeDump(user,password,route);
}


function executeDump(user, password, route){
    let comand = "mysqldump -u " + user + " -p" + password + " --no-create-db cebdatabase > " + route

    shellExecuter(comand,() =>{
        response.sendStatus(200);
    })
}



module.exports = routes;
