const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASS,
    },
  });

async function send_mail(link,username,email,use){
    try{    
        const uses = {
          register:{
            first:"Email Confirmation for Fun Blog",
            second: "Welcome "+username+" to Fun Blog! You are one step away from creating your account! Click the link below for email verification."
          },
          reset:{
            first:"Password Reset for Fun Blog",
            second:"Welcome "+username+" to Fun Blog! You are one step away from resetting your password! Click the link below to reset your password."
          },
        }
        const info = await transporter.sendMail({
        from: '"Fun Blog" <jehhernecomputing@gmail.com>', // sender address
        to: email, // list of receivers
        subject: uses[use].first, // Subject line
        text: uses[use].second, // plain text body
        html: "<a href="+link+">Click Here</a>"
    });
    console.log("Email sent: ", info.response);
    return info;
    } catch (error) {
    console.error("Error sending email:", error);
    throw error;
    }
    }

module.exports = send_mail