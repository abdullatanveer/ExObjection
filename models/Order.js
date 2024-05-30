const { Model } = require('objection');

class Order extends Model {
  static get tableName() {
    return 'order'; // Assuming your table name is 'order'
  }

  static get relationMappings() {
    // Import User and Product models if not already imported
    const User = require('./Users');
    const Product = require('./Product');

    return {
      // Define the relationship between Order and User
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'order.user_id',
          to: 'user.id',
        },
      },
      // Define the relationship between Order and Product for order items
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'order.id',
          to: 'product.order_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shippingInfo', 'paymentInfo', 'orderItems', 'itemsPrice',  'totalPrice', 'orderStatus' ],
      properties: {
        shippingInfo: {
          type: 'object',
          properties: {
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            pinCode: { type: 'number' },
            phoneNo: { type: 'number' }
          }
        },
         
        user: { type: 'integer' },  // user id
        paymentInfo: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            status: { type: 'string' }
          }
        },
        orderItems: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' },
            //   image: { type: 'string' },
              product: { type: 'integer' }   // product id 
            }
          }
        },

         
        itemsPrice: { type: 'number' },
         
        
        totalPrice: { type: 'number' },
        orderStatus: { type: 'string' },
        // deliveredAt: { type: 'string', format: 'date-time' },
        // createdAt: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Order;
