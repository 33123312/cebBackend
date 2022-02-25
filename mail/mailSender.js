const nodemailer = require("nodemailer");
const mailCred = require("./mailCredentials")

module.exports = function (subject, template) {

    let transporter = nodemailer.createTransport(mailCred);
  
    transporter.sendMail({
      from:"eltrocdero@gmail.com", // sender address
      to: subject.email, // list of receivers
      subject: "Hola " + subject.nombre_completo, // Subject line
      html: template

    });
  
  }