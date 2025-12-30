"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const SubscribeRouter_1 = __importDefault(require("./routes/SubscribeRouter"));
const BlogRouter_1 = __importDefault(require("./routes/BlogRouter"));
const BlogInteractionRouter_1 = __importDefault(require("./routes/BlogInteractionRouter"));
const appConf = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)());
    // routes
    app.use("/mail", ContactRoutes_1.default);
    app.use("/sub", SubscribeRouter_1.default);
    app.use("/blog", BlogRouter_1.default);
    app.use("/action", BlogInteractionRouter_1.default);
    app.get("/", (req, res) => {
        return res.status(200).json({
            message: "default get them wella"
        });
    });
};
exports.default = appConf;
