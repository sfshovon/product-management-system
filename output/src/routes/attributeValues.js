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
// Fetch All Attribute Values
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAttributeValues = yield devDatabase('Attribute_Values').select('*');
        res.status(200).json(getAttributeValues);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Fetch Single Attribute Value
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const attributeValue = yield devDatabase('Attribute_Values').where({ id }).first();
        if (!attributeValue) {
            return res.status(404).send({ error: 'Category not found' });
        }
        res.send(attributeValue);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Create Attribute Value
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAttributeValue = req.body;
        const result = yield devDatabase('Attribute_Values').insert(newAttributeValue);
        newAttributeValue.id = result[0];
        res.status(201).json(newAttributeValue);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Update Attribute Value
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getUpdatedAttributeValue = req.body;
        const updateAttributeValue = yield devDatabase('Attribute_Values').where({ id }).update(getUpdatedAttributeValue);
        if (updateAttributeValue === 0) {
            res.status(404).json({ message: 'Attribute value not found' });
        }
        const updatedAttributeValue = yield devDatabase('Attribute_Values').where({ id }).first();
        res.send(updatedAttributeValue);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Delete Attribute Value
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteAttributeValue = yield devDatabase('Attribute_Values').where({ id }).del();
        if (deleteAttributeValue === 0) {
            res.status(404).json({ message: 'Attribute value not found' });
        }
        else {
            res.status(200).json({ message: 'Attribute value deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=attributeValues.js.map