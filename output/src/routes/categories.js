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
// Fetch All Categories
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCategories = yield devDatabase('Categories').select('*');
        res.send(getAllCategories);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching categories.' });
    }
}));
// Fetch Single Category
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getCategory = yield devDatabase('Categories').select('*').where({ id }).first();
        if (!getCategory) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send(getCategory);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the category.' });
    }
}));
// Create Category
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name, root_id } = req.body;
        if (!category_name) {
            return res.status(400).send('category_name is required field.');
        }
        const newCategory = yield devDatabase('Categories').insert({ category_name, root_id });
        res.send(newCategory);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the category.' });
    }
}));
// Update Category
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { category_name, root_id } = req.body;
        const getCategory = yield devDatabase('Categories').where({ id }).update({ category_name, root_id });
        if (!getCategory) {
            return res.sendStatus(404);
        }
        const updatedCategory = yield devDatabase('Categories').where({ id }).first();
        res.send(updatedCategory);
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while updating the category.' });
    }
}));
// Deactivate Category
router.patch('/deactivation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { activation_status } = req.body;
    try {
        yield devDatabase('Categories')
            .where('id', id)
            .orWhere('root_id', id)
            .update({ activation_status });
        res.send({ message: `Category ${activation_status ? 'activated' : 'deactivated'} successfully` });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while deactivating the category.' });
    }
}));
// Delete Category
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield devDatabase('Categories').where({ id }).delete();
        if (!deletedCategory) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the category.' });
    }
}));
exports.default = router;
//# sourceMappingURL=categories.js.map