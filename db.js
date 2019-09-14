const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');

const client = new Client('postgres://localhost/the_people');

client.connect();

const hrId = uuid.v4();
const salesId = uuid.v4();
const marketingId = uuid.v4();
const itId = uuid.v4();

const moeId = uuid.v4();
const larryId = uuid.v4();
const curlyId = uuid.v4();
const archerId = uuid.v4();
const nikkiId = uuid.v4();


const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS departments;
  CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    department_id UUID REFERENCES departments(id),
    bio VARCHAR(255)
  );
  INSERT INTO departments(id, name) VALUES('${hrId}','HR');
  INSERT INTO departments(id, name) VALUES('${salesId}', 'Sales');
  INSERT INTO departments(id, name) VALUES('${marketingId}', 'Marketing');
  INSERT INTO departments(id, name) VALUES('${itId}', 'IT');


  INSERT INTO users(id, name, department_id, bio) VALUES('${moeId}', 'Moe', '${hrId}', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo velit necessitatibus sint. Ratione corrupti dolorum unde obcaecati? Molestiae, ullam.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${larryId}', 'Larry', null, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti, eligendi dicta illo placeat cupiditate.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${curlyId}', 'Curly', '${marketingId}', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia incidunt aliquid suscipit animi rerum, sed adipisci sint minus eligendi, iste praesentium, ipsa porro eaque atque.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${archerId}', 'Archer', '${salesId}', 'The Archer of Darkness joined CODETEC in 2019, he is our noobiest developer.');
  INSERT INTO users(id, name, department_id, bio) VALUES('${nikkiId}', 'Nikki', '${itId}', 'Nikki Consolacion is an up and coming Dev who will code the world.');
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
