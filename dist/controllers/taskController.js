"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.markPending = exports.markCompleted = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const taskManager_1 = require("../taskManager");
const taskManager = new taskManager_1.TaskManager();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskManager.getTasks();
        const completedTasks = yield taskManager.getCompleted();
        const pendingTasks = yield taskManager.getPendings();
        res.status(200).render('todo', {
            tasks,
            completedTasks,
            pendingTasks,
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching tasks',
        });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({
            success: false,
            message: 'title and description are required'
        });
        return;
    }
    try {
        const newTask = yield taskManager.createTask(title, description);
        if (newTask) {
            res.status(201).json({
                newTask,
                success: true
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Failed to create new task'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating new task'
        });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({
            success: false,
            message: 'title and description are required'
        });
    }
    try {
        const updatedTask = yield taskManager.updateTask(id, title, description);
        if (updatedTask) {
            res.status(200).json({
                updatedTask,
                success: true
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task'
        });
    }
});
exports.updateTask = updateTask;
const markCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const completedTask = yield taskManager.markCompleted(id);
        if (completedTask) {
            res.status(200).json({
                completedTask,
                success: true,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task to completed'
        });
    }
});
exports.markCompleted = markCompleted;
const markPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pendingTask = yield taskManager.markPending(id);
        if (pendingTask) {
            res.status(200).json({
                pendingTask,
                success: true,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task to pending'
        });
    }
});
exports.markPending = markPending;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield taskManager.deleteTask(id);
        if (deletedTask) {
            res.status(200).json({
                deletedTask,
                success: true,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the task'
        });
    }
});
exports.deleteTask = deleteTask;
