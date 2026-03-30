const Pending = require('../model/Pending');
const nodemailer = require('nodemailer');

// ── Email transport (only if configured) ────────────────────────────
let transporter = null;
if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
}

const sendNotificationEmail = async (subject, text) => {
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: 'Vacation Platform',
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

const getPendings = async (req, res) => {
  const pendings = await Pending.find();
  if (!pendings?.length) {
    return res.status(204).json({ message: 'No pendings found' });
  }
  res.json(pendings);
};

const getPending = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'Pending ID required' });
  }

  const pending = await Pending.findById(req.params.id).exec();
  if (!pending) {
    return res.status(404).json({ message: `Pending ID ${req.params.id} not found` });
  }

  res.json(pending);
};

const deletePending = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'Pending ID required' });
  }

  const pending = await Pending.findById(req.params.id).exec();
  if (!pending) {
    return res.status(404).json({ message: `Pending ID ${req.params.id} not found` });
  }

  const result = await pending.deleteOne();
  res.json(result);

  // Fire-and-forget notification
  sendNotificationEmail(
    'Vacation Request Denied',
    `Vacation request for ${pending.username} was denied.`,
  );
};

module.exports = { getPendings, getPending, deletePending };
