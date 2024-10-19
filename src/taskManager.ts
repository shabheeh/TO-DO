import { Task, TaskInterface } from "./models/task";

export class TaskManager {
    public async createTask(title: string, description: string): Promise<TaskInterface> {
        const task = new Task({ title, description, isCompleted: false });
        return await task.save();
    }

    public async getTasks(): Promise<TaskInterface[]> {
        return Task.find();
    }

    public async updateTask(id: string, title: string, description: string): Promise<TaskInterface | null> {
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { title, description },
            { new: true }
        );
        return updatedTask; 
    }

    public async deleteTask(id: string): Promise<TaskInterface | null> {
        return Task.findByIdAndDelete(id); 
    }

    public async markCompleted(id: string): Promise<TaskInterface | null> {
        return Task.findByIdAndUpdate(
            id, 
            { isCompleted: true },
            { new: true }
        );
    }

    public async markPending(id: string): Promise<TaskInterface | null> {
        return Task.findByIdAndUpdate(
            id, 
            { isCompleted: false },
            { new: true }
        );
    }

    public async getPendings(): Promise<TaskInterface[]> {
        return Task.find({ isCompleted: false });
    }

    public async getCompleted(): Promise<TaskInterface[]> {
        return Task.find({ isCompleted: true });
    }
}
