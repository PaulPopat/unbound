"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStore = void 0;
const error_1 = require("../error");
function WriteStore(store) {
    const type = store.Type;
    if (!type)
        throw new error_1.WriterError(store.Location, "Failed to link store type");
}
exports.WriteStore = WriteStore;
//# sourceMappingURL=statement.js.map