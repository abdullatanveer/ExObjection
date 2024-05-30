/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Smartphone"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 999
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *                 example: "A high-quality smartphone with advanced features."
 *               ratings:
 *                 type: number
 *                 description: The ratings of the product.
 *                 example: 4
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created product.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the created product.
 *                   example: "Smartphone"
 *                 price:
 *                   type: number
 *                   description: The price of the created product.
 *                   example: 999.99
 *                 description:
 *                   type: string
 *                   description: The description of the created product.
 *                   example: "A high-quality smartphone with advanced features."
 *                 ratings:
 *                   type: number
 *                   description: The ratings of the created product.
 *                   example: 4.5
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       500:
 *         description: Internal server error. An unexpected error occurred on the server.
 */

/**
 * @swagger
 * /product/getAllProducts:
 *   get:
 *     summary: Get all products.
 *     responses:
 *       200:
 *         description: Successfully retrieved products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the product.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                     example: "Smartphone"
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                     example: 999
 *                   description:
 *                     type: string
 *                     description: The description of the product.
 *                     example: "A high-quality smartphone with advanced features."
 *                   ratings:
 *                     type: number
 *                     description: The ratings of the product.
 *                     example: 4
 *       500:
 *         description: Internal server error. An unexpected error occurred on the server.
 */

/**
 * @swagger
 * /product/updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product.
 *                 example: "New Smartphone"
 *               price:
 *                 type: number
 *                 description: The updated price of the product.
 *                 example: 1099
 *               description:
 *                 type: string
 *                 description: The updated description of the product.
 *                 example: "An upgraded version of the smartphone with improved features."
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the updated product.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The updated name of the product.
 *                   example: "New Smartphone"
 *                 price:
 *                   type: number
 *                   description: The updated price of the product.
 *                   example: 1099
 *                 description:
 *                   type: string
 *                   description: The updated description of the product.
 *                   example: "An upgraded version of the smartphone with improved features."
 *       404:
 *         description: Product not found. The provided ID does not exist.
 *       500:
 *         description: Internal server error. An unexpected error occurred on the server.
 */




const express = require('express');
const router = express.Router();
const Product=require('../models/Product');
const {isAuthenticated}=require("../middleware/auth")


const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')); // Adjust the destination directory path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the uploaded file
    }
});

// Initialize multer with the specified storage configuration
const upload = multer({ storage: storage });


router.get('/getAllProducts', async(req,res)=>{
    try {
        const product=await Product.query();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error:'Internal server error'})
        
    }
     
})

 

router.post('/createProduct', upload.single('image'), async (req, res) => {
    try {
        // Extract product details from request body
        const { name, price, description, rating ,image} = req.body;

        
        // console.log(image)

        // Create a new product with image details
        const newProduct = await Product.query().insertAndFetch({
            name,
            price,
            description,
            rating,
            image  
            
        });

        // Send response with the newly created product
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/updateProduct/:id', async(req,res)=>{
    const product=await Product.query().findById(req.params.id);

    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.description=req.body.description;
         product.numOfReviews=req.body.numOfReviews;

        await Product.query().insertAndFetch(product);
        res.status(200).json(product);
    }
    else{
        res.status(404).json({error:'Product not found'})
    }

})

router.get('/getSingleProduct/:id', async(req,res)=>{
    const product=await Product.query().findById(req.params.id);

    if(product){
        res.status(200).json(product);
    }
    else{
        res.status(404).json({error:'Product not found'})
    }

     

})

router.delete("/deleteProduct/:id",async(req,res)=>{
    const product=await Product.query().findById(req.params.id);

    if(product){
        await Product.query().deleteById(req.params.id);
        res.status(200).json({message:'Product deleted successfully'})
    }
    else{
        res.status(404).json({error:'Product not found'})
    }
})


 
 

router.put('/createProductReview', isAuthenticated, async (req, res, next) => {
    try {
      const { rating, comment, productId } = req.body;
      const userId = req.user.id; // Replace with your logic for obtaining user ID
      const userName = req.user.name;
  
      // Construct the review object (including user ID)
      const review = {
        userId,
        name:userName,
        rating: Number(rating),
        comment,
        // user: req.user.id, // Assuming user ID is available
      };
  
      // Find the product with related user data (eager loading)
      const product = await Product.query()
      .findById(productId)
    
  
      // Check if the product exists (handle the case where product is null)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      if (!product.reviews) {
        product.reviews = []; // Initialize as an empty array if missing
      }
  
      //Check if existing reviews exist
      const isReviewed = product.reviews.find((rev) => rev.user === req.user.id);
  
      //Update or add the review (modifying the product object)
      if (isReviewed) {
        isReviewed.rating = rating;
        isReviewed.comment = comment;
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }
  
      // Calculate the average rating
      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.rating = avg / product.reviews.length;
  
      // Update the product with modified reviews and ratings
      await product.$query().patch(product);
  
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error('Error creating product review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


  






module.exports=router;