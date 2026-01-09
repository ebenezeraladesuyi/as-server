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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
const adminAuthMidddleware_1 = require("../middleware/adminAuthMidddleware");
const adminRouter = express_1.default.Router();
// Public routes
adminRouter.post('/setup', adminAuthMidddleware_1.checkAdminExists, AdminController_1.setupAdmin);
adminRouter.post('/login', AdminController_1.loginAdmin);
adminRouter.post('/forgot-password', AdminController_1.forgotPassword);
adminRouter.post('/reset-password', AdminController_1.resetPassword);
// Check if admin exists (for frontend to know if setup is needed)
adminRouter.get('/check-setup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminCount = yield require('../models/AdminModel').AdminModel.countDocuments();
        res.json({
            success: true,
            isSetup: adminCount > 0
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}));
// Protected routes
adminRouter.get('/profile', adminAuthMidddleware_1.authenticateAdmin, AdminController_1.getAdminProfile);
adminRouter.put('/change-password', adminAuthMidddleware_1.authenticateAdmin, AdminController_1.changePassword);
adminRouter.put('/update-email', adminAuthMidddleware_1.authenticateAdmin, AdminController_1.updateEmail);
adminRouter.post('/logout', adminAuthMidddleware_1.authenticateAdmin, AdminController_1.logoutAdmin);
adminRouter.get('/check-auth', adminAuthMidddleware_1.authenticateAdmin, AdminController_1.checkAuth);
exports.default = adminRouter;
