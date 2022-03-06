module.exports = 
    {
        host  : process.env.MAIL_HOST,
        port  : process.env.MAIL_PORT,
        secure: process.env.MAIL_SECU, // true for 465, false for other ports
        pool:true,
        auth: {
          user: process.env.MAIL_ACC, // generated ethereal user
          pass: process.env.MAIL_PASS, // generated ethereal password
        },
      }