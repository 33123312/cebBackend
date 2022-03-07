const express = require("express")
const routes =  express.Router();
const shellExecuter = require("./shellExecuter")

routes.post("/deletePeriodoBackDir/:periodo",(req,res) =>{
     deleteDir(req.params.periodo,res)
})

async function deleteDir(dir,res){
    let cmd = "rm -r /mysqlDumps/" + dir;
    shellExecuter(cmd).
    then(()=>res.sendStatus(200)).
    catch( err = res.send(err => res.send(err).sendStatus(400)));

}

module.exports = routes;