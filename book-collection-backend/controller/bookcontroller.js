const express = require("express");
const Book = require("../models/book");
const qs = require("qs");
const querystring = require("querystring");

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    const rawString = querystring.stringify(queryObj);
    let nestedQueryObj = qs.parse(rawString);

    let queryString = JSON.stringify(nestedQueryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const mongoQuery = JSON.parse(queryString);
    let query = Book.find(mongoQuery);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("title");
    }

    // Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const books = await query;
    res.status(200).json({
      status: "success",
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(req.query.id, req.body, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.deleteOne({ _id: req.params.id });

    res.status(201).json({
      status: "Deleted",
      book,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
