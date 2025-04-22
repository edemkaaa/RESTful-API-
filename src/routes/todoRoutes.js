const express = require('express');
const router = express.Router();
const todoRepository = require('../repositories/todoRepository');

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Получить все задачи
 *     responses:
 *       200:
 *         description: Список всех задач
 */
router.get('/', (req, res) => {
    const todos = todoRepository.findAll();
    res.json(todos);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Создать новую задачу
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Задача создана
 */
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Требуются title и description' });
    }
    
    const todo = todoRepository.create({ title, description });
    res.status(201).json(todo);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Задача найдена
 *       404:
 *         description: Задача не найдена
 */
router.get('/:id', (req, res) => {
    const todo = todoRepository.findById(parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json(todo);
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Обновить задачу по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Задача обновлена
 *       404:
 *         description: Задача не найдена
 */
router.put('/:id', (req, res) => {
    const todo = todoRepository.update(parseInt(req.params.id), req.body);
    if (!todo) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json(todo);
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Удалить задачу по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
router.delete('/:id', (req, res) => {
    const success = todoRepository.delete(parseInt(req.params.id));
    if (!success) {
        return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.status(204).send();
});

module.exports = router;