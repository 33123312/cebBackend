const express = require("express")
const routes =  express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/deletePeriodoBackDir/:periodo",(req,res) =>{
     deleteDir(req.params.periodo)
     res.sendStatus(200)
})

async function deleteDir(dir){
    let cmd = "rm -r /mysqlDumps/" + dir;
    console.log(cmd)
    shellExecuter(cmd);

}

module.exports = routes;