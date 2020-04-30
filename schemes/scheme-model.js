const db = require("../data/config");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then((scheme) => {
      return scheme !== undefined ? scheme : null;
    });
}

function findSteps(id) {
  return db("steps AS s")
    .select(["s.id", "s.step_number", "sc.scheme_name", "s.instructions"])
    .where("s.scheme_id", id)
    .leftJoin("schemes AS sc", "s.id", "sc.id");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((res) => {
      return { ...scheme, id: res[0] };
    });
}

function update(changes, id) {
  return db("schemes").where({ id }).update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .delete()
    .then((res) => (res === 1 ? `Scheme with id: ${id}` : null));
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
