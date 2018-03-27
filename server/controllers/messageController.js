const NodeMailer = require('./../config/services/Nodemailer');

module.exports = {
  sendEmail: async (req, res) => {
    const message = req.body;
    const emailer = new NodeMailer(message);
    await emailer.sendEmail();
    res.status(200).send("Okay");
  }
}
