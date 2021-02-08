const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "999175ca022b4ee1b45fe62adc60734d",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("API is not available"));
};

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
  handleApiCall: handleApiCall,
};
