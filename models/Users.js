 
 

// const objection = require('objection');
// const { Model } = require('objection');

// class Users extends Model {
//   static get tableName() {
//     return 'user';
//   }
  

//   static get jsonSchema() {
//     return {
//       type: 'object',
//       required: ['name', 'email', 'password'],

//       properties: {
//         id: { type: 'integer' },
//         name: { type: 'integer', minLength: 1, maxLength: 255 },
//         email: { type: 'string', minLength: 1, maxLength: 255 },
//         password: { type: 'string', minLength: 1, maxLength: 255 },
//         role: { type: 'string', minLength: 1, maxLength: 255 , default:'user'},

//       }
//     };
//   }
// }
// module.exports = Users;

const objection = require('objection');
const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'user';
  }
  

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        extension: { type: 'string', minLength: 1, maxLength: 15 } // Assuming phoneNumber can be a string of up to 15 characters
      }
    };
  }
}
module.exports = Users;



