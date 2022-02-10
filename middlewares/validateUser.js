const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  console.log(req.body);
    const { email } = await req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      return res.status(400).json({ message: '"email" is required' });
    }
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
     const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return res.status(409).json({ message: 'User already registered' });
    }
    next();
  };

  const validateName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName && displayName.length < 8) {
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
  };

  const validatePassword = (req, res, next) => {
    const { password } = req.body; 
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
    next();
  };

  const validateEmptyLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (email === '') {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
      if (password === '') {
        return res.status(400).json({ message: '"password" is not allowed to be empty' });
      }
      next();
  };

  module.exports = { validateEmail, validateName, validatePassword, validateEmptyLogin }; 