const Book = require('./models/Book');
const mongoose = require('mongoose');

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    description: "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age, and in doing so reveals a great deal about the human condition and the dark side of the American Dream.",
    genre: ["Fiction", "Classic", "Romance"],
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    totalCopies: 5,
    availableCopies: 3,
    location: {
      shelf: "A1",
      aisle: "Classics"
    },
    publishedYear: 1925,
    publisher: "Scribner",
    language: "English",
    rating: {
      average: 4.2,
      count: 15
    },
    reviews: [
      {
        rating: 5,
        comment: "A masterpiece of American literature. The prose is absolutely beautiful.",
        date: new Date('2024-01-15')
      },
      {
        rating: 4,
        comment: "Captures the essence of the Jazz Age perfectly. Timeless classic.",
        date: new Date('2024-02-20')
      }
    ]
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, addressing issues of race, inequality and segregation.",
    genre: ["Fiction", "Classic", "Historical Fiction"],
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    location: {
      shelf: "A2",
      aisle: "Classics"
    },
    publishedYear: 1960,
    publisher: "Grand Central Publishing",
    language: "English",
    rating: {
      average: 4.5,
      count: 22
    },
    reviews: [
      {
        rating: 5,
        comment: "A powerful story about justice and growing up. Still relevant today.",
        date: new Date('2024-01-10')
      },
      {
        rating: 4,
        comment: "Beautifully written with memorable characters. A must-read.",
        date: new Date('2024-03-05')
      }
    ]
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    description: "A dystopian novel that follows the life of Winston Smith, a low-ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party.",
    genre: ["Fiction", "Dystopian", "Political"],
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    totalCopies: 6,
    availableCopies: 4,
    location: {
      shelf: "B1",
      aisle: "Science Fiction"
    },
    publishedYear: 1949,
    publisher: "Signet Classic",
    language: "English",
    rating: {
      average: 4.3,
      count: 18
    },
    reviews: [
      {
        rating: 5,
        comment: "Chilling and prophetic. More relevant than ever in today's world.",
        date: new Date('2024-02-15')
      },
      {
        rating: 4,
        comment: "A masterpiece of political fiction. Thought-provoking and disturbing.",
        date: new Date('2024-01-25')
      }
    ]
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928241",
    description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on a quest to reclaim the Lonely Mountain from the dragon Smaug.",
    genre: ["Fantasy", "Adventure", "Fiction"],
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    totalCopies: 7,
    availableCopies: 5,
    location: {
      shelf: "C1",
      aisle: "Fantasy"
    },
    publishedYear: 1937,
    publisher: "Houghton Mifflin Harcourt",
    language: "English",
    rating: {
      average: 4.6,
      count: 25
    },
    reviews: [
      {
        rating: 5,
        comment: "A delightful adventure story. Perfect for readers of all ages.",
        date: new Date('2024-01-20')
      },
      {
        rating: 4,
        comment: "Charming and whimsical. Tolkien's world-building is incredible.",
        date: new Date('2024-02-28')
      }
    ]
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    description: "The story follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.",
    genre: ["Romance", "Classic", "Fiction"],
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    totalCopies: 4,
    availableCopies: 1,
    location: {
      shelf: "A3",
      aisle: "Classics"
    },
    publishedYear: 1813,
    publisher: "Penguin Classics",
    language: "English",
    rating: {
      average: 4.4,
      count: 20
    },
    reviews: [
      {
        rating: 5,
        comment: "A perfect romance novel. Austen's wit and social commentary are brilliant.",
        date: new Date('2024-02-10')
      },
      {
        rating: 4,
        comment: "Timeless love story with memorable characters. A true classic.",
        date: new Date('2024-03-01')
      }
    ]
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0316769488",
    description: "The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. Confused and disillusioned, Holden searches for truth and rails against the 'phoniness' of the adult world.",
    genre: ["Fiction", "Coming-of-age", "Classic"],
    coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
    totalCopies: 5,
    availableCopies: 3,
    location: {
      shelf: "A4",
      aisle: "Classics"
    },
    publishedYear: 1951,
    publisher: "Little, Brown and Company",
    language: "English",
    rating: {
      average: 3.8,
      count: 16
    },
    reviews: [
      {
        rating: 4,
        comment: "A powerful coming-of-age story. Holden's voice is unforgettable.",
        date: new Date('2024-01-30')
      },
      {
        rating: 3,
        comment: "Interesting perspective on teenage alienation. Somewhat dated but still relevant.",
        date: new Date('2024-02-25')
      }
    ]
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
    location: {
      shelf: "C2",
      aisle: "Fantasy"
    },
    publishedYear: 1954,
    publisher: "Houghton Mifflin Harcourt",
    language: "English",
    rating: {
      average: 4.7,
      count: 30
    },
    reviews: [
      {
        rating: 5,
        comment: "The greatest fantasy epic ever written. Tolkien's masterpiece.",
        date: new Date('2024-01-05')
      },
      {
        rating: 5,
        comment: "Incredible world-building and storytelling. A true classic.",
        date: new Date('2024-02-15')
      }
    ]
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    isbn: "978-0451526342",
    description: "A satirical allegory of Soviet totalitarianism, the book tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
    genre: ["Political", "Satire", "Allegory"],
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    location: {
      shelf: "B2",
      aisle: "Political"
    },
    publishedYear: 1945,
    publisher: "Signet",
    language: "English",
    rating: {
      average: 4.1,
      count: 14
    },
    reviews: [
      {
        rating: 4,
        comment: "Brilliant political satire. Orwell's commentary is sharp and relevant.",
        date: new Date('2024-02-20')
      },
      {
        rating: 4,
        comment: "A powerful allegory about power and corruption. Timeless message.",
        date: new Date('2024-01-18')
      }
    ]
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
    location: {
      shelf: "D1",
      aisle: "Philosophy"
    },
    publishedYear: 1988,
    publisher: "HarperOne",
    language: "English",
    rating: {
      average: 4.0,
      count: 19
    },
    reviews: [
      {
        rating: 4,
        comment: "A beautiful story about following your dreams. Inspiring and thought-provoking.",
        date: new Date('2024-02-05')
      },
      {
        rating: 4,
        comment: "Simple yet profound. A book that stays with you long after reading.",
        date: new Date('2024-03-10')
      }
    ]
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
    location: {
      shelf: "E1",
      aisle: "Contemporary"
    },
    publishedYear: 2003,
    publisher: "Riverhead Books",
    language: "English",
    rating: {
      average: 4.3,
      count: 17
    },
    reviews: [
      {
        rating: 5,
        comment: "Heart-wrenching and beautiful. A story of redemption and friendship.",
        date: new Date('2024-01-25')
      },
      {
        rating: 4,
        comment: "Powerful storytelling that brings Afghanistan's history to life.",
        date: new Date('2024-02-12')
      }
    ]
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "978-0375842207",
    description: "Set in Nazi Germany, the novel is narrated by Death and follows the story of Liesel Meminger, a young girl who steals books and shares them with neighbors during bombing raids.",
    genre: ["Historical Fiction", "Young Adult", "War"],
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    location: {
      shelf: "E2",
      aisle: "Historical Fiction"
    },
    publishedYear: 2005,
    publisher: "Alfred A. Knopf",
    language: "English",
    rating: {
      average: 4.4,
      count: 21
    },
    reviews: [
      {
        rating: 5,
        comment: "Beautifully written with a unique perspective. Death as narrator is brilliant.",
        date: new Date('2024-02-08')
      },
      {
        rating: 4,
        comment: "A touching story about the power of words and human resilience.",
        date: new Date('2024-01-30')
      }
    ]
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
    location: {
      shelf: "F1",
      aisle: "Young Adult"
    },
    publishedYear: 2008,
    publisher: "Scholastic Press",
    language: "English",
    rating: {
      average: 4.2,
      count: 23
    },
    reviews: [
      {
        rating: 4,
        comment: "Fast-paced and engaging. A great introduction to dystopian fiction.",
        date: new Date('2024-02-15')
      },
      {
        rating: 4,
        comment: "Compelling story with strong female protagonist. Hard to put down.",
        date: new Date('2024-03-01')
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample books
    const insertedBooks = await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${insertedBooks.length} books`);

    return insertedBooks;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase, sampleBooks }; 