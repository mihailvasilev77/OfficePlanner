const Vacation = require('../model/Vacation');
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

const handleVacation = async (req, res) => {
  const { user, startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start and end date are required.' });
  }

  const result = await Vacation.create({
    username: user,
    startDate,
    endDate,
  });

  res.status(201).json({
    success: `Vacation from ${result.startDate} to ${result.endDate} for ${result.username} approved!`,
  });

  // Fire-and-forget notification
  sendNotificationEmail(
    'Vacation Approved',
    `Vacation from ${startDate} to ${endDate} for ${user} has been approved.`,
  );
};

const getAllVacations = async (req, res) => {
  const vacations = await Vacation.find();
  if (!vacations?.length) {
    return res.status(204).json({ message: 'No vacations found' });
  }
  res.json(vacations);
};

const getVacation = async (req, res) => {
  if (!req.params?.id) {
    return res.status(400).json({ message: 'Vacation ID required' });
  }

  const vacation = await Vacation.findById(req.params.id).exec();
  if (!vacation) {
    return res.status(404).json({ message: `Vacation ID ${req.params.id} not found` });
  }

  res.json(vacation);
};

/**
 * NEW endpoint: GET /vacation/user/:username
 *
 * Returns vacations filtered by username. The old PersonalCalendar
 * fetched ALL vacations and filtered client-side — now the backend
 * does the filtering, which is far more efficient.
 */
const getVacationsByUsername = async (req, res) => {
  if (!req.params?.username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const vacations = await Vacation.find({ username: req.params.username });
  if (!vacations?.length) {
    return res.status(204).json({ message: 'No vacations found for this user' });
  }

  res.json(vacations);
};

module.exports = { handleVacation, getAllVacations, getVacation, getVacationsByUsername };
