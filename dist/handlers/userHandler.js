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
exports.makeUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const makeUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, phoneNumber, email, password, voucherCode } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = {
        firstName,
        lastName,
        phoneNumber,
        email,
        hashedPassword,
        voucherCode
    };
    return user;
});
exports.makeUser = makeUser;
//# sourceMappingURL=userHandler.js.map