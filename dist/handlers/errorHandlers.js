"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionErrors = exports.developmentErrors = exports.notFound = exports.catchErrors = void 0;
const catchErrors = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};
exports.catchErrors = catchErrors;
const notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};
exports.notFound = notFound;
const developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    console.log(errorDetails);
    res.status(err.status || 500);
    res.json({ errorDetails });
};
exports.developmentErrors = developmentErrors;
/*
  Production Error Handler

  No stacktraces are leaked to user
*/
const productionErrors = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message });
};
exports.productionErrors = productionErrors;
//# sourceMappingURL=errorHandlers.js.map