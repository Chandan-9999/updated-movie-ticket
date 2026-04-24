# QuickShow - Premium Movie Ticket Booking App

QuickShow is a modern, premium web application for browsing movies, booking tickets, and managing reservations. Built with the MERN stack (MongoDB, Express, React, Node.js), it features a stunning glassmorphism design, fluid animations, and a seamless user experience.

## ✨ Features

- **Premium UI/UX:** Dark-mode glassmorphism aesthetic with Framer Motion animations.
- **Dynamic Seat Selection:** Interactive cinema layout with a live floating price calculation bar.
- **Payment Gateway Simulation:** Beautiful flipping 3D credit card and UPI QR code payment flows.
- **Movie Browsing:** Integration with TMDB API for the latest movies, details, and ratings.
- **User Dashboard:** "My Bookings" page with live countdown timers to showtimes and cancellation capabilities.
- **Admin Portal:** Comprehensive dashboard to manage shows, set ticket prices, and view bookings.
- **Smart Assistant:** Integrated AI Chatbot (Gemini) that has context of currently playing movies and your bookings.
- **Authentication:** Secure user login and registration powered by Clerk.

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling & Glassmorphism)
- **Framer Motion** (Animations & Transitions)
- **Lucide React** (Icons)
- **React Router Dom** (Navigation)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js & Express.js**
- **MongoDB** (Mongoose)
- **Inngest** (Background Jobs/Webhooks)
- **Clerk SDK** (Authentication)

## 🛠️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Clerk API Keys
- TMDB API Key
- Gemini API Key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Chandan-9999/updated-movie-ticket.git
   cd updated-movie-ticket
   ```

2. Install Client Dependencies
   ```bash
   cd client
   npm install
   ```

3. Install Server Dependencies
   ```bash
   cd ../server
   npm install
   ```

4. Set up Environment Variables
   Create a `.env` file in the `server` directory and add your keys:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   CLERK_SECRET_KEY=your_clerk_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BASE_URL=http://localhost:5000
   VITE_CURRENCY=₹
   ```

5. Run the Application
   Open two terminals:
   
   **Terminal 1 (Client):**
   ```bash
   cd client
   npm run dev
   ```
   
   **Terminal 2 (Server):**
   ```bash
   cd server
   npm run server
   ```

## 📸 Screenshots
*(Add screenshots of the Home Page, Seat Selection, Payment Gateway, and Admin Dashboard here)*

## 📄 License
This project is licensed under the MIT License.
