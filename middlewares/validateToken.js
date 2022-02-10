const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    next();
  } catch (err) { return res.status(401).json({ message: 'Expired or invalid token' }); }
   };
module.exports = validateToken; 