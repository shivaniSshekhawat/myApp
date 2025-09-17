import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FiSearch, FiSettings, FiPaperclip, FiUsers, FiMessageCircle } from 'react-icons/fi';
import { searchData, filterOptions } from '../data/searchData';
import SearchResultItem from './SearchResultItem';
import FilterDropdown from './FilterDropdown';

const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [enabledFilters, setEnabledFilters] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false
  });
  const [showOnlySearch, setShowOnlySearch] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const typingTimerRef = useRef(null);
  const counterTimerRef = useRef(null);
  const [displayCounts, setDisplayCounts] = useState({ all: 0, files: 0, people: 0, chats: 0 });

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let results = searchData;

    // Apply search filter
    if (searchTerm) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      results = results.filter(item => {
        if (activeFilter === 'files') {
          return item.type === 'file' || item.type === 'folder';
        }
        if (activeFilter === 'people') {
          return item.type === 'person';
        }
        if (activeFilter === 'chats') {
          return item.type === 'chat';
        }
        return true;
      });
    }

    // Apply enabled filters
    results = results.filter(item => {
      if (item.type === 'file' || item.type === 'folder') {
        return enabledFilters.files;
      }
      if (item.type === 'person') {
        return enabledFilters.people;
      }
      if (item.type === 'chat') {
        return enabledFilters.chats;
      }
      return true;
    });

    return results;
  }, [searchTerm, activeFilter, enabledFilters]);

  // Dynamic counts that react to searchTerm and enabled filters
  const getCountByCategory = (category) => {
    const matchesSearch = (item) =>
      !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const isEnabledByType = (item) => {
      if (item.type === 'file' || item.type === 'folder') return enabledFilters.files;
      if (item.type === 'person') return enabledFilters.people;
      if (item.type === 'chat') return enabledFilters.chats;
      return true;
    };

    const items = searchData.filter((item) => matchesSearch(item) && isEnabledByType(item));

    if (category === 'all') return items.length;
    if (category === 'files') return items.filter(i => i.type === 'file' || i.type === 'folder').length;
    if (category === 'people') return items.filter(i => i.type === 'person').length;
    if (category === 'chats') return items.filter(i => i.type === 'chat').length;
    return 0;
  };

  // Count-up animation: always count from 0 → target when inputs change
  useEffect(() => {
    const target = {
      all: getCountByCategory('all'),
      files: getCountByCategory('files'),
      people: getCountByCategory('people'),
      chats: getCountByCategory('chats')
    };

    // Reset to 0 before counting up
    setDisplayCounts({ all: 0, files: 0, people: 0, chats: 0 });
    if (counterTimerRef.current) clearInterval(counterTimerRef.current);
    counterTimerRef.current = setInterval(() => {
      setDisplayCounts((prev) => {
        const next = { ...prev };
        let done = true;
        (['all', 'files', 'people', 'chats']).forEach((k) => {
          if (next[k] < target[k]) {
            next[k] = next[k] + 1; // step strictly 1, so user sees 1,2,3,...
            done = false;
          }
        });
        if (done) {
          clearInterval(counterTimerRef.current);
        }
        return next;
      });
    }, 70);

    return () => {
      if (counterTimerRef.current) clearInterval(counterTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, activeFilter, enabledFilters]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowOnlySearch(true);
  };

  // removed global toast; per-row toasts are handled inside items

  const handleFilterToggle = (filterId) => {
    setEnabledFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : part
    );
  };

  return (
    <div
      className={`search-card ${showOnlySearch ? 'only-search' : ''}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
    >
      {showCursor && (
        <div
          className="cursor-circle"
          style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
        />
      )}
      {/* Search Bar */}
      <div className="search-bar">
        {!isLoading && <FiSearch className="search-icon" />}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            if (showOnlySearch) {
              setIsLoading(true);
              typingTimerRef.current = setTimeout(() => {
                setIsLoading(false);
                if (value) setShowOnlySearch(false);
              }, 500);
            }
          }}
          placeholder="Searching is easier"
          className="search-input"
        />
        {isLoading && <div className="spinner" aria-label="Searching" />}
        {searchTerm && !showOnlySearch && (
          <button onClick={handleClearSearch} className="clear-button" aria-label="Clear search">
            Clear
          </button>
        )}
        {showOnlySearch && (
          <button className="quick-access" type="button" aria-label="Quick access" onClick={() => setShowOnlySearch(false)}>
            <span className="quick-key">S</span>
            <span className="quick-label">quick access</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      {!showOnlySearch && (
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          <span className="tab-label">All</span> <span className="count-badge">{displayCounts.all}</span>
        </button>
        {enabledFilters.files && (
          <button
            className={`filter-tab ${activeFilter === 'files' ? 'active' : ''}`}
            onClick={() => setActiveFilter('files')}
          >
            <FiPaperclip className="tab-icon" />
            <span className="tab-label">Files</span> <span className="count-badge">{displayCounts.files}</span>
          </button>
        )}
        {enabledFilters.people && (
          <button
            className={`filter-tab ${activeFilter === 'people' ? 'active' : ''}`}
            onClick={() => setActiveFilter('people')}
          >
            <FiUsers className="tab-icon" />
            <span className="tab-label">People</span> <span className="count-badge">{displayCounts.people}</span>
          </button>
        )}
        {enabledFilters.chats && (
          <button
            className={`filter-tab ${activeFilter === 'chats' ? 'active' : ''}`}
            onClick={() => setActiveFilter('chats')}
          >
            <FiMessageCircle className="tab-icon" />
            <span className="tab-label">Chats</span> <span className="count-badge">{displayCounts.chats}</span>
          </button>
        )}
        <button 
          className="settings-button tabs-right"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="Filter settings"
        >
          <FiSettings />
        </button>
      </div>
      )}

      {/* Filter Dropdown */}
      {showDropdown && !showOnlySearch && (
        <FilterDropdown
          filterOptions={filterOptions}
          enabledFilters={enabledFilters}
          onToggle={handleFilterToggle}
          onClose={() => setShowDropdown(false)}
        />
      )}

      {/* Search Results */}
      {!showOnlySearch && (
      <div className="search-results">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <SearchResultItem
              key={item.id}
              item={item}
              searchTerm={searchTerm}
              highlightText={highlightText}
            />
          ))
        ) : (
          <div className="no-results">
            <div className="empty-state">
              <FiSearch className="empty-icon" aria-hidden="true" />
              <div className="empty-title">Oops… no results found</div>
              <div className="empty-subtitle">Try different keywords or adjust filters</div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default SearchCard;
