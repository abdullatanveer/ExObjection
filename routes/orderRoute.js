const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const  {isAuthenticated}=require('../middleware/auth');

// place order
router.post('/placeOrder',isAuthenticated ,async(req,res)=>{
    console.log('request nody', req.body)
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            totalPrice,
            orderStatus,
          } = req.body;
           
          if (!Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ error: 'orderItems must be a non-empty array' });
        }
          const order = await Order.query().insertGraph({
            shippingInfo,
            orderItems: orderItems.map(item => ({ ...item, product: item.productId })),  // Assuming productId is the ID of the product
            paymentInfo,
            itemsPrice,
            totalPrice,
            orderStatus,
            
             
            user_id: req.user.id, // Assuming req.user contains the authenticated user's ID
          });
    
           
          res.status(201).json({ success:true, order});
        
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
     
});

module.exports = router;