# Smart Donation System – Final Project Context

---

## 🚀 Project Overview

The *Smart Donation System* is a full-stack web application built using the *MERN stack (MongoDB, Express.js, React.js, Node.js)*.  
It aims to connect donors with NGOs/admins for resource donations (clothes, books, food, etc.), enabling seamless management, approval, and tracking of donations.

---

## 📋 Requirements & Stack

*Academic/College Requirements Met:*
- *Stack:* MERN (MongoDB, Express.js, React.js, Node.js v22)
- *DB Tools:* MongoDB Compass (local), not Atlas/SaaS
- *API Testing:* Postman
- *Version Control:* GitHub with distinct commits and PRs per team member
- *Restrictions:* No extra dependencies except express, mongoose, ejs, morgan, etc.
- *Frontend:* 12–15 React components (User side)
- *Backend:* 10–12 APIs (Admin side)
- *Modules:* User/admin signup, login, forgot/change password, category management, donation flow

---

## 🗂 System Modules & Features

### *User Side (React)*
- Registration & Login
- Forgot & Change Password
- Profile Management (view/update)
- Browse Categories
- Place Donations (DonationForm)
- Donation Cart & Confirmation
- Donation History (MyDonations) with Status Tracking
- Contact NGO/Support (optional)
- Responsive UI, Navbar, Footer

### *Admin Side (Express + MongoDB)*
- Admin Authentication & Role-based Access
- Category CRUD (Create, Read, Update, Delete)
- View All Donations (with filters)
- Approve/Reject Donations
- Admin Dashboard (showing stats: users, donations, categories)
- View All Users

### *APIs*
- Auth: signup, login, forgot-password, change-password
- Categories: add, view, update, delete
- Donations: create, fetch (all/user), update status, delete
- Admin: dashboard stats, view users

---

## 🛠 Technical Architecture

- *Backend:* Node.js with Express.js, structured into modular routes (auth.js, categories.js, donations.js, admin.js, users.js)
- *Database:* MongoDB (local, managed with Mongoose), schemas for User, Donation, Category
- *Frontend:* React.js (Vite), modular components per page/feature; uses React Router for navigation and fetch for API integration
- *Security:* JWT authentication, password hashing (bcrypt), admin middleware, role-based access
- *Validation:* Input validation on both frontend (form checks) and backend (API checks)
- *Testing:* All REST APIs verified with Postman, database operations checked in Compass

---

## 👥 Team Contributions

### *Hari Patel – Backend & Database*
- Set up Express server and MongoDB connection
- Designed and implemented all Mongoose schemas
- Developed authentication (JWT, bcrypt) and core REST APIs
- Implemented backend validation, error handling, and security middleware
- Used Postman and Compass for API/DB testing

### *Dev Patel – Frontend & Integration*
- Built all React components/pages for user and admin flows
- Managed state, navigation, and UI/UX design
- Integrated frontend with backend APIs (fetch, JWT storage)
- Implemented client-side validation and responsive layouts
- Documented setup and usage

### *Het – Admin Features & QA*
- Developed admin-side features (category management, donation approval, dashboard)
- Implemented and tested role-based access and admin middleware
- Built donation approval/rejection logic and MyDonations status badges
- Conducted QA, PR reviews, bug fixes, and Postman test cases

---

## 🗓 Development Process

- *Initial Planning:* Defined requirements, created design/blueprint, divided tasks based on strengths
- *Daily Progress Tracking:* Documented in commits and PRs, with clear commit messages per task/member (see GitHub history)
- *Collaboration:* Used GitHub for version control, branches, PRs, and code review
- *Testing & QA:* Regular integration and end-to-end flow testing after each module/feature

---

## 📦 Final State / Completion

- *All core flows are implemented and tested*
  - User and admin authentication, profile, donation, and category management
  - Donation status tracking and admin approval
  - Stats dashboard, validation, and error handling in place
- *Meets all academic/FSD requirements*
- *Codebase is modular, readable, and ready for demo/viva*
- *Ready for further enhancements (optional: contact/support, more analytics, etc.)*

---

## 📝 Usage Instructions

1. *Backend:*  
   - Install dependencies (npm install)
   - Start MongoDB locally
   - Run server (node app.js or via nodemon)
2. *Frontend:*  
   - Install dependencies (npm install)
   - Start dev server (npm run dev)
3. *API Testing:*  
   - Import Postman collection and test endpoints
4. *DB Management:*  
   - Use MongoDB Compass to view/manage collections

---

## 💬 Viva/Presentation Highlights

- Why MERN? Fast UI, scalable backend, flexible NoSQL DB
- How is it different? Donation-focused, not e-commerce, with approval/status flows
- Security: JWT, role-based, hashed passwords
- Collaboration: Separate PRs/commits, reviewed and tested as a team

---

*For further details, refer to the codebase, README, and commit history.*