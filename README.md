
---

# AniSensei

AniSensei is a feature-rich React application designed to provide users with the latest movie recommendations and suggestions, leveraging the power of the TMDB API. The application offers a seamless and engaging user experience, enhanced with Tailwind CSS, and supports multi-language features.

## Features

### Authentication
- **Login/Sign Up:** Secure authentication system for user account management.
- **Sign In / Sign Up Forms:** Easy-to-use forms with validation.
- **Redirect to Browse Page:** Users are redirected to the browse page upon successful authentication.

### Main Functionality
- **Browse (after authentication):** Explore a wide range of movies.
- **Header:** Intuitive navigation with a visually appealing header.
- **Main Movie:** Display of the main highlighted movie with background trailer.
- **Trailer in Background:** Embedded YouTube video for movie trailers with autoplay and mute functionality.
- **Title & Description:** Detailed information about the main movie.
- **Movie or TvShow Suggestions:** Personalized movie suggestions based on user preferences.
- **Movie/TvShow Lists:** Multiple movie lists to explore different categories.
- **AniSensei Search Bar:** Powerful search functionality for discovering new movies or TvShow , just write what is on your mind.
- **Movie Suggestions:** Tailored movie suggestions based on search results.
- **Movie Watchlists:** Create and manage custom movie collections with default lists (Want to Watch, Currently Watching, Completed) and unlimited custom lists.
- **Enhanced Movie Cards:** Easy-to-use dropdown for adding movies to different watchlists directly from browse page.


## Setup and Installation

### Prerequisites
- Node.js
- npm or yarn
- Firebase Account
- TMDB API Key
- Gemini API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anisensei.git
   cd anisensei
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API keys and other necessary configuration:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Deployment
Deploy the application to your preferred hosting service. For Firebase Hosting, follow these steps:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```

4. Deploy the application:
   ```bash
   firebase deploy
   ```

## Project Structure
```
anisensei/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── assets/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── .gitignore
├── package.json
└── tailwind.config.js
```

## Key Implementations

### Hooks
- **useRef Hook:** For accessing DOM elements directly.
- **Custom Hooks:** `usePopularMovies`, `useNowPlayingMovies`,`useAniSensei`

### State Management
- **Redux Store:** Configured with `userSlice`, `movieSlice`, `anisenseiSlice`, `watchlistsSlice`.
- **Memoization:** To optimize performance (used redux-store) .
- **Watchlists Management:** Complete state management for multiple movie lists with Firebase sync.

### API Integration
- **TMDB API:** For fetching movie data.
- **Gemini API:** For advanced search and recommendation functionality based on user data.

### Styling
- **Tailwind CSS:** For responsive and modern UI design.

## New Features

### Movie Watchlists
AniSensei now includes a comprehensive watchlists system that allows users to organize their movies beyond the basic starred functionality:

- **Default Lists:** Three pre-configured lists available to all users:
  - Want to Watch
  - Currently Watching  
  - Completed

- **Custom Lists:** Users can create unlimited custom watchlists with personalized names

- **Easy Management:** 
  - Add movies to any list directly from movie cards via dropdown menu
  - View all watchlists on dedicated `/watchlists` page
  - Create new custom lists with simple form interface
  - Delete custom lists (default lists are protected)

- **Firebase Integration:** All watchlist data is automatically synced with Firebase Realtime Database for persistence across sessions

- **Enhanced Navigation:** New watchlists icon in header provides quick access to all movie collections

## Contributing

We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

