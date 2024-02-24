const Pending = require('../model/Pending');

const handleRequest = async (req, res) => {
    const { user, startDate, endDate} = req.body;
    if (!startDate || !endDate) return res.status(400).json({ 'message': 'Start and end date are required.' });

    try {
        const result = await Pending.create({
            "username": user,
            "startDate": startDate,
            "endDate" : endDate
        });
        console.log(result);

        res.status(201).json({ 'success': `New pending request for vacation from ${startDate} to ${endDate} from ${user} was added!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRequest };