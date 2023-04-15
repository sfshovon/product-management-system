import express, { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { AttributeValues } from './routeTypes';

const devDatabase = knex(knexConfig.development);
const router = express.Router();

// Fetch All Attribute Values
router.get('/', async (req: Request, res: Response) => {
  try {
    const getAttributeValues: AttributeValues[] = await devDatabase('Attribute_Values').select('*');
    res.status(200).json(getAttributeValues);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Fetch Single Attribute Value
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attributeValue: AttributeValues = await devDatabase('Attribute_Values').where({ id }).first();
    if (!attributeValue) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.send(attributeValue);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Create Attribute Value
router.post('/create', async (req: Request, res: Response) => {
  try {
    const newAttributeValue: AttributeValues = req.body;
    const result = await devDatabase('Attribute_Values').insert(newAttributeValue);
    newAttributeValue.id = result[0];
    res.status(201).json(newAttributeValue);
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Update Attribute Value
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getUpdatedAttributeValue: AttributeValues = req.body;
    const updateAttributeValue = await devDatabase('Attribute_Values').where({ id }).update(getUpdatedAttributeValue);
    if (updateAttributeValue === 0) {
      res.status(404).json({ message: 'Attribute value not found' });
    }
    const updatedAttributeValue = await devDatabase('Attribute_Values').where({ id }).first();
    res.send(updatedAttributeValue);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Delete Attribute Value
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteAttributeValue = await devDatabase('Attribute_Values').where({ id }).del();
    if (deleteAttributeValue === 0) {
      res.status(404).json({ message: 'Attribute value not found' });
    } else {
      res.status(200).json({ message: 'Attribute value deleted successfully' });
    }
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;
