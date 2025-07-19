const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book requires a title"],
  },
  author: {
    type: String,
    required: [true, "A book requires an author"],
  },
  description: {
    type: String,
    required: [true, "A book requires a description"],
  },
  pages: {
    type: Number,
    required: [true, "A book requires the number of  pages"],
  },
  genre: {
    type: String,
    required: [true, "A book requires a genre"],
  },
  publishedDate: {
    type: Date,
    required: [true, "A book requires a published Date"],
  },
  rating: {
    type: Number,
    required: [true, "A book requires a rating"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
