const express = require("express")
const routes =  express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/deletePeriodoBackDir/:periodo",(req,res) =>{
     deleteDir(req.params.periodo,res)
})

async function deleteDir(dir,res){
    let cmd = "rm -r /mysqlDumps/" + dir;
    shellExecuter(cmd,()=>{
        res.sendStatus(200);
    });

}

module.exports = routes;