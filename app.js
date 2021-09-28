const express = require("express");

const app = new express();

app.listen(3000,() => console.log("server en el 3000"));


app.get('/downloadSystemUpdate', function(req, res){
    const file = `${__dirname}/sistemaBuilds/SisemaCebGradle.jar`;
    res.download(file);
  });


app.get('/consultSystemV', function(req, res){
    let varJson = require("./sistemaBuilds/systemV.json")

    res.send(varJson.version);
  });
