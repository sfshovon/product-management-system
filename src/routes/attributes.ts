import express, { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { Attributes } from './routeTypes';

const devDatabase = knex(knexConfig.development);
const router = express.Router();

// Fetch All Attributes
router.get('/', async (req: Request, res: Response) => {
  try {
    const getAttributes: Attributes[] = await devDatabase('Attributes').select('*');
    res.send(getAttributes);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Fetch Single Attribute
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getAttribute: Attributes = await devDatabase('Attributes').select('*').where({ id }).first();
    if (!getAttribute) {
      return res.status(404).send({ error: 'Attribute not found' });
    }
    res.send(getAttribute);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Create Attribute
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { attribute_name } = req.body;
    const newAttribute: Attributes = await devDatabase('Attributes').insert({ attribute_name });
    res.send(newAttribute);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Update Attribute
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { attribute_name } = req.body;
    const getAttribute: number = await devDatabase('Attributes').where({ id }).update({ attribute_name });
    if (!getAttribute) {
      return res.sendStatus(404);
    }
    const updatedAttribute: Attributes = await devDatabase('Attributes').where({ id }).first();
    res.send(updatedAttribute);
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Delete Attribute
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAttribute: Attributes = await devDatabase('Attributes').where({ id }).delete();
    if (!deletedAttribute) {
      return res.sendStatus(404);
    }
    res.send({ message: 'Attribute deleted successfully' });
  } 
  catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;