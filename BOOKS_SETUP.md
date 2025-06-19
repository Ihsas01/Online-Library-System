# Adding Books to the Library System

This guide explains how to add books to your Online Library System.

## Method 1: Using the Frontend Interface (Recommended)

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend application:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Navigate to the Books page:**
   - Go to `http://localhost:5173/books`
   - If no books are displayed, you'll see an "Add Sample Books" button
   - Click the button to populate the database with 12 sample books

## Method 2: Using the Backend Seed Script

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Run the seed script:**
   ```bash
   npm run seed
   ```

   This will:
   - Connect to your MongoDB database
   - Clear any existing books
   - Add 12 sample books with realistic data

## Method 3: Using the API Endpoint

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Make a POST request to the seed endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/books/seed
   ```

   Or use any API client like Postman:
   - Method: POST
   - URL: `http://localhost:5000/api/books/seed`

## Method 4: Adding Individual Books via API

You can add individual books using the create book endpoint:

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Your Book Title",
    "author": "Author Name",
    "isbn": "978-1234567890",
    "description": "Book description here",
    "genre": ["Fiction", "Mystery"],
    "coverImage": "https://example.com/cover.jpg",
    "totalCopies": 5,
    "availableCopies": 5,
    "publishedYear": 2024,
    "publisher": "Publisher Name",
    "language": "English"
  }'
```

## Sample Books Included

The seed data includes 12 popular books:

1. **The Great Gatsby** - F. Scott Fitzgerald
2. **To Kill a Mockingbird** - Harper Lee
3. **1984** - George Orwell
4. **The Hobbit** - J.R.R. Tolkien
5. **Pride and Prejudice** - Jane Austen
6. **The Catcher in the Rye** - J.D. Salinger
7. **The Lord of the Rings** - J.R.R. Tolkien
8. **Animal Farm** - George Orwell
9. **The Alchemist** - Paulo Coelho
10. **The Kite Runner** - Khaled Hosseini
11. **The Book Thief** - Markus Zusak
12. **The Hunger Games** - Suzanne Collins

Each book includes:
- Complete metadata (title, author, ISBN, description)
- Genre categorization
- Cover images from Unsplash
- Availability information
- Ratings and review counts
- Publication details

## Database Requirements

Make sure you have:
- MongoDB running locally on `mongodb://localhost:27017/library`
- Or update the connection string in `backend/server.js` and `backend/seed.js`

## Troubleshooting

### No books showing up?
1. Check if the backend server is running
2. Verify MongoDB connection
3. Check browser console for errors
4. Try the seed endpoint manually

### Seed button not appearing?
- Make sure you're on the books page (`/books`)
- Check if books are already loaded
- Refresh the page

### API errors?
- Verify the backend is running on port 5000
- Check MongoDB connection
- Review server logs for detailed error messages

## Customizing Book Data

To add your own books or modify the sample data:

1. **Edit the seed data:**
   - Modify `backend/seed.js` or `backend/controllers/bookController.js`
   - Update the `sampleBooks` array with your desired books

2. **Add more books:**
   - Follow the same structure as existing books
   - Include all required fields (title, author, ISBN, etc.)
   - Use valid image URLs for cover images

3. **Run the seed again:**
   - This will replace all existing books with the new data

## Book Schema

Each book should have the following structure:

```javascript
{
  title: "Book Title",
  author: "Author Name",
  isbn: "978-1234567890",
  description: "Book description",
  genre: ["Genre1", "Genre2"],
  coverImage: "https://example.com/cover.jpg",
  totalCopies: 5,
  availableCopies: 5,
  location: {
    shelf: "A1",
    aisle: "Fiction"
  },
  publishedYear: 2024,
  publisher: "Publisher Name",
  language: "English",
  rating: {
    average: 4.5,
    count: 10
  }
}
```

This setup provides a complete library system with sample data that you can easily extend and customize for your needs. 