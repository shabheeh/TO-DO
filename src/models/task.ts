import mongoose, {Schema, Document} from "mongoose";

export interface TaskInterface extends Document {
    title: string;
    description: string;
    isCompleted: boolean;
}

const TaskSchema: Schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    isCompleted: {
        type: Boolean,
        default: false
    }
})

export const Task = mongoose.model<TaskInterface>('Task', TaskSchema);