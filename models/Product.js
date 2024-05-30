 

const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'product';
  }

//   static get relationMappings() {
//     // Import User model if not already imported
//     const User = require('./Users');

//     return {
//       // Define the relationship between Product and User for reviews
//       reviews: {
//         relation: Model.HasManyRelation,
//         modelClass: User, // Change this to the appropriate model class
//         join: {
//           from: 'product.id',
//           to: 'user.productId', // Adjust this according to your schema
//         },
//       },
//     };
//   }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price', 'description', 'image'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        price: { type: 'number' },
        description: { type: 'string' },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        image: { type: 'string' }, 
        numOfReviews: { type: 'integer'},
        reviews: {

          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: { type: 'integer' }, // Assuming user will be referenced by their id
              name: { type: 'string' },
              rating: { type: 'number', minimum: 1, maximum: 5 },
              comment: { type: 'string' }
            }
          }
        }
      }
    };
  }
}

module.exports = Product;

 

