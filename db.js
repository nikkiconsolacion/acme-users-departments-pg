const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');

const client = new Client('postgres://localhost/the_people');

client.connect();



const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS departments;
  CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  INSERT INTO departments(name) VALUES('hr');
  INSERT INTO departments(name) VALUES('sales');
  INSERT INTO departments(name) VALUES('marketing');
  INSERT INTO departments(name) VALUES('it');
  INSERT INTO departments(name) VALUES('users with no department');
  INSERT INTO users(name) VALUES('moe');
  INSERT INTO users(name) VALUES('larry');
  INSERT INTO users(name) VALUES('curly');

`;

const syncAndSeed = async()=> {
  await client.query(SQL);
};

const findAllUsers = async()=> {
  const response = await client.query('SELECT * FROM users;');
  return response.rows;
}

const findAllDepartments = async()=> {
  const response = await client.query('SELECT * FROM departments;');
  return response.rows;
}

//syncAndSeed();
module.exports = {
  syncAndSeed,
  findAllUsers,
  findAllDepartments
}
