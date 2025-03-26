# Blog Platform - Backend

## 📌 Project Overview
This is the backend for a **Blog Platform**, where users can **create, read, update, and delete blog posts**. Users can also **comment on posts, react with emojis, and manage their accounts**. The API supports **authentication with JWT stored in cookies**, ensuring security and session management.

---

## 🚀 Features
- **User Authentication (JWT + Cookies)**
  - Register, login, and logout functionality.
- **Blog Management**
  - Create, read, update, and delete blog posts.
- **Comment System**
  - Users can add, view, and delete comments on blog posts.
- **Emoji-Based Reactions**
  - Users can react to blog posts and comments with various emojis.
- **Role-Based Access Control**
  - Only blog owners or admins can update or delete a post.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone <repository-url>
cd blog-platform-backend
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up the environment variables
Create a `.env` file in the root directory and add:
```env
PORT=4010
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
CLIENT_URL=http://localhost:3000
```

### 4️⃣ Start the server
```sh
npm run dev
```
Server runs on `http://localhost:4010`.

---

## 🔗 API Endpoints

### **1️⃣ Authentication Routes** (`/api/auth`)
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/register`    | Register a new user |
| POST   | `/login`       | Login a user & set JWT cookie |
| POST   | `/logout`      | Logout and clear JWT cookie |

### **2️⃣ Blog Routes** (`/api/blogs`)
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/`           | Create a new blog post (Auth required) |
| GET    | `/`           | Get all blog posts |
| GET    | `/:id`        | Get a single blog post by ID |
| PUT    | `/:id`        | Update a blog post (Only owner or admin) |
| DELETE | `/:id`        | Delete a blog post (Only owner or admin) |

### **3️⃣ Comment Routes** (`/api/comments`)
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| POST   | `/:blogId`     | Add a comment to a blog post (Auth required) |
| GET    | `/:blogId`     | Get comments for a blog post |
| DELETE | `/:commentId`  | Delete a comment (Only owner or admin) |

### **4️⃣ Reaction Routes** (`/api/reactions`)
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| POST   | `/blog/:blogId`          | React to a blog post (Auth required) |
| POST   | `/comment/:commentId`    | React to a comment (Auth required) |
| GET    | `/:type(blog|comment)/:id` | Get reactions for a blog post or comment |

---

## 🛠️ Technologies Used
- **Node.js & Express.js** - Backend framework
- **MongoDB & Mongoose** - Database & ODM
- **JWT & Cookies** - Authentication
- **bcrypt.js** - Password hashing
- **CORS & Cookie-Parser** - Middleware
- **dotenv** - Environment variable management

---

## 📜 License
This project is licensed under the MIT License.

---

## 📧 Contact
For questions or suggestions, contact **Daniel Igwe** at **igwed93@email.com**.

