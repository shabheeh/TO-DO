"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("./controllers/taskController");
const router = (0, express_1.Router)();
// Routes
router.get('/tasks', taskController_1.getTasks);
router.post('/tasks', taskController_1.createTask);
router.put('/tasks/:id', taskController_1.updateTask);
router.patch('/tasks/:id/completed', taskController_1.markCompleted);
router.patch('/tasks/:id/pending', taskController_1.markPending);
router.delete('/tasks/:id', taskController_1.deleteTask);
exports.default = router;
