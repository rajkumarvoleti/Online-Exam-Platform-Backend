"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
exports.appSession = (0, express_session_1.default)({
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        sameSite: false,
        secure: false
    },
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new FileStore()
    // store: new PrismaSessionStore(
    //   new PrismaClient(),
    //   {
    //     checkPeriod: 2 * 60 * 1000,  // ms
    //     dbRecordIdIsSessionId: true,
    //     dbRecordIdFunction: undefined,
    //   },
    // )
});
//# sourceMappingURL=session.js.map