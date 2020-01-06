const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findById,
    getByName,
    findById
};

function find() {
    return db('users')

}



function add(user) {
    return db('users').insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function getByName(username) {
    return db("users")
    .select("*")
    .where({ username })
    .first();
}

function findById(id) {
    return db("users")
      .select("id", "username")
      .where({ id })
      .first();
  }