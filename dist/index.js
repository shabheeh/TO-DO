"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const path = require("path");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/', router_1.default);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// MongoDB connection
mongoose_1.default
    .connect('mongodb://localhost:27017/TO-DO', {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/tasks`);
});
