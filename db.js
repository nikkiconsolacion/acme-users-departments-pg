const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');

const client = new Client('postgres://localhost/the_people');

client.connect();

const hrId = uuid.v4();
const salesId = uuid.v4();
const marketingId = uuid.v4();
const itId = uuid.v4();
const noDeptId = uuid.v4();

const moeId = uuid.v4();
const larryId = uuid.v4();
const curlyId = uuid.v4();


const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS departments;
  CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id),
    bio VARCHAR(255)
  );
  INSERT INTO departments(id, name) VALUES('${hrId}','hr');
  INSERT INTO departments(id, name) VALUES('${salesId}', 'sales');
  INSERT INTO departments(id, name) VALUES('${marketingId}', 'marketing');
  INSERT INTO departments(id, name) VALUES('${itId}', 'it');
  INSERT INTO departments(id, name) VALUES('${noDeptId}', 'users with no department');
  INSERT INTO users(id, name, department_id, bio) VALUES('${moeId}', 'moe', '${hrId}', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo velit necessitatibus sint. Ratione corrupti dolorum unde obcaecati? Molestiae, ullam.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${larryId}', 'larry', '${noDeptId}', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti, eligendi dicta illo placeat cupiditate.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${curlyId}', 'curly', '${marketingId}', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia incidunt aliquid suscipit animi rerum, sed adipisci sint minus eligendi, iste praesentium, ipsa porro eaque atque.');

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
