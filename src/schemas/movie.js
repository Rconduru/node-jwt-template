const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: Number,
  genres: [{ description: String }],
  director: { type: String, required: true },
  cast: [{ firstName: String, lastName: String }],
  image: { type: String },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Movie", movieSchema);
