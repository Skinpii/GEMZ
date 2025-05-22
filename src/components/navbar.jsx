import React, { useState, useRef, useEffect } from 'react';
import SearchInput from './SearchInput';
import ToggleSwitch from './ToggleSwitch';

const NAV_CATEGORIES = [
  { category: 'Movies', icon: '' },
  { category: 'Anime', icon: '' },
  { category: 'Manga', icon: '' },
  { category: 'Chatbot', icon: '' },
  { category: 'Notes', icon: '' },
  { category: 'AI Tools', icon: '' },
];

const CategoryNavbar = ({ onCategorySelect, loading, searchQuery, setSearchQuery, selectedType, setSelectedType, onSearchHover }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const lastHoveredCategory = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isHoveringGemz, setIsHoveringGemz] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to detect mobile
  const isMobile = () => window.innerWidth <= 600;

  // Mobile: control search/toggle with click on GEMZ
  const handleGemzClick = () => {
    if (isMobile()) {
      setShowSearch(true);
    }
  };

  // Show search on hover/click
  useEffect(() => {
    if (isMobile()) return;
    if (isHoveringGemz) {
      setShowSearch(true);
    } else {
      if (!searchQuery || searchQuery.trim() === '') {
        setTimeout(() => {
          setShowSearch(false);
        }, 1000);
      } else {
        setShowSearch(true);
      }
    }
  }, [isHoveringGemz, searchQuery]);

  // On mouse enter, only trigger redirect if it's a new hover and not loading
  const handleCategoryMouseEnter = (category) => {
    if (!loading && category !== lastHoveredCategory.current) {
      setActiveCategory(category);
      onCategorySelect(category, 'hover');
      lastHoveredCategory.current = category;
      
      // Scroll to category section with 100px offset
      const categoryElement = document.querySelector(`li.site-category-list[data-category="${category}"]`);
      if (categoryElement) {
        const elementPosition = categoryElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - 100, // 100px offset from the top
          behavior: 'smooth'
        });
      }
    }
  };

  // On mouse leave from the whole navbar, reset lastHoveredCategory
  const handleNavbarMouseLeave = () => {
    lastHoveredCategory.current = null;
    setShowSearch(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategorySelect) onCategorySelect(category);
  };
  const handleSearchHover = () => {
    // Trigger scroll to top if needed
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Call the onSearchHover callback if provided
    if (onSearchHover) {
      onSearchHover();
    }
  };
  return (
    <div className="navbar-container" onMouseLeave={!isMobile() ? handleNavbarMouseLeave : undefined} style={{ background: '#e8e8e8', paddingBottom: '10px', boxShadow: scrolled ? '0 4px 16px 0 rgba(60,60,60,0.10)' : 'none', alignItems: 'flex-start' }}>
      <nav className="navbar" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Left categories - only show on desktop */}
        {!isMobile() && (
          <div className="navbar-categories" style={{ display: 'flex', alignItems: 'flex-start', gap: '2px', flex: 1, justifyContent: 'flex-end' }}>
            {NAV_CATEGORIES.slice(0, 3).map(cat => (
              <button
                key={cat.category}
                className={`nav-item${activeCategory === cat.category ? ' active' : ''}`}
                onClick={() => handleCategoryClick(cat.category)}
                disabled={loading}
                onMouseEnter={() => handleCategoryMouseEnter(cat.category)}
              >
                <span className="nav-icon">{cat.icon}</span>
                {cat.category === 'AI & Assistants' || cat.category === 'AI' ? 'AI' : cat.category}
              </button>
            ))}
          </div>
        )}
        
        {/* Search center - always show with adjusted styles for mobile/desktop */}
        <div
          className="navbar-search-center"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: isMobile() ? '1 1 100%' : '0 0 400px', 
            minWidth: isMobile() ? '100%' : 250, 
            maxWidth: isMobile() ? '100%' : 400, 
            margin: 0, 
            padding: 0, 
            flexDirection: 'column' 
          }}
          onMouseEnter={handleSearchHover}
        >
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {!scrolled && (
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <ToggleSwitch 
                checked={selectedType === 'anime'} 
                onToggle={(isAnime) => setSelectedType(isAnime ? 'anime' : 'movie')}
                leftLabel="Movie" 
                rightLabel="Anime" 
              />
            </div>
          )}
        </div>
        
        {/* Right categories - only show on desktop */}
        {!isMobile() && (
          <div className="navbar-categories" style={{ display: 'flex', alignItems: 'flex-start', gap: '2px', flex: 1, justifyContent: 'flex-start' }}>
            {NAV_CATEGORIES.slice(3, 6).map(cat => (
              <button
                key={cat.category}
                className={`nav-item${activeCategory === cat.category ? ' active' : ''}`}
                onClick={() => handleCategoryClick(cat.category)}
                disabled={loading}
                onMouseEnter={() => handleCategoryMouseEnter(cat.category)}
              >
                <span className="nav-icon">{cat.icon}</span>
                {cat.category === 'AI & Assistants' || cat.category === 'AI' ? 'AI' : cat.category}
              </button>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default CategoryNavbar;