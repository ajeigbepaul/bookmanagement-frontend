# Book Management Frontend

A modern, full-featured frontend for the Book Management app, built with **Next.js (App Router)**, **Tailwind CSS**, **shadcn/ui**, **Zustand**, and **React Query**. This app connects to a NestJS backend and provides a beautiful, responsive UI for managing books, users, comments, reviews, and more.

---

## 🚀 Features

- **Authentication**: Login/register with JWT, protected routes, user profile.
- **Book List**: Paginated, searchable, and filterable list of books with cover images, genre, and stats.
- **Book Details**: View all book info, cover, author, description, comments, reviews, and follow/unfollow author.
- **Book CRUD**: Create, edit, and delete books (with cover image support).
- **Comments**: Add and view comments on books.
- **Reviews**: Add and view reviews with star ratings; see average rating.
- **Follow System**: Follow/unfollow book authors, see followers/following.
- **Modern UI**: Responsive, card-based design with gradients, icons, and shadcn/ui components.
- **State Management**: Zustand for filters and pagination.
- **Data Fetching**: React Query for all API calls, caching, and mutations.
- **Toasts & Feedback**: shadcn/ui toasts for all user actions.
- **Breadcrumbs**: Navigation context on all major pages.

---

## 🛠️ Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Query](https://tanstack.com/query/latest)
- [Lucide Icons](https://lucide.dev/)
- [NestJS Backend](https://github.com/your-backend-repo) (API)

---

## 📦 Folder Structure

```
bookmanagement-frontend/
├── app/                # Next.js app directory (pages, routes)
│   ├── books/          # Book-related pages (list, details, new, edit)
│   ├── profile/        # User profile page
│   └── ...
├── components/         # Reusable UI components (BookCard, BookForm, Navbar, etc.)
├── context/            # AuthContext and other providers
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── services/           # API service functions
├── store/              # Zustand stores
├── types/              # TypeScript types
├── public/             # Static assets
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
├── README.md           # This file
└── ...
```

---

## ⚙️ Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/bookmanagement-frontend.git
   cd bookmanagement-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file in the root:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```
   - Set the URL to your running NestJS backend.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🌐 Environment Variables

- `NEXT_PUBLIC_API_URL` — The base URL of your backend API (NestJS).

---

## 📝 Usage

- **Login/Register** to access all features.
- **Create a Book**: Add title, author, description, genre, and a cover image URL (e.g., from Unsplash).
- **Edit/Delete Books**: Only the book owner can edit or delete.
- **Search/Filter**: Use the search bar and genre filter on the main page.
- **View Book Details**: See all info, comments, reviews, and follow/unfollow the author.
- **Add Comments/Reviews**: Share your thoughts and rate books.
- **Profile**: View and edit your user info, see followers/following.

---

## ✨ UI/UX Highlights

- **Bookshelf Layout**: Book cards are sized and spaced like real books, with cover images and action icons.
- **Edge Gradients**: Subtle background gradients for a modern, calm look.
- **Responsive**: Works beautifully on mobile, tablet, and desktop.
- **Accessible**: Focus/hover states, keyboard navigation, and clear feedback.

---

## 🤝 Credits

- UI components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- Cover images: [Unsplash](https://unsplash.com/)
- Backend: [NestJS Book Management API](https://github.com/your-backend-repo)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
