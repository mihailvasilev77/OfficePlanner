const Pending = require('../model/Pending');

const handleRequest = async (req, res) => {
  const { user, startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start and end date are required.' });
  }

  const result = await Pending.create({
    username: user,
    startDate,
    endDate,
  });

  res.status(201).json({
    success: `New pending request from ${result.startDate} to ${result.endDate} by ${result.username} was added!`,
  });
};

module.exports = { handleRequest };
