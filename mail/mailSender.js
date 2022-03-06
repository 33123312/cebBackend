const nodemailer = require("nodemailer");
const mailCred = require("./mailCredentials")

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  transporter:nodemailer.createTransport(mailCred),
  async sendMails(mails){

    for (let index = 0; index < mails.length; index++) {
      const mail = mails[index];
      console.log(mail + "aaaa")
      this.sendMail(mail).catch(error=>console.log(error))
      await sleep(3000)
      
    }
  },
  sendMail(mail) {
    return this.transporter.sendMail({
        from:process.env.MAIL_ACC, // sender address
        to: mail.email, // list of receivers
        mail: "Hola " + (mail.nombres), // mail line
        html: mail.template
      })
  }
}
