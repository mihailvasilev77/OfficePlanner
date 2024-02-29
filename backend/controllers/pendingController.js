const Pending = require('../model/Pending');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendNotificationEmail = async (subject, text) => {
  const mailOptions = {
    from: 'Vacation platform',
    to: 'mihailbg2005@gmail.com',
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully.');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

const getPendings = async (req, res) => {
  const pendings = await Pending.find();
  if (!pendings) return res.status(204).json({ 'message': 'No pendings found' });
  console.log(pendings);
  res.json(pendings);
}

const getPending = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'Pending ID required' });
  const pending = await Pending.findOne({ _id: req.params.id }).exec();
  if (!pending) {
      return res.status(204).json({ 'message': `Pending ID ${req.params.id} not found` });
  }
  res.json(pending);
}

const deletePending = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'Pending ID required' });
  const pending = await Pending.findOne({ _id: req.params.id }).exec();
  if (!pending) {
      return res.status(204).json({ 'message': `Pending ID ${req.params.id} not found` });
  }
  const result = await pending.deleteOne({ _id: req.params.id });
  res.json(result);
  
  await sendNotificationEmail('Vacation Denied', `Your vacation was not approved!`);
}

module.exports = { getPendings, getPending, deletePending}