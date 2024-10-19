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
exports.TaskManager = void 0;
const task_1 = require("./models/task");
class TaskManager {
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new task_1.Task({ title, description, isCompleted: false });
            return yield task.save();
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.find();
        });
    }
    updateTask(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTask = yield task_1.Task.findByIdAndUpdate(id, { title, description }, { new: true });
            return updatedTask;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.findByIdAndDelete(id);
        });
    }
    markCompleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
        });
    }
    markPending(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.findByIdAndUpdate(id, { isCompleted: false }, { new: true });
        });
    }
    getPendings() {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.find({ isCompleted: false });
        });
    }
    getCompleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return task_1.Task.find({ isCompleted: true });
        });
    }
}
exports.TaskManager = TaskManager;
