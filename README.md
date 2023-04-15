# Product Management System

### Description
This is a web application that provides REST APIs for managing products, categories, and attributes, built using Node.js, MySQL (Query Builder Knex), TypeScript, and Express.js. The application allows for the creation of products with nested categories and attributes, and provides the ability to update, delete and search for products based on category and status.

### Prerequisites
- Node.js
- MySQL

### Installation
Follow these steps to set up the project:

- Clone the repository to your local machine
- Navigate to the project directory: cd product_management_system
- Install the dependencies: npm install
- Create a MySQL database and configure the connection settings in the .env file.
- Migrate the database: npm run migrate
- Start the application: npm start

### API Endpoints
The following endpoints are available in the API:

#### Categories
- GET /categories - Get all categories.
- GET /categories/:id - Get a single category by ID.
- POST /categories/create - Create a new category.
- PUT /categories/update/:id - Update a category by ID.
- PATCH /categories/deactivation/:id - Deactivate a category and all corresponding child categories and products.
- DELETE /categories/delete/:id - Delete a category by ID.

#### Attributes
- GET /attributes - Get all attributes.
- GET /attributes/:id - Get a single attribute by ID.
- POST /attributes/create - Create a new attribute.
- PUT /attributes/update/:id - Update an attribute by ID.
- DELETE /attributes/delete/:id - Delete an attribute by ID.

#### Products
- GET /products - Get all products.
- GET /products/:id - Get a single product by ID.
- POST /products/create - Create a new product.
- PUT /products/update/:id - Update a product by ID.
- DELETE /products/delete/:id - Delete a product by ID.
- GET /products/search?query={searchQuery} - Search products by name, category, or attribute
- GET /products/activation-status - Get all products by activation status and category

### Usage
To use the API, send requests to the appropriate endpoint using an HTTP client using **REST Client** of VS Code. Install the REST Client in Extension in VS Code. 

### Dependencies
- **body-parser**: middleware for parsing incoming request bodies, used to extract data from HTTP requests
- **cors**: middleware for enabling Cross-Origin Resource Sharing, which allows web pages from different domains to communicate with each other
- **dotenv**: loads environment variables from a .env file into process.env so they can be accessed in the application
- **express**: a web application framework for Node.js, used to handle HTTP requests and responses
- **knex**: a query builder for SQL databases that simplifies building complex database queries
- **mysql2**: a MySQL client for Node.js that enables connecting to and interacting with a MySQL database
- **nodemon**: a utility that automatically restarts the Node.js application when file changes are detected, useful for development purposes

The devDependencies section lists packages that are used during development, but not required for production use:
- **@types/cors**: TypeScript definitions for the cors package, used for type checking and autocompletion in the development environment
- **@types/dotenv**: TypeScript definitions for the dotenv package, used for type checking and autocompletion in the development environment
- **@types/express**: TypeScript definitions for the express package, used for type checking and autocompletion in the development environment
- **@types/knex**: TypeScript definitions for the knex package, used for type checking and autocompletion in the development environment
- **ts-node-dev**: a utility that automatically restarts the TypeScript application when file changes are detected, similar to nodemon but for TypeScript
- **typescript**: a programming language and compiler used for building TypeScript applications.

### Scripts
- **npm test**: run tests
- **npm start** start the application with nodemon
- **npm run make**: generate a new migration file
- **npm run migrate**: run database migrations
- **npm run build**: build TypeScript files
- **npm run serve**: start the application after building TypeScript files

### Author
- This project was created by **SFS**.

### Note
Each category can have only one parent category.
If the user deactivates a category, then all corresponding child categories and categories product must be deactivated automatically.
A single category can have multiple products, and a single product can have multiple categories.
The application uses knex as the query builder for MySQL, making it more secure and efficient.
The application is built using TypeScript, providing better type checking and code organization.
The application uses nodemon for automatic server restarts during development.

### License
This project is licensed under the ISC License.