const express = require("express")

const routes = express.Router();

routes.post("/getBack/:periodo",(req,res)=>{
    let periodo = req.params.periodo;

    const fs = require('fs');

    fs.readdir("/mysqlDumps/" + periodo + "/backups/", (err, files) => {
        
        let filesArray = [0]
      files.forEach(file => {
        filesArray.push(file)
      });
    });

    res.send(fs).sendStatus(200);


})