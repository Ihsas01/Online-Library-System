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
      search,
      status,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    const query = {};
    if (genre) query.genre = genre;
    if (author) query.author = { $regex: author, $options: 'i' };
    if (title) query.title = { $regex: title, $options: 'i' };
    if (status) query.status = status;
    
    // Handle search parameter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const books = await Book.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Book.countDocuments(query);

    res.json({
      books,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
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

// Seed books with sample data
const seedBooks = async (req, res) => {
  try {
    const sampleBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0743273565",
        description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.",
        genre: ["Fiction", "Classic", "Romance"],
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        totalCopies: 5,
        availableCopies: 3,
        location: { shelf: "A1", aisle: "Classics" },
        publishedYear: 1925,
        publisher: "Scribner",
        language: "English",
        rating: { average: 4.2, count: 15 }
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0446310789",
        description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
        genre: ["Fiction", "Classic", "Historical Fiction"],
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        totalCopies: 4,
        availableCopies: 2,
        location: { shelf: "A2", aisle: "Classics" },
        publishedYear: 1960,
        publisher: "Grand Central Publishing",
        language: "English",
        rating: { average: 4.5, count: 22 }
      },
      {
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        description: "A dystopian novel that follows the life of Winston Smith, a low-ranking member of 'the Party'.",
        genre: ["Fiction", "Dystopian", "Political"],
        coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        totalCopies: 6,
        availableCopies: 4,
        location: { shelf: "B1", aisle: "Science Fiction" },
        publishedYear: 1949,
        publisher: "Signet Classic",
        language: "English",
        rating: { average: 4.3, count: 18 }
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "978-0547928241",
        description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on a quest to reclaim the Lonely Mountain.",
        genre: ["Fantasy", "Adventure", "Fiction"],
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        totalCopies: 7,
        availableCopies: 5,
        location: { shelf: "C1", aisle: "Fantasy" },
        publishedYear: 1937,
        publisher: "Houghton Mifflin Harcourt",
        language: "English",
        rating: { average: 4.6, count: 25 }
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "978-0141439518",
        description: "The story follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.",
        genre: ["Romance", "Classic", "Fiction"],
        coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
        totalCopies: 4,
        availableCopies: 1,
        location: { shelf: "A3", aisle: "Classics" },
        publishedYear: 1813,
        publisher: "Penguin Classics",
        language: "English",
        rating: { average: 4.4, count: 20 }
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "978-0316769488",
        description: "The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school.",
        genre: ["Fiction", "Coming-of-age", "Classic"],
        coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
        totalCopies: 5,
        availableCopies: 3,
        location: { shelf: "A4", aisle: "Classics" },
        publishedYear: 1951,
        publisher: "Little, Brown and Company",
        language: "English",
        rating: { average: 3.8, count: 16 }
      },
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        isbn: "978-0547928210",
        description: "An epic high-fantasy novel about the quest to destroy a powerful ring and save Middle-earth from the Dark Lord Sauron.",
        genre: ["Fantasy", "Adventure", "Epic"],
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        totalCopies: 8,
        availableCopies: 6,
        location: { shelf: "C2", aisle: "Fantasy" },
        publishedYear: 1954,
        publisher: "Houghton Mifflin Harcourt",
        language: "English",
        rating: { average: 4.7, count: 30 }
      },
      {
        title: "Animal Farm",
        author: "George Orwell",
        isbn: "978-0451526342",
        description: "A satirical allegory of Soviet totalitarianism, the book tells the story of a group of farm animals who rebel against their human farmer.",
        genre: ["Political", "Satire", "Allegory"],
        coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        totalCopies: 4,
        availableCopies: 2,
        location: { shelf: "B2", aisle: "Political" },
        publishedYear: 1945,
        publisher: "Signet",
        language: "English",
        rating: { average: 4.1, count: 14 }
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "978-0062315007",
        description: "A novel that follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
        genre: ["Fiction", "Philosophy", "Adventure"],
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        totalCopies: 6,
        availableCopies: 4,
        location: { shelf: "D1", aisle: "Philosophy" },
        publishedYear: 1988,
        publisher: "HarperOne",
        language: "English",
        rating: { average: 4.0, count: 19 }
      },
      {
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        isbn: "978-1594631931",
        description: "A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history.",
        genre: ["Fiction", "Historical Fiction", "Drama"],
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        totalCopies: 5,
        availableCopies: 3,
        location: { shelf: "E1", aisle: "Contemporary" },
        publishedYear: 2003,
        publisher: "Riverhead Books",
        language: "English",
        rating: { average: 4.3, count: 17 }
      },
      {
        title: "The Book Thief",
        author: "Markus Zusak",
        isbn: "978-0375842207",
        description: "Set in Nazi Germany, the novel is narrated by Death and follows the story of Liesel Meminger, a young girl who steals books.",
        genre: ["Historical Fiction", "Young Adult", "War"],
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        totalCopies: 4,
        availableCopies: 2,
        location: { shelf: "E2", aisle: "Historical Fiction" },
        publishedYear: 2005,
        publisher: "Alfred A. Knopf",
        language: "English",
        rating: { average: 4.4, count: 21 }
      },
      {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        isbn: "978-0439023481",
        description: "In a dystopian future, teenagers are forced to participate in a televised battle to the death in an arena.",
        genre: ["Young Adult", "Dystopian", "Science Fiction"],
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
        totalCopies: 6,
        availableCopies: 4,
        location: { shelf: "F1", aisle: "Young Adult" },
        publishedYear: 2008,
        publisher: "Scholastic Press",
        language: "English",
        rating: { average: 4.2, count: 23 }
      }
    ];

    // Clear existing books
    await Book.deleteMany({});
    
    // Insert sample books
    const insertedBooks = await Book.insertMany(sampleBooks);
    
    res.status(201).json({
      message: 'Database seeded successfully',
      count: insertedBooks.length,
      books: insertedBooks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addReview,
  seedBooks
}; 