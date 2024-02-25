const Vacation = require('../model/Vacation');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'ification.sender@gmail.com',
    pass: 'gczf cmaw gxrs ngus'
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendNotificationEmail = async (subject, text) => {
  const mailOptions = {
    from: 'ification.sender@gmail.com',
    to: 'mihailbg2005@gmail.com', // Replace with the recipient's email
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

const handleVacation = async (req, res) => {
    const { user, startDate, endDate} = req.body;
    if (!startDate || !endDate) return res.status(400).json({ 'message': 'Start and end date are required.' });
  
    try {
        const result = await Vacation.create({
            "username": user,
            "startDate": startDate,
            "endDate" : endDate
        });
        console.log(result);
        await sendNotificationEmail('New Vacation Created', `New vacation from ${startDate} to ${endDate} from ${user} was added!`);

        res.status(201).json({ 'success': `New vacation from ${startDate} to ${endDate} from ${user} was added!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllVacations = async (req, res) => {
    try {
      const vacations = await Vacation.find();
      if (!vacations || vacations.length === 0) {
        return res.status(204).json({ 'message': 'No vacation found' });
      }
      console.log(vacations);
      res.json(vacations);
    } catch (error) {
      console.error('Error fetching vacations:', error);
      res.status(500).json({ 'message': 'Internal Server Error' });
    }
 }

module.exports = { handleVacation, getAllVacations}