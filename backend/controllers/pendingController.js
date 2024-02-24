const Pending = require('../model/Pending');

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
}

module.exports = { getPendings, getPending, deletePending}