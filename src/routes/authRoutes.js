const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Требуются username и password' });
        }

        const existingUser = await userRepository.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'Пользователь уже существует' });
        }

        const user = await userRepository.create(username, password);
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход в систему
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userRepository.findByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        const isValidPassword = await userRepository.validatePassword(user, password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при входе' });
    }
});

module.exports = router;