const express = require("express")

const routes = express.Router();

routes.get("/getPeriodosBack",(req,res)=>{

    let fs = require('fs');

    fs.readdir("/mysqlDumps", (err, files) => {
      if(files != undefined){

        let filesArray = [0]
        files.forEach(file => {
          filesArray.push(file + ".sql")
        });
        console.log(filesArray)
        res.json({"list":filesArray}).sendStatus(200);

      } else
        res.sendStatus(404);


    });

    

})

module.exports = routes;