/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
 // truncate all existing table 
  await knex.raw('TRUNCATE TABLE "user"  CASCADE');
  await knex.raw('TRUNCATE TABLE "product"  CASCADE');

  await knex.raw('TRUNCATE TABLE "order" CASCADE');

  await knex('user').del()
  await knex('product').del()
  await  knex('order').del()
//   await knex('order').del();
//     await knex('user').insert([
//     {id: 1,  name: 'rowValue1',email:"abc@g.com", password:"1234",role:"user"},
     
//   ]);

//   await knex('product').insert([
//     { id: 1, name: 'Product1', price: 10.99, description: 'Description of Product1', rating: 4,numOfReviews:3 },
//     // { id: 2, name: 'Product2', price: 20.49, description: 'Description of Product2', rating: 5 },
//     // Add more product data as needed
// ]);
   

//     await knex('order').insert([
//       {
//         id: 1,
//         shippingInfo: {
//           address: '123 Street',
//           city: 'City',
//           state: 'State',
//           country: 'Country',
//           pinCode: 12345,
//           phoneNo: 1234567890
//         },
//         paymentInfo: {
//           id: 'payment-id-1',
//           status: 'paid'
//         },
//         itemsPrice: 100.50,
//         totalPrice: 110.25,
//         user_id: 1, // Assuming user 1 exists
//         orderStatus: 'Completed',
//         orderItems: [
//           { 
//             name: "new plant",
//             price: 10.99,
//             quantity: 1,
//             product: 1,
//           }
//         ]
//       },
//       // Add more order data as needed
//     ]);
  }

  // Seed data for the order table
  
  // Deletes ALL existing entries
   
//   await knex('user').insert([
//     {id: 1,  name: 'rowValue1',email:"abc@g.com", password:"1234",role:"user"},
     
//   ]);

//   await knex('product').insert([
//     { id: 1, name: 'Product1', price: 10.99, description: 'Description of Product1', rating: 4,numOfReviews:3 },
//     // { id: 2, name: 'Product2', price: 20.49, description: 'Description of Product2', rating: 5 },
//     // Add more product data as needed
// ]);

// await knex('order').insert([
//   {
//     id: 1,
//     shippingInfo: {
//       address: '123 Street',
//       city: 'City',
//       state: 'State',
//       country: 'Country',
//       pinCode: 12345,
//       phoneNo: 1234567890
//     },
//     paymentInfo: {
//       id: 'payment-id-1',
//       status: 'paid'
//     },
//     itemsPrice: 100.50,
//     totalPrice: 110.25,
//     // user_id: 1, // Make sure this user_id exists in the 'user' table
//     orderStatus: 'Completed',
//     // deliveredAt: new Date(),
//     // createdAt: new Date(),
     
//   },
//   // Add more order data as needed
// ]);

