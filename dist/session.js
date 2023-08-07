"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSession = void 0;
const client_1 = require("@prisma/client");
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const express_session_1 = __importDefault(require("express-session"));
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
    store: new prisma_session_store_1.PrismaSessionStore(new client_1.PrismaClient(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    })
});
//# sourceMappingURL=session.js.map