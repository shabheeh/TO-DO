import { Request, Response } from "express";
import { TaskManager } from "../taskManager";

const taskManager = new TaskManager();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await taskManager.getTasks();
        const completedTasks = await taskManager.getCompleted();
        const pendingTasks = await taskManager.getPendings();

        res.status(200).render('todo',{
            tasks,
            completedTasks,
            pendingTasks,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching tasks',
        });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({
            success: false,
            message: 'title and description are required'
        });
        return
    }

    try {
        const newTask = await taskManager.createTask(title, description);

        if (newTask) {
            res.status(201).json({
                newTask,
                success: true
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to create new task'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating new task'
        });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({
            success: false,
            message: 'title and description are required'
        });
    }

    try {
        const updatedTask = await taskManager.updateTask(id, title, description);

        if (updatedTask) {
            res.status(200).json({
                updatedTask,
                success: true
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task'
        });
    }
};

export const markCompleted = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const completedTask = await taskManager.markCompleted(id);
        if (completedTask) {
            res.status(200).json({
                completedTask,
                success: true,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task to completed'
        });
    }
};

export const markPending = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const pendingTask = await taskManager.markPending(id);
        if (pendingTask) {
            res.status(200).json({
                pendingTask,
                success: true,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the task to pending'
        });
    }
};


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedTask = await taskManager.deleteTask(id);
        if (deletedTask) {
            res.status(200).json({
                deletedTask,
                success: true,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Task was not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the task'
        });
    }
};
