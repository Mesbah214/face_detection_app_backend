const handleProfileGet = (req, res, knex) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found such user");
      }
    })
    .catch((err) => res.status(400).json("error getting such user"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
