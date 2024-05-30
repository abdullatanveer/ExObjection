 
 

const {Model}=require('objection');
const Knex=require('knex');

const knex=Knex({
  client:'pg',
  connection:{
    host:'localhost',
    user:'Abdullah',
    password:'postgres',
    database:'HumpyDB',
    port:5432,
  }
});

 
 
Model.knex(knex);
module.exports=knex;

 