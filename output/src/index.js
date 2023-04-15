"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attributeValues_1 = __importDefault(require("../src/routes/attributeValues"));
const attributes_1 = __importDefault(require("../src/routes/attributes"));
const categories_1 = __importDefault(require("../src/routes/categories"));
const products_1 = __importDefault(require("../src/routes/products"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use('/categories', categories_1.default);
app.use('/products', products_1.default);
app.use('/attributes', attributes_1.default);
app.use('/attributeValues', attributeValues_1.default);
app.get('/', (req, res) => {
    res.send('<h1>Check: Server is running</h1>');
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map