const express = require("express")

const routes = express.Router();

routes.post("/getPeriodosBack",(req,res)=>{

    const fs = require('fs');

    fs.readdir("/mysqlDumps", (err, files) => {
        let filesArray = [0]
      files.forEach(file => {
        filesArray.push(file + ".sql")

      });
    });

    res.send(fs).sendStatus(200);

})

module.exports = routes;