import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000; 

app.get('/categories/:categoryName/products', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const { top, minPrice, maxPrice, page = 1 } = req.query;

    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO']; /
    const getProductsFromCompanies = async (company) => {
      const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      const response = await axios.get(url);
      return response.data.map((product) => ({ ...product, company }));
    };

    const results = await Promise.all(companies.map(getProductsFromCompanies));

    const products = results.flat();

    const startIndex = (page - 1) * top;
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(top));

    res.json(paginatedProducts);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/categories/:categoryName/products/:productId', async (req, res) => {
  try {
    const { categoryName, productId } = req.params;

    const productDetails = {
      productId,
      productName: 'Sample Product',
      price: 100,
      rating: 4.5,
      discount: 20,
      availability: 'yes',
    };

    res.json(productDetails);
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    res.status(500).json({ error: 'Error fetching product details' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
