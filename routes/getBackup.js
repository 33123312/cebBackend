const express = require("express")

const routes = express.Router();

routes.get("/getBack/:periodo",(req,res)=>{
    let periodo = req.params.periodo;

    const fs = require('fs');

    fs.readdir("/mysqlDumps/" + periodo + "/backups/", (err, files) => {
        if(files != undefined){
          let filesArray = [0]
          files.forEach(file => {
            filesArray.push(file)
          });

          res.json({"list":fs}).sendStatus(200);

        } else 
          res.sendStatus(404)

          
    });

    

})

module.exports = routes;