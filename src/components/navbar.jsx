import React, { useState, useRef, useEffect } from 'react';

const CategoryNavbar = ({ categories, onCategorySelect, loading, searchQuery, setSearchQuery, selectedType, setSelectedType, onSearchHover }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const lastHoveredCategory = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const selectorTimeout = useRef(null);
  const [isHoveringGemz, setIsHoveringGemz] = useState(false);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);
  const [hideAnim, setHideAnim] = useState(false);

  // Helper to detect mobile
  const isMobile = () => window.innerWidth <= 600;

  // Mobile: control search/toggle with click on GEMZ
  const handleGemzClick = () => {
    if (isMobile()) {
      setShowSearch(true);
      setSelectorOpen(true);
    }
  };

  // Show both on either hover (desktop) or click (mobile)
  useEffect(() => {
    if (isMobile()) {
      // On mobile, do nothing here (handled by click), and never auto-hide
      return;
    }
    if (isHoveringGemz || isHoveringToggle) {
      setShowSearch(true);
      setSelectorOpen(true);
      if (selectorTimeout.current) clearTimeout(selectorTimeout.current);
    } else {
      selectorTimeout.current = setTimeout(() => {
        setShowSearch(false);
        setSelectorOpen(false);
      }, 20000); // 20 seconds
    }
  }, [isHoveringGemz, isHoveringToggle]);

  // On mobile, prevent toggle from hiding on mouse leave
  useEffect(() => {
    if (isMobile()) {
      setHideAnim(false);
    }
  }, [showSearch, selectorOpen]);

  // Ensure search stays open when hovering toggle
  const handleToggleSwitchMouseEnter = () => {
    if (selectorTimeout.current) clearTimeout(selectorTimeout.current);
    setSelectorOpen(true);
    setShowSearch(true); // <-- Ensure search stays open
  };

  const handleToggleSwitchMouseLeave = () => {
    if (isMobile()) {
      selectorTimeout.current = setTimeout(() => {
        setSelectorOpen(false);
        setShowSearch(false);
      }, 30000); // 30 seconds for mobile
    } else {
      selectorTimeout.current = setTimeout(() => {
        setSelectorOpen(false);
        setShowSearch(false);
      }, 1000); // 1 second for desktop
    }
  };

  // Hide animation effect
  useEffect(() => {
    if (!selectorOpen && !showSearch) {
      setHideAnim(true);
    } else {
      setHideAnim(false);
    }
  }, [selectorOpen, showSearch]);

  // On mouse enter, only trigger redirect if it's a new hover and not loading
  const handleCategoryMouseEnter = (category) => {
    if (!loading && category !== lastHoveredCategory.current) {
      setActiveCategory(category);
      onCategorySelect(category, 'hover');
      lastHoveredCategory.current = category;
    }
  };

  // On mouse leave from the whole navbar, reset lastHoveredCategory
  const handleNavbarMouseLeave = () => {
    lastHoveredCategory.current = null;
    setShowSearch(false);
  };

  return (
    <div className="navbar-container" onMouseLeave={!isMobile() ? handleNavbarMouseLeave : undefined}>
      <div className="navbar">
        {/* Render categories: mobile = filtered, desktop = all */}
        {(isMobile() ? categories.filter(cat =>
            ['Movies & TV', 'Anime', 'Manga', 'Chatbots'].includes(cat.category)
          ) : categories).slice(0, Math.ceil((isMobile() ? categories.filter(cat =>
            ['Movies & TV', 'Anime', 'Manga', 'Chatbots'].includes(cat.category)
          ) : categories).length / 2)).map((category) => (
          <button
            key={category.category}
            className={`nav-item ${activeCategory === category.category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category.category);
              onCategorySelect(category.category, 'click');
            }}
            // REDIRECTS TO DASHBOARD CATEGORY ON HOVER (FIRST HALF)
            onMouseEnter={() => handleCategoryMouseEnter(category.category)}
          >
            <span className="nav-icon">{category.sites[0].icon}</span>
            {category.category}
          </button>
        ))}

        {/* GEMZ brand in the middle */}
        <div
          className="navbar-brand gemz-hover-area"
          onClick={isMobile() ? handleGemzClick : undefined}
          onMouseEnter={!isMobile() ? () => {
            setIsHoveringGemz(true);
            if (onSearchHover) onSearchHover();
            // Animate navbar to top (bounce)
            const navbar = document.querySelector('.navbar-container');
            if (navbar && !navbar.classList.contains('navbar-bounce')) {
              navbar.classList.add('navbar-bounce');
              setTimeout(() => {
                navbar.classList.remove('navbar-bounce');
              }, 400);
            }
          } : undefined}
          onMouseLeave={!isMobile() ? () => setIsHoveringGemz(false) : undefined}
          style={{ position: 'relative', minWidth: 0 }}
        >
          <span className={`gemz-text${showSearch ? ' hide' : ''}`}
            onMouseEnter={!isMobile() ? () => {
              if (onSearchHover) onSearchHover();
              const navbar = document.querySelector('.navbar-container');
              if (navbar && !navbar.classList.contains('navbar-bounce')) {
                navbar.classList.add('navbar-bounce');
                setTimeout(() => {
                  navbar.classList.remove('navbar-bounce');
                }, 400);
              }
            } : undefined}
          >GEMZ</span>
          <div className={`navbar-search-bar${showSearch ? ' show' : ''}`}
            onMouseEnter={!isMobile() ? () => {
              if (onSearchHover) onSearchHover();
              const navbar = document.querySelector('.navbar-container');
              if (navbar && !navbar.classList.contains('navbar-bounce')) {
                navbar.classList.add('navbar-bounce');
                setTimeout(() => {
                  navbar.classList.remove('navbar-bounce');
                }, 400);
              }
            } : undefined}
          >
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus={showSearch}
            />
          </div>
        </div>
        {/* Second half of the categories */}
        {(isMobile() ? categories.filter(cat =>
            ['Movies & TV', 'Anime', 'Manga', 'Chatbots'].includes(cat.category)
          ) : categories).slice(Math.ceil((isMobile() ? categories.filter(cat =>
            ['Movies & TV', 'Anime', 'Manga', 'Chatbots'].includes(cat.category)
          ) : categories).length / 2)).map((category) => (
          <button
            key={category.category}
            className={`nav-item ${activeCategory === category.category ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category.category);
              onCategorySelect(category.category, 'click');
            }}
            // REDIRECTS TO DASHBOARD CATEGORY ON HOVER (SECOND HALF)
            onMouseEnter={() => handleCategoryMouseEnter(category.category)}
          >
            <span className="nav-icon">{category.sites[0].icon}</span>
            {category.category}
          </button>
        ))}
      </div>
      {/* Toggle switch below search bar, outside navbar */}
      <div
        className={`navbar-toggle-switch${selectorOpen ? ' show' : ''}${!selectorOpen && hideAnim ? ' hide' : ''}`}
        onMouseEnter={() => {
          handleToggleSwitchMouseEnter();
          if (onSearchHover) onSearchHover();
          const navbar = document.querySelector('.navbar-container');
          if (navbar && !navbar.classList.contains('navbar-bounce')) {
            navbar.classList.add('navbar-bounce');
            setTimeout(() => {
              navbar.classList.remove('navbar-bounce');
            }, 400);
          }
        }}
        onMouseLeave={handleToggleSwitchMouseLeave}
        style={{ pointerEvents: selectorOpen || showSearch ? 'auto' : 'none', display: (selectorOpen || showSearch || hideAnim) ? 'flex' : 'none' }}
        onTransitionEnd={e => {
          if (!selectorOpen && !showSearch) setHideAnim(false);
        }}
      >
        <button
          className={`toggle-btn${selectedType === 'movie' ? ' selected' : ''}`}
          onMouseEnter={() => setSelectedType('movie')}
        >Movie</button>
        <button
          className={`toggle-btn${selectedType === 'anime' ? ' selected' : ''}`}
          onMouseEnter={() => setSelectedType('anime')}
        >Anime</button>
      </div>
    </div>
  );
};

export default CategoryNavbar;