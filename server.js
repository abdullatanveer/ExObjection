const express = require('express');
const User = require('./models/Users');
const bodyParser = require('body-parser');
const fastagi = require('fastagi.io');
 
const userRoutes=require('./routes/userRoute');
const productRoute=require('./routes/productRoute');
const orderRoute=require('./routes/orderRoute');
const swaagerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const handleFastAGI=require('./fastAgiHandler')
 
 
const dbsetup=require('./db/db-setup');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
dbsetup();

 

 


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description:
        ' Abdullah  API',
    },
    servers:[
      {
        url:'http://localhost:3000'
      }
    ],


  },
  apis: ['./routes/*.js'],
    }
app.use('/users', userRoutes);
app.use('/product', productRoute);
app.use('/order',orderRoute);

const spacs=swaagerJsDoc(options);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(spacs));

 
 

const agi = fastagi();
agi.agi('/fastagi', handleFastAGI);
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

 

// Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


 