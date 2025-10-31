import User from '../models/user.js';

// listar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: 'success', users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// actualizar un usuario por ID
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// liminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};