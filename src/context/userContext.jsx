import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create an API instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const UserContextData = createContext(null);

const UserContext = ({ children }) => {
  const [recentlyUsed, setRecentlyUsed] = useState([]);
  const [loading, setLoading] = useState(false);

  // Save recently used sites to localStorage
  useEffect(() => {
    localStorage.setItem('recent_global', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  // Load recently used sites from localStorage on mount
  useEffect(() => {
    const savedRecent = localStorage.getItem('recent_global');
    if (savedRecent) setRecentlyUsed(JSON.parse(savedRecent));
  }, []);

  // Track site usage and update recently used sites (localStorage only)
  const trackSiteUsage = (site) => {
    setRecentlyUsed(prev => {
      const filtered = prev.filter(s => s.url !== site.url);
      return [site, ...filtered].slice(0, 10); // Keep only the 10 most recent
    });
  };

  return (
    <UserContextData.Provider 
      value={{ 
        recentlyUsed, 
        trackSiteUsage, 
        loading
      }}
    >
      {children}
    </UserContextData.Provider>
  )
}

export default UserContext
