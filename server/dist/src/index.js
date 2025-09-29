"use strict";
// SERVER
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = Number(process.env.PORT) || 3000;
app_1.app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on part ${port}`);
});
//# sourceMappingURL=index.js.map