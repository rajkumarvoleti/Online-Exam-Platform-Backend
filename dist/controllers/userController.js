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
exports.updatePassword = exports.updateUser = exports.authCheck = exports.signout = exports.externalSignin = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const userHandler_1 = require("../handlers/userHandler");
const auth_1 = require("../handlers/axios/auth");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const signup = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield (0, userHandler_1.makeUser)(req.body);
    const exsistingUser = yield db_1.userDb.findByEmail({ email: userData.email });
    if (exsistingUser) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: { error: "User already exsists" }
        };
    }
    const user = yield db_1.userDb.create(userData);
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
            'Last-Modified': user.updatedAt.toUTCString()
        },
        body: { user }
    };
});
exports.signup = signup;
const signin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.userDb.findByEmail({ email });
    if (!user) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: { error: "User doesn't exsists" }
        };
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: { error: "Incorrect password" }
        };
    }
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { user, isAuth: true }
    };
});
exports.signin = signin;
const externalSignin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, service } = req.body;
    let userDetails = {
        email: "",
        firstName: ""
    };
    if (service === "google")
        userDetails = yield googleSignin({ accessToken });
    else if (service === "microsoft")
        userDetails = yield microsoftSignin({ accessToken });
    const exsistingUser = yield db_1.userDb.findByEmail({ email: userDetails.email });
    if (exsistingUser) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { user: exsistingUser, isAuth: true }
        };
    }
    const userData = yield (0, userHandler_1.makeUser)({ email: userDetails.email, firstName: userDetails.firstName, password: "123" });
    const user = yield db_1.userDb.create(userData);
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
            'Last-Modified': user.updatedAt.toUTCString()
        },
        body: { user, isAuth: true }
    };
});
exports.externalSignin = externalSignin;
const googleSignin = ({ accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, auth_1.googleSigninRequest)({ accessToken });
    return { email: data.email, firstName: data.name };
});
const microsoftSignin = ({ accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, jwt_decode_1.default)(accessToken);
    return { email: data.email, firstName: data.name };
});
const signout = (req) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            throw err;
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { clearCookie: true }
        };
    });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Logged out" }
    };
});
exports.signout = signout;
const authCheck = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    console.log(req.session);
    if (user) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { msg: "Authorized", user }
        };
    }
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Unauthorized" }
    };
});
exports.authCheck = authCheck;
const updateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = Object.assign({}, body);
    const updatedUser = yield db_1.userDb.update(user);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { user: updatedUser }
    };
});
exports.updateUser = updateUser;
const updatePassword = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.session);
    const { currentPassword, newPassword } = req.body;
    const isMatch = yield bcrypt_1.default.compare(currentPassword, req.session.user.password);
    if (!isMatch) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: { error: "Incorrect password" }
        };
    }
    yield db_1.userDb.updatePassword(newPassword, req.session.user.id);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Updated Password Successfully" }
    };
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=userController.js.map