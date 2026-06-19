const  nodemailer = require('nodemailer')

exports.sendMaiil = async (to , subject , text )=>{
   try {
       const smtpPort = Number(process.env.SMTP_PORT || 587)
       const transportser = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: smtpPort,
        secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
        auth:{
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS
        },
        family: 4,
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 30000
       })
       await transportser.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text
       })
   } catch (error) {
    console.log("error in sending mail",error)
    throw error
   } 
}
