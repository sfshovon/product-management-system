import express, { Request, Response } from 'express';
import attributeValues from '../src/routes/attributeValues';
import attributes from '../src/routes/attributes';
import categories from '../src/routes/categories';
import products from '../src/routes/products';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/categories', categories);
app.use('/products', products);
app.use('/attributes', attributes);
app.use('/attributeValues', attributeValues);

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Check: Server is running</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});