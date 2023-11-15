"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternMatch = void 0;
const error_1 = require("./error");
function PatternMatch(...options) {
    return (...handlers) => {
        return (input) => {
            for (let i = 0; i < options.length; i++) {
                const constructor = options[i];
                const handler = handlers[i];
                if (input instanceof constructor) {
                    return handler(input);
                }
            }
            throw new error_1.LinkerError(input.Location, `No handler found. This is definitely a bug with the compiler.\nFound: ${input.constructor.name}`);
        };
    };
}
exports.PatternMatch = PatternMatch;
//# sourceMappingURL=pattern-match.js.map