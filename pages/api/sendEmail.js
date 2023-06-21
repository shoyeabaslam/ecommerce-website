import nodemailer from "nodemailer";

export default function handler(req, res) {
  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "kashmirizon@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const { email, subject, html ,toEmail} = req.body;

    const mailOptions = {
      from: email,
      to: toEmail,
      subject:subject,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
