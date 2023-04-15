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
// Fetch All Attributes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAttributes = yield devDatabase('Attributes').select('*');
        res.send(getAttributes);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Fetch Single Attribute
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getAttribute = yield devDatabase('Attributes').select('*').where({ id }).first();
        if (!getAttribute) {
            return res.status(404).send({ error: 'Attribute not found' });
        }
        res.send(getAttribute);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Create Attribute
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { attribute_name } = req.body;
        const newAttribute = yield devDatabase('Attributes').insert({ attribute_name });
        res.send(newAttribute);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Update Attribute
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { attribute_name } = req.body;
        const getAttribute = yield devDatabase('Attributes').where({ id }).update({ attribute_name });
        if (!getAttribute) {
            return res.sendStatus(404);
        }
        const updatedAttribute = yield devDatabase('Attributes').where({ id }).first();
        res.send(updatedAttribute);
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
// Delete Attribute
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedAttribute = yield devDatabase('Attributes').where({ id }).delete();
        if (!deletedAttribute) {
            return res.sendStatus(404);
        }
        res.send({ message: 'Attribute deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=attributes.js.map