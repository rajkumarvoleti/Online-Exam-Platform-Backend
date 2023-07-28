"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSigninRequest = void 0;
const _1 = require(".");
const googleSigninRequest = ({ accessToken }) => {
    return (0, _1.customRequest)({ url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, method: 'get', headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
        }
    });
};
exports.googleSigninRequest = googleSigninRequest;
//# sourceMappingURL=auth.js.map