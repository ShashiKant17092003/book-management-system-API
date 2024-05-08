### API Documentation

This API provides endpoints to manage books and user authentication.

#### Authentication

- **POST /user/signup**
  - Description: Sign up a new user.
  - Request Body:
    - username (string): Username of the new user.
    - password (string): Password of the new user.
  - Response:
    - 200 OK:
      - message: "signed Up succesfully"
      - token: JWT token for authentication (expires in 12 hours).
    - 500 Internal Server Error: Server failed to create the account.

- **POST /user/login**
  - Description: Log in an existing user.
  - Request Body:
    - username (string): Username of the user.
    - password (string): Password of the user.
  - Response:
    - 200 OK:
      - message: "login succesfully"
      - token: JWT token for authentication (expires in 12 hours).
    - 500 Internal Server Error: Server failed to authenticate the user.

#### Books

- **GET /books**
  - Description: Retrieve all books.
  - Authorization: Requires a valid JWT token in the 'auth' header.
  - Response:
    - 200 OK:
      - books (array): List of all books.
    - 500 Internal Server Error: Server failed to retrieve books.

- **POST /books**
  - Description: Add a new book.
  - Authorization: Requires a valid JWT token in the 'auth' header.
  - Request Body:
    - title (string): Title of the book.
    - author (string): Author of the book.
    - desc (string): Description of the book.
    - books (number): Number of books.
  - Response:
    - 200 OK:
      - message: "book added succefully"
      - book_id: ID of the added book.
    - 500 Internal Server Error: Server failed to add the book.

- **PUT /books/:id**
  - Description: Update a book by its ID.
  - Authorization: Requires a valid JWT token in the 'auth' header.
  - Request Parameters:
    - id (number): ID of the book to be updated.
  - Request Body: (Fields to be updated)
    - title (string): Title of the book.
    - author (string): Author of the book.
    - desc (string): Description of the book.
    - books (number): Number of books.
  - Response:
    - 200 OK:
      - message: "book updated successfully"
    - 404 Not Found: Book with the given ID not found.
    - 500 Internal Server Error: Server failed to update the book.

- **DELETE /books/:id**
  - Description: Delete a book by its ID.
  - Authorization: Requires a valid JWT token in the 'auth' header.
  - Request Parameters:
    - id (number): ID of the book to be deleted.
  - Response:
    - 200 OK:
      - message: "Deleted Successfully"
    - 404 Not Found: Book with the given ID not found.
    - 500 Internal Server Error: Server failed to delete the book.

#### Middleware

- **Authentication.js**
  - Description: Middleware to authenticate requests using JWT token.
  - Usage: Include this middleware in routes that require authentication.
  - Request Header:
    - auth: JWT token.
  - Response:
    - 403 Forbidden: Invalid or missing JWT token.

#### Environment Variables

- **.env**
  - PORT: Port number for the server. Default is 3000.
  - mongoDb_URL: MongoDB connection URL.
  - Secret: Secret key for JWT token encryption.

### Usage

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set environment variables in the `.env` file.
4. Start the server: `npm start`.
5. Use the provided endpoints to manage books and authenticate users.

### Note

- Ensure proper authorization using JWT tokens for accessing protected routes.
- Replace sensitive data like passwords and secrets with environment variables for security.
- Handle errors gracefully and provide meaningful error messages in responses.
