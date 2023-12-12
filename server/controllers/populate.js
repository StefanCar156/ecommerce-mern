{
  /* DO NOT USE ANYMORE */
}

{
  /*
import Product from "../models/Product.js"
import { faker } from "@faker-js/faker"

const populateDB = async (req, res) => {
  try {
    // Define arrays for categories and brands
    const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen"]
    const brands = ["Sony", "Nike", "Apple", "Samsung", "Amazon Basics"]

    // Generate 200 products with random data
    const products = Array.from({ length: 200 }, () => {
      const images = Array.from({ length: 4 }, () => faker.image.url())

      return {
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
        quantity: faker.number.int({ min: 1, max: 100 }),
        description: faker.lorem.paragraph(),
        category: faker.helpers.arrayElement(categories),
        images,
        brand: faker.helpers.arrayElement(brands),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      }
    })

    // Insert products into the database
    const insertedProducts = await Product.insertMany(products)

    res.status(201).json({
      message: "Products populated successfully",
      data: insertedProducts,
    })
  } catch (error) {
    console.error("Error populating products:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export { populateDB }

*/
}
