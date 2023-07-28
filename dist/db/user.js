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
function makeUserDb({ makeDb }) {
    function findByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const user = yield db.user.findUnique({
                where: {
                    email
                }
            });
            return user;
        });
    }
    function create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const user = yield db.user.create({
                data: {
                    email: userData.email,
                    firstName: userData.firstName,
                    password: userData.hashedPassword,
                    phoneNumber: userData.phoneNumber,
                    voucherCode: userData.voucherCode
                }
            });
            return user;
        });
    }
    function update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const updatedUser = yield db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    country: user.country,
                    timezone: user.timezone,
                    tagline: user.tagline,
                    bio: user.bio,
                }
            });
            return updatedUser;
        });
    }
    function updatePassword(password, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = makeDb();
            const updatedUser = db.user.update({
                where: {
                    id
                },
                data: {
                    password
                }
            });
            return updatedUser;
        });
    }
    return { findByEmail, create, update, updatePassword };
}
exports.default = makeUserDb;
//# sourceMappingURL=user.js.map