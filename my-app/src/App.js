import React from 'react';
import './App.css';
import SearchCard from './components/SearchCard';

function App() {
  return (
    <div className="App">
      <a
        className="github-link"
        href="https://github.com/shivaniSshekhawat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open GitHub profile @shivaniSshekhawat"
      >
        @shivaniSshekhawat
      </a>
      <div className="app-container">
        <SearchCard />
      </div>
    </div>
  );
}

export default App;
