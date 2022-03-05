const express = require("express")

const routes = express.Router();

routes.get("/getBack/:periodo",(req,res)=>{
    let periodo = req.params.periodo;

    const fs = require('fs');

    fs.readdir("/mysqlDumps/" + periodo + "/backups/", (err, files) => {
      console.log(periodo,err,files)
        if(err)
          return res.sendStatus(400)
        
          let filesArray = []

          files.forEach(file => {
            filesArray.push(file)
          });

          res.status(200).json({"list":filesArray});

    });

    

})

module.exports = routes;