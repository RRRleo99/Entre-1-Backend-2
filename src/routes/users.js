import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users.controller.js';

const router = Router();

// listar todos los usuarios
router.get('/', getUsers);

// obtener un usuario por ID
router.get('/:id', getUserById);

// actualizar un usuario por ID
router.put('/:id', updateUser);

// eliminar un usuario por ID
router.delete('/:id', deleteUser);

export default router;