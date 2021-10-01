const express = require("express")

const routes = express.Router();

routes.get("/getPeriodosBack",(req,res)=>{

    let fs = require('fs');

    fs.readdir("/mysqlDumps", (err, files) => {
      if(files != undefined){

        let filesArray = []
        files.forEach(file => {
          filesArray.push(file + ".sql")
        });
        console.log(filesArray)
        res.status(200).json({"list":filesArray});

      } else
        res.sendStatus(404);


    });

    

})

module.exports = routes;