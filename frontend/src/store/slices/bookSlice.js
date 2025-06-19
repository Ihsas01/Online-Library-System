import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ page = 1, limit = 10, search = '', genre = '', availability = '', sort = '', minRating = 0 }) => {
    const response = await axios.get(`${API_URL}/books`, {
      params: { page, limit, search, genre, availability, sort, minRating }
    });
    return response.data;
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id) => {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData) => {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData }) => {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData);
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id) => {
    await axios.delete(`${API_URL}/books/${id}`);
    return id;
  }
);

export const addReview = createAsyncThunk(
  'books/addReview',
  async ({ bookId, reviewData }) => {
    const response = await axios.post(`${API_URL}/books/${bookId}/reviews`, reviewData);
    return response.data;
  }
);

export const borrowBook = createAsyncThunk(
  'books/borrowBook',
  async (bookId) => {
    const response = await axios.post(`${API_URL}/books/${bookId}/borrow`);
    return response.data;
  }
);

export const returnBook = createAsyncThunk(
  'books/returnBook',
  async (bookId) => {
    const response = await axios.post(`${API_URL}/books/${bookId}/return`);
    return response.data;
  }
);

const initialState = {
  books: [],
  currentBook: null,
  totalBooks: 0,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalBooks = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Book By Id
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Book
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex(book => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        if (state.currentBook?._id === action.payload._id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(book => book._id !== action.payload);
        if (state.currentBook?._id === action.payload) {
          state.currentBook = null;
        }
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.reviews.push(action.payload);
          // Update average rating
          const totalRating = state.currentBook.reviews.reduce((sum, review) => sum + review.rating, 0);
          state.currentBook.rating = totalRating / state.currentBook.reviews.length;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Borrow Book
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.available = false;
          state.currentBook.borrowedBy = action.payload.userId;
          state.currentBook.dueDate = action.payload.dueDate;
        }
        const bookIndex = state.books.findIndex(book => book._id === action.payload.bookId);
        if (bookIndex !== -1) {
          state.books[bookIndex].available = false;
        }
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Return Book
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBook) {
          state.currentBook.available = true;
          state.currentBook.borrowedBy = null;
          state.currentBook.dueDate = null;
        }
        const bookIndex = state.books.findIndex(book => book._id === action.payload.bookId);
        if (bookIndex !== -1) {
          state.books[bookIndex].available = true;
        }
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearCurrentBook } = bookSlice.actions;
export default bookSlice.reducer; 