const db = require('../data/connection.js');

module.exports = {
  add,
  addItem,
  find,
  // findBy,
  findById,
  findItemById,
};

// edit this later as get all method returning all items?
function find() {
  return db('owners')
    .select('id', 'username')
    .orderBy('id');
}

async function add(owner) {
  try {
    const [id] = await db('owners').insert(owner, 'id');

    return findById(id);
  }
  catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('owners').where({ id }).first();
}

async function addItem(item) {
  try {
    const [id] = await db('items').insert(item, 'id');

    return findById(id);
  }
  catch (error) {
    throw error;
  }
}

function findItemById(id) {
  return db('items').where({ id }).first();
}