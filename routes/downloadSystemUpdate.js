const express = require("express")

const route = express.Router();

route.get('/downloadSystemUpdate', function(req, res){
    const file = `${__dirname}/../sistemaBuilds/SisemaCebGradle.jar`;
    res.download(file);
  });

  module.exports  = route;