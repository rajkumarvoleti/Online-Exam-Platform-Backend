"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlers_1 = require("../handlers/errorHandlers");
function makeExpressCallback(controller) {
    return (req, res) => {
        // console.log("line 7");
        // console.log(req.session.id);
        const httpRequest = {
            body: req.body,
            query: req.query,
            session: req.session,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        };
        (0, errorHandlers_1.catchErrors)(controller(httpRequest)
            .then((httpResponse) => {
            // console.log("line 25");
            // console.log(httpResponse.body);
            if (httpResponse.headers)
                res.set(httpResponse.headers);
            if (httpResponse.clearCookie)
                res.clearCookie(req.session.id);
            if (httpResponse.body.isAuth) {
                // console.log("hello");
                req.session.user = httpResponse.body.user;
                httpResponse.session = req.session;
            }
            // console.log("Line 34");
            // console.log(req.session);
            res.type('json');
            res.status(httpResponse.statusCode).send(httpResponse.body);
        })
            .catch((error) => res.status(500).send({ error })));
    };
}
exports.default = makeExpressCallback;
//# sourceMappingURL=express-callback.js.map