import express, { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { Categories } from './routeTypes';

const devDatabase = knex(knexConfig.development);
const router = express.Router();

// Fetch All Categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const getAllCategories: Categories[] = await devDatabase('Categories').select('*');
    res.send(getAllCategories);
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching categories.' });
  }
});

// Fetch Single Category
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getCategory: Categories = await devDatabase('Categories').select('*').where({ id }).first();
    if (!getCategory) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.send(getCategory);
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching the category.' });
  }
});

// Create Category
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { category_name, root_id } = req.body;
    if (!category_name) {
      return res.status(400).send('category_name is required field.');
    }
    const newCategory: Categories = await devDatabase('Categories').insert({ category_name, root_id });
    res.send(newCategory);
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while creating the category.' });
  }
});

// Update Category
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category_name, root_id } = req.body;
    const getCategory: Categories[] = await devDatabase('Categories').where({ id }).update({ category_name, root_id });
    if (!getCategory) {
      return res.sendStatus(404);
    }
    const updatedCategory: Categories = await devDatabase('Categories').where({ id }).first();
    res.send(updatedCategory);
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the category.' });
  }
});

// Deactivate Category
router.patch('/deactivation/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { activation_status } = req.body;
  try {
    await devDatabase('Categories')
      .where('id', id)
      .orWhere('root_id', id)
      .update({ activation_status });
    res.send({ message: `Category ${activation_status ? 'activated' : 'deactivated'} successfully` });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({ error: 'An error occurred while deactivating the category.' });
  }
});

// Delete Category
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCategory: Categories[] = await devDatabase('Categories').where({ id }).delete();
    if (!deletedCategory) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.send({ message: 'Category deleted successfully' });
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while deleting the category.' });
  }
});

export default router;