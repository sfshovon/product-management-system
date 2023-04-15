"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const devDatabase = (0, knex_1.default)(knexfile_1.default.development);
const router = express_1.default.Router();
// Create Product
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const { product_name, product_price, product_details, activation_status, categories, attributes } = productData;
        const [productId] = yield devDatabase('Products').insert({ product_name, product_price, product_details, activation_status, });
        const categoryIds = categories === null || categories === void 0 ? void 0 : categories.map((category) => category.id);
        if (categoryIds && categoryIds.length > 0) {
            const productCategories = categoryIds.map((categoryId) => ({
                product_id: productId,
                category_id: categoryId,
            }));
            yield devDatabase('Product_Categories').insert(productCategories);
        }
        const attributeValueIds = attributes === null || attributes === void 0 ? void 0 : attributes.map((attribute) => attribute.id);
        const attributeIds = yield Promise.all((attributeValueIds || []).map((attributeValue) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield devDatabase('attribute_values').select('attribute_id').where({ id: attributeValue }).first();
            return result === null || result === void 0 ? void 0 : result.attribute_id;
        })));
        if (attributeValueIds && attributeIds && attributeValueIds.length > 0) {
            const productAttributes = attributeValueIds.map((attributeValueId, index) => ({
                product_id: productId,
                attribute_id: attributeIds[index],
                attribute_value_id: attributeValueId,
            }));
            yield devDatabase('Product_Attributes').insert(productAttributes);
        }
        res.status(201).json({ message: 'Product created successfully!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Fetch All Products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield devDatabase
            .select('p.id', 'p.product_name', 'p.product_price', 'p.product_details', 'p.activation_status as product_activation_status', 'p.created_at', 'p.updated_at', 'c.id as category_id', 'c.category_name', 'a.attribute_name', 'av.attribute_value')
            .from('Products as p')
            .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
            .leftJoin('Categories as c', 'pc.category_id', 'c.id')
            .leftJoin('Product_Attributes as pa', 'p.id', 'pa.product_id')
            .leftJoin('Attributes as a', 'pa.attribute_id', 'a.id')
            .leftJoin('Attribute_Values as av', 'pa.attribute_value_id', 'av.id');
        if (products.length > 0) {
            const result = Object.values(products.reduce((productMap, product) => {
                var _a, _b, _c, _d;
                const productId = product.id;
                if (!productMap[productId]) {
                    productMap[productId] = {
                        id: product.id,
                        product_name: product.product_name,
                        product_price: product.product_price,
                        product_details: product.product_details,
                        activation_status: product.product_activation_status,
                        categories: [],
                        attributes: [],
                        created_at: product.created_at,
                        updated_at: product.updated_at,
                    };
                }
                if (product.category_name && !((_a = productMap[productId].categories) === null || _a === void 0 ? void 0 : _a.includes(product.category_name))) {
                    (_b = productMap[productId].categories) === null || _b === void 0 ? void 0 : _b.push(product.category_name);
                }
                if (product.attribute_value && !((_c = productMap[productId].attributes) === null || _c === void 0 ? void 0 : _c.includes(product.attribute_value))) {
                    (_d = productMap[productId].attributes) === null || _d === void 0 ? void 0 : _d.push(product.attribute_value);
                }
                return productMap;
            }, {}));
            res.json(result);
        }
        else {
            res.status(404).json({ error: 'No products found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//Fetch Single Product
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield devDatabase
            .select('p.id', 'p.product_name', 'p.product_price', 'p.product_details', 'p.activation_status as product_activation_status', 'p.created_at', 'p.updated_at', 'c.id as category_id', 'c.category_name', 'a.attribute_name', 'av.attribute_value')
            .from('Products as p')
            .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
            .leftJoin('Categories as c', 'pc.category_id', 'c.id')
            .leftJoin('Product_Attributes as pa', 'p.id', 'pa.product_id')
            .leftJoin('Attributes as a', 'pa.attribute_id', 'a.id')
            .leftJoin('Attribute_Values as av', 'pa.attribute_value_id', 'av.id')
            .where('p.id', id);
        const result = Object.values(products.reduce((productMap, product) => {
            var _a, _b, _c, _d;
            const productId = product.id;
            if (!productMap[productId]) {
                productMap[productId] = {
                    id: product.id,
                    product_name: product.product_name,
                    product_price: product.product_price,
                    product_details: product.product_details,
                    activation_status: product.product_activation_status,
                    categories: [product.category_name],
                    attributes: [product.attribute_value],
                    created_at: product.created_at,
                    updated_at: product.updated_at,
                };
            }
            else {
                if (!((_a = productMap[productId].categories) === null || _a === void 0 ? void 0 : _a.find((category) => category === product.category_name))) {
                    (_b = productMap[productId].categories) === null || _b === void 0 ? void 0 : _b.push(product.category_name);
                }
                if (!((_c = productMap[productId].attributes) === null || _c === void 0 ? void 0 : _c.find((attribute) => attribute === product.attribute_value))) {
                    (_d = productMap[productId].attributes) === null || _d === void 0 ? void 0 : _d.push(product.attribute_value);
                }
            }
            return productMap;
        }, {}));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Fetch All Products By Activation Status And Category
router.get('/activation-status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, status } = req.query;
    try {
        console.log(category, status);
        const filteredProducts = yield devDatabase
            .select('p.*')
            .from('Products as p')
            .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
            .leftJoin('Categories as c', 'pc.category_id', 'c.id')
            .where('c.category_name', category)
            .andWhere('p.activation_status', status === '1')
            .groupBy('p.id', 'pc.category_id');
        if (!filteredProducts || filteredProducts.length === 0) {
            res.json([]);
        }
        else {
            res.json(filteredProducts);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete Product
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield devDatabase('Products').where({ id }).del();
        if (deletedProduct === 0) {
            res.status(404).json({ message: 'Product not found' });
        }
        else {
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
}));
exports.default = router;
//# sourceMappingURL=products.js.map