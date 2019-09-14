const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');

const client = new Client('postgres://localhost/the_people');

client.connect();

const SQL = `

`;

const syncAndSeed = async()=> {
  await client.query(SQL);
};

const findAllUsers = ()=> {

}

const findAllDepartments = ()=> {

}

module.exports = {
  syncAndSeed,
  findAllUsers,
  findAllDepartments
}
