const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  totalCopies: {
    type: Number,
    required: true,
    min: 0
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    shelf: String,
    aisle: String
  },
  publishedYear: {
    type: Number
  },
  publisher: {
    type: String
  },
  language: {
    type: String,
    default: 'English'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['available', 'limited', 'unavailable'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Virtual for checking if book is available
bookSchema.virtual('isAvailable').get(function() {
  return this.availableCopies > 0;
});

// Method to update book status
bookSchema.methods.updateStatus = function() {
  if (this.availableCopies === 0) {
    this.status = 'unavailable';
  } else if (this.availableCopies < this.totalCopies * 0.2) {
    this.status = 'limited';
  } else {
    this.status = 'available';
  }
};

// Pre-save middleware to update status
bookSchema.pre('save', function(next) {
  this.updateStatus();
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book; 