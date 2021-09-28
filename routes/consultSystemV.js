const express = require("express")

const route = express.Router();

route.get('/consultSystemV', function(req, res){
    let varJson = require("./../sistemaBuilds/systemV.json")

    res.send(varJson.version);
  });


module.exports = route;
