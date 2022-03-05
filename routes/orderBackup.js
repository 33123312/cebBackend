
const express = require("express")
const routes = express.Router();
const shellExecuter = require("./shellExecuter");


routes.post("/orderBackup",(req,res)=>{
    let backInfo = req.body;

    order(backInfo).then((file)=>res.status(200).sendFile(file))

})

 function order(backInfo){
    if(backInfo.type == "backup")
        return orderBackup(backInfo.periodo)
    else if (backInfo.type == "periodoBackup")
        return orderPeriodoBackup(backInfo.periodo)
}

 function orderBackup (periodo){
    let date_ob = new Date();

    let name = periodo + "-" + date_ob.getDate() + "-" + date_ob.getMonth() + "-" + date_ob.getFullYear() + "-" + date_ob.getHours() + "-" + date_ob.getSeconds();

    let route = "/mysqlDumps/" + periodo + "/backups/";

    let fullRoute = route + name + ".sql"

    return executeDump(fullRoute);

}

function orderPeriodoBackup(periodo){
    let route = "/mysqlDumps/" + periodo + "/" + periodo + ".sql";

    return executeDump(route);
}


function executeDump(route){
    let comand = "mysqldump -u " + process.env.DB_USER + " -p" + process.env.DB_PASS + " --routines --events cebdatabase > " + route
    return new Promise((succ) =>{
        shellExecuter(comand,() =>{
            const file = route;
            succ(file)
            
        })
    })
}



module.exports = routes;
