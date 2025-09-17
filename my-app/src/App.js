import React from 'react';
import './App.css';
import SearchCard from './components/SearchCard';

function App() {
  return (
    <div className="App">
      <a
        className="github-link"
        href="https://github.com/shivaniSshekhawat/myApp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile @shivaniSshekhawat"
      >
        @shivaniSshekhawat
      </a>
      <div className="app-container">
        <SearchCard />
      </div>
      <footer className="footer-note" role="contentinfo">
        This project is an assignment for educational purposes only. All images are credited to their respective owners (e.g., Unsplash). No commercial use intended.
      </footer>
    </div>
  );
}

export default App;
