# 📚 RyansQuizzard

**A web app to help people in their learning journeys**

*Created by Ryan O'Connor*

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A web application for creating and studying flashcards and quizzes. Built with Next.js, TypeScript, and Tailwind CSS. There's a lot to learn in the world, and this app helps you organize and study that knowledge.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd v0-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Local Storage**: Client-side data persistence
- **Theme System**: Dark/light mode

## 📱 How to Use

### Creating Flashcards
1. Navigate to **Flashcards** → **Create Set**
2. Enter a title and optional description
3. Add cards with front (question) and back (answer) content
4. Save your set and start studying

### Building Quizzes
1. Go to **Quizzes** → **Create Quiz**
2. Choose question types: Multiple Choice, True/False, or Short Answer
3. Add questions with correct answers and explanations
4. Save and take your quiz

### Studying
- **Flashcards**: Click cards to flip, use navigation buttons to move through sets
- **Quizzes**: Answer questions and review detailed results with explanations
- **Progress Tracking**: Visual progress bars show your advancement

### Data Management
- **Export**: Download your data as JSON files
- **Import**: Upload previously exported data
- **Sample Data**: Try the app with pre-built content

## 📁 Pages & Functionality

### Home Page (`/`)
- Dashboard showing all your flashcards and quizzes
- Quick start buttons for creating new content
- Export/import functionality for all data
- Sample data generation for testing

### Flashcards (`/flashcards`)
- **Create** (`/flashcards/create`): Build new flashcard sets
- **Study** (`/flashcards/[id]`): Interactive flashcard study mode
- **Edit** (`/flashcards/edit/[id]`): Modify existing flashcard sets
- **List** (`/flashcards`): View all your flashcard sets

### Quizzes (`/quizzes`)
- **Create** (`/quizzes/create`): Build new quizzes with multiple question types
- **Take** (`/quizzes/[id]`): Interactive quiz taking interface
- **Edit** (`/quizzes/edit/[id]`): Modify existing quizzes
- **List** (`/quizzes`): View all your quizzes

### Legal Pages
- **Privacy Policy** (`/privacy`): Data handling information
- **Terms of Service** (`/terms`): Usage terms and conditions

## 📁 Project Structure

```
v0-quiz/
├── app/                          # Next.js App Router pages
│   ├── flashcards/               # Flashcard functionality
│   │   ├── create/              # Create new flashcard sets
│   │   ├── edit/[id]/           # Edit existing sets
│   │   ├── [id]/                # Study flashcard sets
│   │   └── page.tsx             # Flashcards listing
│   ├── quizzes/                 # Quiz functionality
│   │   ├── create/              # Create new quizzes
│   │   ├── edit/[id]/           # Edit existing quizzes
│   │   ├── [id]/                # Take quizzes
│   │   └── page.tsx             # Quizzes listing
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage dashboard
├── components/                   # Reusable components
│   ├── ui/                      # UI components (Radix-based)
│   ├── flashcard.tsx            # Interactive flashcard component
│   ├── theme-provider.tsx       # Theme management
│   └── theme-toggle.tsx         # Theme toggle button
├── hooks/                       # Custom React hooks
│   └── use-local-storage.ts     # Local storage hook
├── lib/                         # Utility functions
│   └── sample-data.ts           # Sample content generation
├── types/                       # TypeScript type definitions
│   └── data.ts                  # Data structure types
└── public/                      # Static assets
    └── *.svg                    # Logo files
```

## 🎯 Features

### Core Functionality
- **Flashcard Creation & Study**: Create custom flashcard sets with front/back content
- **Interactive Quiz Builder**: Build quizzes with multiple choice, true/false, and short answer questions
- **Local Storage**: All data stored locally in your browser
- **Dark/Light Mode**: Automatic theme switching with manual toggle

### Study Features
- **Flashcard Study Mode**: Flip cards with smooth animations
- **Quiz Taking**: Interactive quiz interface with progress tracking
- **Results Review**: Detailed feedback with correct answers and explanations
- **Shuffle & Reset**: Randomize card order for better retention

### Data Management
- **Import/Export**: Backup and restore your data in JSON format
- **Sample Data**: Try the app with pre-built content
- **Data Validation**: Robust error handling and input validation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Full-stack deployment support

## 👨‍💻 Author

**Ryan O'Connor** - Full-stack developer and creator of RyansQuizzard

- **GitHub**: [@RyanPatty](https://github.com/RyanPatty)
- **LinkedIn**: [in/ryan710](https://linkedin.com/in/ryan710)
- **Website**: [www.darkoxygensoftware.com](https://www.darkoxygensoftware.com)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**