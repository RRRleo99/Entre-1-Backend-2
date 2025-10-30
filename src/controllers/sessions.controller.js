import User from '../models/user.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ status: 'error', message: 'User already exists' });

    const hashedPassword = createHash(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    res.status(201).json({ status: 'success', message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: 'error', message: 'User not found' });

    if (!isValidPassword(user, password)) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ status: 'success', message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const current = (req, res) => {
  res.json({ status: 'success', user: req.user });
};