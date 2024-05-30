// userRoutes.js
/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */



/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example:  jhonAliiii
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: jhon12345@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created user.
 *                   example: 123
 *                 username:
 *                   type: string
 *                   description: The username of the created user.
 *                   example: jhonAliiii
 *                 email:
 *                   type: string
 *                   description: The email of the created user.
 *                   example: jhon12345@gmail.com
 *       400:
 *         description: Bad request. The request body is missing or invalid.
 *       500:
 *         description: Internal server error. An unexpected error occurred on the server.
 */

 
/**
 * @swagger
 * /users/loginUser:
 *   post:
 *     summary: Login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                type: string
 *                description: The user's name.
 *                example: Hashim
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: hashim@g.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 1234
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '400':
 *         description: Bad request. Invalid email or password.
 *       '500':
 *         description: Internal server error. An unexpected error occurred on the server.
 */







const express = require('express');
const router = express.Router();
const User  = require('../models/Users');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const knex = require('knex');

//GET /users
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// // POST /create
// router.post('/register', async (req, res) => {
//   try {
//     const { username,email,password} = req.body;
//     const salt =await bcrypt .genSalt(10);
//     const hashedpassword=await bcrypt.hash(password,salt);
        

//     const newUser = await User.query.insert(
//         {   username,
//             email,
//             password:hashedpassword,
//         });
//     await newUser.save();
//     res.status(201).json(newUser);
//     console.log('New user:', newUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

///
router.post('/register', async (req, res) => {
  try {
    const { name, email, password,extension} = req.body;

    // Validate user data using Objection's built-in validation
    await User.fromJson({name, email, password,extension });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const newUser = User.query().insert({ name, email, password: hashedPassword });
    // // const savedUser = await newUser.save();
    const newUser = await User.query().insertAndFetch({ name, email, password: hashedPassword,extension});

    res.status(201).json({ message: 'User registered successfully!', user: newUser }); // Avoid sending sensitive data like password
  } catch (error) {
    console.error('Error creating user:', error);

  
    res.status(500).json({ error: 'Internal server error' });
  }
});

 router.get('/getUser/:id',async(req,res)=>{
    try{
        const user=await User.query().findById(req.params.id);
        res.json(user);
    }catch(err){
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.query().findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, 'abdullah', { expiresIn: '1h' });

        res.status(200).json({ token, msg: 'Login successful' });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

 

 

module.exports = router;
