// // /**
// //  * @param { import("knex").Knex } knex
// //  * @returns { Promise<void> }
// //  */
// // exports.up = function(knex) {
// //     return knex.schema.createTable('user', (table) => {
// //         table.increments();
// //         table.string('name').notNullable();
// //         table.string('email').notNullable().unique();
// //         table.string('password').notNullable();  
// //         // table.string("role").notNullable();
         
// //         table.timestamps(true, true);
// //       });
  
// // };

// // /**
// //  * @param { import("knex").Knex } knex
// //  * @returns { Promise<void> }
// //  */
// // exports.down = function(knex) {
// //     return knex.schema.dropTableIfExists('user');
  
// // };
// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//     return knex.schema.createTable('user', (table) => {
//         table.increments();
//         table.string('name').notNullable();
//         table.string('email').notNullable().unique();
//         table.string('password').notNullable();  
//         table.string("role").notNullable();
//         table.timestamps(true, true);
//     })
//     .createTable('product', (table) => {
//         table.increments();
//         table.string('name')
//         table.decimal('price', 10, 2) 
//         table.string('description') 
//         table.integer('rating') 
//         table.string('image');
//         table.integer('numOfReviews').defaultTo(0);
//         table.jsonb("reviews");
        
        
//         table.timestamps(true, true);
//     })
//     .createTable('order', function(table) {
//         table.increments('id').primary();
//         table.jsonb('shippingInfo').notNullable();
//         table.jsonb('paymentInfo').notNullable();
//         table.decimal('itemsPrice').notNullable();
//         table.decimal('totalPrice').notNullable();
//         table.timestamp('paidAt').defaultTo(knex.fn.now());
//         table.integer('user_id').unsigned().notNullable();
//         table.foreign('user_id').references('id').inTable('user');
//         table.string('orderStatus').notNullable();
//         table.timestamp('deliveredAt');
//         table.timestamp('createdAt');
//         table.timestamps(true, true);
//       });
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
//     return knex.schema.dropTableIfExists('product')
//         .dropTableIfExists('user')
//         .dropTableIfExists('order');
// };


 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {


    return knex.schema.createTable('user', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();  
        table.string('extension').notNullable();
        table.timestamps(true, true);
    })
    .createTable('order', function(table) {
        table.increments('id').primary();
        table.jsonb('shippingInfo').notNullable();
        table.jsonb('paymentInfo').notNullable();
        table.decimal('itemsPrice').notNullable();
        table.decimal('totalPrice').notNullable();
         
        table.integer('user_id').unsigned()
        // table.foreign('user_id').references('id').inTable('user');
        table.foreign('user_id').references('id').inTable('user');
        table.string('orderStatus').notNullable();
        table.jsonb('orderItems').notNullable();
        // table.timestamp('deliveredAt');
        // table.timestamp('createdAt');
        table.timestamps(true, true);
    })
    .createTable('product', (table) => {
        table.increments();
        table.string('name');
        table.decimal('price', 10, 2);
        table.string('description');
        table.integer('rating');
        table.string('image');
        table.integer('numOfReviews').defaultTo(0);
        table.jsonb("reviews");
        table.integer('order_id').unsigned(); // Add foreign key for order relationship
        table.timestamps(true, true);
        
        // Add foreign key constraint
        table.foreign('order_id').references('id').inTable('order').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product')
        .dropTableIfExists('order')
        .dropTableIfExists('user');
};

