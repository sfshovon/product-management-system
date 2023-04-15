import express, { Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { Products } from './routeTypes';

const devDatabase = knex(knexConfig.development);
const router = express.Router();

// Create Product
router.post('/create', async (req: Request, res: Response) => {
  try {
    const productData: Products = req.body;
    const { product_name, product_price, product_details, activation_status, categories, attributes } = productData;
    const [productId] = await devDatabase('Products').insert({product_name, product_price, product_details, activation_status,});
    const categoryIds = categories?.map((category) => category.id);
    if (categoryIds && categoryIds.length > 0) {
      const productCategories = categoryIds.map((categoryId) => ({
        product_id: productId,
        category_id: categoryId,
      }));
      await devDatabase('Product_Categories').insert(productCategories);
    }
    const attributeValueIds = attributes?.map((attribute) => attribute.id);
    const attributeIds = await Promise.all((attributeValueIds || []).map(async (attributeValue) => {
      const result = await devDatabase('attribute_values').select('attribute_id').where({ id: attributeValue }).first();
      return result?.attribute_id;
    }));

    if (attributeValueIds && attributeIds && attributeValueIds.length > 0) {
      const productAttributes = attributeValueIds.map((attributeValueId, index) => ({
        product_id: productId,
        attribute_id: attributeIds[index],
        attribute_value_id: attributeValueId,
      }));
      await devDatabase('Product_Attributes').insert(productAttributes);
    }
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch All Products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await devDatabase
  .select('p.id', 'p.product_name','p.product_price','p.product_details','p.activation_status as product_activation_status', 'p.created_at','p.updated_at',
  'c.id as category_id', 'c.category_name',
  'a.attribute_name', 'av.attribute_value'
  )
  .from('Products as p')
  .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
  .leftJoin('Categories as c', 'pc.category_id', 'c.id')
  .leftJoin('Product_Attributes as pa', 'p.id', 'pa.product_id')
  .leftJoin('Attributes as a', 'pa.attribute_id', 'a.id')
  .leftJoin('Attribute_Values as av','pa.attribute_value_id','av.id');

if (products.length > 0) {
  const result: Products[] = Object.values(
    products.reduce((productMap: Record<number, Products>, product: any) => {
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
      if (product.category_name && !productMap[productId].categories?.includes(product.category_name)) {
        productMap[productId].categories?.push(product.category_name);
      }
      if (product.attribute_value && !productMap[productId].attributes?.includes(product.attribute_value)) {
        productMap[productId].attributes?.push(product.attribute_value);
      }
      return productMap;
    }, {})
  );

    res.json(result);
  } else {
    res.status(404).json({ error: 'No products found' });
  }
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Fetch Single Product
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const products = await devDatabase
      .select('p.id', 'p.product_name','p.product_price','p.product_details','p.activation_status as product_activation_status', 'p.created_at','p.updated_at',
      'c.id as category_id', 'c.category_name',
      'a.attribute_name', 'av.attribute_value'
      )
      .from('Products as p')
      .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
      .leftJoin('Categories as c', 'pc.category_id', 'c.id')
      .leftJoin('Product_Attributes as pa', 'p.id', 'pa.product_id')
      .leftJoin('Attributes as a', 'pa.attribute_id', 'a.id')
      .leftJoin('Attribute_Values as av','pa.attribute_value_id','av.id')
      .where('p.id', id);

    const result: Products[] = Object.values(
      products.reduce((productMap: Record<number, Products>, product: any) => {
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
        } else {
          if (
            !productMap[productId].categories?.find(
              (category) => category === product.category_name
            )
          ) {
            productMap[productId].categories?.push(product.category_name);
          }
          if (
            !productMap[productId].attributes?.find(
              (attribute) => attribute === product.attribute_value
            )
          ) {
            productMap[productId].attributes?.push(product.attribute_value);
          }
        }
        return productMap;
      }, {})
    );
    res.json(result);
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch All Products By Activation Status And Category
router.get('/activation-status', async (req: Request, res: Response) => {
  const { category, status } = req.query;
  try {
    console.log(category, status);
    const filteredProducts: Products[] = await devDatabase
      .select('p.*')
      .from<Products>('Products as p')
      .leftJoin('Product_Categories as pc', 'p.id', 'pc.product_id')
      .leftJoin('Categories as c', 'pc.category_id', 'c.id')
      .where('c.category_name', category)
      .andWhere('p.activation_status', status === '1')
      .groupBy('p.id', 'pc.category_id');
    if (!filteredProducts || filteredProducts.length === 0) {
      res.json([]);
    } else {
      res.json(filteredProducts);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search products
router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.query as string | undefined;
  if (!query) {
    res.status(400).json({ message: 'Search query is required' });
    return;
  }
  try {
    const products: Products[] = await knex('products')
      .select('products.*', 'categories.name AS category', 'attributes.name AS attribute')
      .distinct()
      .innerJoin('product_category', 'products.id', 'product_category.product_id')
      .innerJoin('categories', 'categories.id', 'product_category.category_id')
      .innerJoin('product_attribute', 'products.id', 'product_attribute.product_id')
      .innerJoin('attributes', 'attributes.id', 'product_attribute.attribute_id')
      .whereRaw('LOWER(products.name) LIKE ?', [`%${query.toLowerCase()}%`])
      .orWhereRaw('LOWER(categories.name) LIKE ?', [`%${query.toLowerCase()}%`])
      .orWhereRaw('LOWER(attributes.name) LIKE ?', [`%${query.toLowerCase()}%`]);

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Product
router.put('/update/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product_name, product_details, product_price } = req.body;
    const getProduct: Products[] = await devDatabase('Products').where({ id }).update({ product_name, product_details, product_price });
    if (!getProduct) {
      return res.sendStatus(404);
    }
    const updatedProduct: Products = await devDatabase('Products').where({ id }).first();
    res.send(updatedProduct);
  } 
  catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the product.' });
  }
});


// Delete Product
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await devDatabase('Products').where({ id }).del();
    if (deletedProduct === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } 
  catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;
