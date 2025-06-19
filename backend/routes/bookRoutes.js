const express = require('express');
const { body } = require('express-validator');
const { auth, checkRole } = require('../middleware/auth');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addReview,
  seedBooks
} = require('../controllers/bookController');

const router = express.Router();

// Validation middleware
const bookValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('isbn')
    .trim()
    .notEmpty()
    .withMessage('ISBN is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('genre')
    .isArray()
    .withMessage('Genre must be an array')
    .notEmpty()
    .withMessage('At least one genre is required'),
  body('totalCopies')
    .isInt({ min: 0 })
    .withMessage('Total copies must be a positive number'),
  body('availableCopies')
    .isInt({ min: 0 })
    .withMessage('Available copies must be a positive number')
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
];

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Seed route (for development/testing)
router.post('/seed', seedBooks);

// Protected routes
router.post('/:id/reviews', auth, reviewValidation, addReview);

// Librarian/Admin only routes
router.post('/', auth, checkRole(['librarian', 'admin']), bookValidation, createBook);
router.patch('/:id', auth, checkRole(['librarian', 'admin']), bookValidation, updateBook);
router.delete('/:id', auth, checkRole(['librarian', 'admin']), deleteBook);

module.exports = router; 