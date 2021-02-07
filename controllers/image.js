const handleImageCount = (req, res, knex) => {
  const { id } = req.body;
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entry) => {
      res.json(entry[0]);
    })
    .catch((err) => res.status(400).json("unable to count entry"));
};

module.exports = {
  handleImageCount: handleImageCount,
};
