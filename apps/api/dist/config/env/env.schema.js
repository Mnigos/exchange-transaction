"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "envSchema", {
    enumerable: true,
    get: function() {
        return envSchema;
    }
});
const _zod = require("zod");
const envSchema = _zod.z.object({
    PORT: _zod.z.coerce.number().optional().default(4000),
    API_URL: _zod.z.string().url(),
    API_KEY: _zod.z.string().min(1)
});

//# sourceMappingURL=env.schema.js.map