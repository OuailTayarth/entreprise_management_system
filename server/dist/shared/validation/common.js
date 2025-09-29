"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = exports.zodErrorFormatter = exports.IdParamSchema = exports.IdSchema = void 0;
const zod_1 = require("zod");
exports.IdSchema = zod_1.z.coerce.number().int().positive();
exports.IdParamSchema = zod_1.z.object({ id: exports.IdSchema });
const zodErrorFormatter = (err) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = zod_1.z).treeifyError) === null || _b === void 0 ? void 0 : _b.call(_a, err)) !== null && _c !== void 0 ? _c : err.issues;
};
exports.zodErrorFormatter = zodErrorFormatter;
// Helper function to remove undefined values before passing them to Prisma
const removeUndefined = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};
exports.removeUndefined = removeUndefined;
//# sourceMappingURL=common.js.map