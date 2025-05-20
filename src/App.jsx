import React, { useContext, useState, useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import CategoryNavbar from './components/navbar.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import './components/navbar.css'
import './App.css'
import { UserContextData } from './context/userContext.jsx'
import { delay } from './utils/animationHelper.js'

const App = () => {
  const { loading } = useContext(UserContextData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // Added state for selectedType
  const [dashboardScrollSignal, setDashboardScrollSignal] = useState(0);

  // Define categories based on the Dashboard's popularSites structure
  const categories = [
    { category: 'Movies', sites: [{ icon: '' }] },
    { category: 'Anime', sites: [{ icon: '' }] },
    { category: 'Manga', sites: [{ icon: '' }] },
    { category: 'Chatbots', sites: [{ icon: '' }] },  
    { category: 'AI Assistants', sites: [{ icon: '' }] },
    { category: 'Notes Apps', sites: [{ icon: '' }] }
  ];
  
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);
  
  const handleSplashComplete = async () => {
    await delay(500);
    setShowSplash(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(prev => {
      if (prev !== category) {
        return category;
      }
      return prev;
    });
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && contentReady && (
        <>
          <CategoryNavbar 
            categories={categories} 
            onCategorySelect={handleCategorySelect} 
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            onSearchHover={() => setDashboardScrollSignal(s => s + 1)}
          />
          <main className={`content ${contentReady ? 'content-visible' : ''}`}>
            <Dashboard 
              selectedCategory={selectedCategory} 
              searchQuery={searchQuery}
              selectedType={selectedType}
              scrollToTopSignal={dashboardScrollSignal}
            />
          </main>
        </>
      )}
    </>
  )
}

export default App
