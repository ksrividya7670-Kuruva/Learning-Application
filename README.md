# Learning Application (Learnhub / SkillNova)

An interactive, modern full-stack web application designed for learning coding, roadmaps, interview preparation, code playgrounds, and course management.

## 🚀 Features

- **Course Exploration & Interactive Lessons**: Browse courses, roadmaps, and topic guides.
- **Interactive Code Editor / Playground**: Practice coding directly inside the browser.
- **Interview Preparation**: Practice questions and quizzes.
- **User Dashboard & Profile**: Track progress, manage enrolled courses, and update profile settings.
- **Admin Panel**: Manage courses, lessons, roadmaps, users, and announcements.
- **AI Assistant**: Built-in AI chat widget powered by Gemini.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Chart.js / Recharts
- **Backend**: Node.js, Express, Nodemailer, Bcrypt, JSON Web Tokens (JWT), Mongoose
- **Database / Storage**: File-based JSON store / MongoDB

---

## 🏁 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ksrividya7670-Kuruva/Learning-Application.git
cd Learning-Application
npm install
```

### 3. Run the Development Server

Start both the backend server and frontend development server:

#### Start Backend (API Server):
```bash
node server/server.js
```
The server will run on `http://localhost:8000`.

#### Start Frontend (Vite Dev Server):
```bash
npm run dev
```
The client will run on `http://localhost:5173`.

---

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```
