"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const client = axios_1.default.create({ baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` });
const customRequest = (_a) => {
    var options = __rest(_a, []);
    const onSuccess = (response) => {
        console.log("response");
        console.log(response);
        return response.data;
    };
    const onError = (error) => {
        var _a;
        console.log("error");
        console.log(error);
        return (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
    };
    return client(options).then(onSuccess).catch(onError);
};
exports.customRequest = customRequest;
//# sourceMappingURL=index.js.map