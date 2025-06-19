const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// Get all books with filtering and pagination
const getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      genre,
      author,
      title,
      status,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    const query = {};
    if (genre) query.genre = genre;
    if (author) query.author = { $regex: author, $options: 'i' };
    if (title) query.title = { $regex: title, $options: 'i' };
    if (status) query.status = status;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const books = await Book.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Get single book by ID
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('reviews.user', 'username');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'title',
      'author',
      'description',
      'genre',
      'coverImage',
      'totalCopies',
      'availableCopies',
      'location',
      'publishedYear',
      'publisher',
      'language'
    ];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    updates.forEach(update => book[update] = req.body[update]);
    await book.save();

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

// Add book review
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user has already reviewed
    const existingReview = book.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = {
      user: req.user._id,
      rating,
      comment
    };

    book.reviews.push(review);

    // Update average rating
    const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
    book.rating.average = totalRating / book.reviews.length;
    book.rating.count = book.reviews.length;

    await book.save();

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addReview
}; 