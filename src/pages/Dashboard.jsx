import React, { useContext, useEffect, useRef } from 'react';
import { UserContextData } from '../context/userContext';
import './Dashboard.css';

// Predefined popular websites
const popularSites = [
  {
    category: 'Movies',
    sites: [
      { name: 'Multimovies', url: 'https://multimovies.pro', icon: '🎬' } ,
      { name: 'WMovies', url: 'https://wmovies.xyz', icon: '🎥' },
      { name: 'Goojara', url: 'https://goojara.to', icon: '🍿' },
      { name: 'MyFlixerz', url: 'https://myflixerz.to', icon: '📺' },
      { name: 'HydraHD', url: 'https://hydrahd.sh', icon: '🎞️' },
      { name: 'Cineby', url: 'https://cineby.app', icon: '🎬' },
      { name: 'Watch.ug', url: 'https://watch.ug', icon: '👁️' },
      { name: 'Popcorn Movies', url: 'https://popcornmovies.to', icon: '🍿' },
      { name: 'GoMovies', url: 'https://gomovies.sx', icon: '🎬' },
      { name: 'Onion Play', url: 'https://onionplay.ch', icon: '🧅' },
      { name: 'LookMovie', url: 'https://lookmovie2.to', icon: '👀' },
      { name: 'PressPlay', url: 'https://pressplay.top', icon: '▶️' },
      { name: 'MoviesJoy TV', url: 'https://moviesjoytv.to', icon: '😄' },
      { name: 'FMovies', url: 'https://fmovies.co', icon: '🎞️' },
      { name: 'Project Free TV', url: 'https://projectfreetv.sx', icon: '📡' },
      { name: 'SFlix', url: 'https://sflix.to', icon: '🎬' },
      { name: 'TheFlixer TV', url: 'https://theflixertv.to', icon: '📺' },
      { name: 'HD Today', url: 'https://hdtoday.tv', icon: '📺' },
      { name: 'FlixHQ', url: 'https://flixhq.to', icon: '🎞️' },
      { name: 'HuraWatch', url: 'https://hurawatch.cc', icon: '👀' },
      { name: 'BroFlix', url: 'https://broflix.si', icon: '🎬' },
      { name: 'RidoMovies', url: 'https://ridomovies.tv', icon: '🎥' },
      { name: '123Movies', url: 'https://123moviesfree.net', icon: '🍿' },
      { name: 'HDToday.cc', url: 'https://hdtoday.cc', icon: '📽️' },
      { name: 'VidPlay', url: 'https://vidplay.org', icon: '▶️' }, // Added from lmao.jsx
      { name: 'VidPlay.top', url: 'https://vidplay.top', icon: '▶️' }, // Added from lmao.jsx
      { name: 'Putlocker', url: 'https://putlocker.pe', icon: '🔒' },
      { name: 'GoMovies TV', url: 'https://gomoviestv.to', icon: '📺' },
      { name: 'YesMovies', url: 'https://yesmovies.ag', icon: '✓' },
      { name: 'Watch Series', url: 'https://watchseries.pe', icon: '📺' },
      { name: 'Soaper', url: 'https://soaper.top', icon: '🧼' },
      { name: 'Watch32', url: 'https://watch32.sx', icon: '👁️' },
      { name: 'FlickerMini', url: 'https://flickermini.pages.dev', icon: '🎬' },
      { name: 'Soap2dayHDZ', url: 'https://soap2dayhdz.com', icon: '🧼' }, // Added from lmao.jsx
    ]
  },
  {
    category: 'Anime',
    sites: [
      { name: 'Anime Nexus', url: 'https://anime.nexus', icon: '🍥' },
      { name: 'HiAnimeZ', url: 'https://hianimez.to', icon: '🎌' }, // Updated from Hi Anime and lmao.jsx
      { name: '9anime TV', url: 'https://9animetv.to', icon: '🐉' },
      { name: 'Anitaku', url: 'https://anitaku.io', icon: '🏯' },
      { name: 'AnimeKai', url: 'https://animekai.to', icon: '⛩️' },
      { name: 'GoGoAnime', url: 'https://gogoanime.org.vc', icon: '🍙' },
      { name: 'AnimePahe', url: 'https://animepahe.ru', icon: '🎭' },
      { name: 'KAA', url: 'https://kaa.mx', icon: '👊' }, // Updated from KickAssAnime and lmao.jsx
      { name: 'AniWatch TV', url: 'https://aniwatchtv.to', icon: '👁️' },
      { name: 'AnimeZ', url: 'https://animez.org', icon: '🎬' },
      { name: 'AnimeGG', url: 'https://animegg.org', icon: '🥚' },
      { name: 'KissAnime', url: 'https://kissanime.com.ru', icon: '💋' },
      { name: 'AllManga', url: 'https://allmanga.to', icon: '📚' },
      { name: 'AniWorld', url: 'https://aniworld.to', icon: '🌏' },
      { name: 'WCOStream', url: 'https://wcostream.tv', icon: '📺' },
      { name: 'Nyaa', url: 'https://nyaa.land', icon: '🐱' },
      { name: 'W1 123Animes', url: 'https://w1.123animes.ru', icon: '🔢' }, // Updated from 123Animes and lmao.jsx
      { name: 'KayoAnime', url: 'https://kayoanime.com', icon: '🍵' }
    ]
  },
  {
    category: 'Manga',
    sites: [
      { name: 'MangaPark', url: 'https://mangapark.io', icon: '📖' },
      { name: 'MangaFire', url: 'https://mangafire.to', icon: '🔥' },
      { name: 'Comick', url: 'https://comick.io', icon: '📚' },
      { name: 'Batoto', url: 'https://batotoo.com', icon: '🦇' },
      { name: 'MangaDex', url: 'https://mangadex.org', icon: '📘' },
      { name: 'AllManga', url: 'https://allmanga.to', icon: '📑' },
      { name: 'Mangago', url: 'https://mangago.me', icon: '📝' },
      { name: 'WeebCentral', url: 'https://weebcentral.com', icon: '🌟' }
    ]
  },
  {
    category: 'Chatbot',
    sites: [
      { name: 'ChatGPT (OpenAI)', url: 'https://chat.openai.com', icon: '🤖' },
      { name: 'Gemini (Google)', url: 'https://gemini.google.com', icon: '✨' },
      { name: 'Claude (Anthropic)', url: 'https://claude.ai', icon: '🧠' },
      { name: 'Perplexity AI', url: 'https://www.perplexity.ai', icon: '🔍' },
      { name: 'DeepSeek Chat', url: 'https://chat.deepseek.com', icon: '💬' },
      { name: 'Mistral AI', url: 'https://mistral.ai', icon: '🌪️' },
      { name: 'Llama 3 (Meta)', url: 'https://llama.meta.com', icon: '🦙' },
      { name: 'Cohere', url: 'https://cohere.com', icon: '🔄' }
    ]
  },
  {
    category: 'AI Image & Video Generators',
    sites: [
      { name: 'MidJourney', url: 'https://www.midjourney.com', icon: '🎨' },
      { name: 'DALL·E 3', url: 'https://openai.com/dall-e', icon: '🖼️' },
      { name: 'Stable Diffusion', url: 'https://stablediffusionweb.com', icon: '🌈' },
      { name: 'Runway ML', url: 'https://runwayml.com', icon: '🎬' },
      { name: 'Pika Labs', url: 'https://pika.art', icon: '📹' },
      { name: 'Leonardo AI', url: 'https://leonardo.ai', icon: '🎭' },
      { name: 'Suno AI', url: 'https://suno.com', icon: '🎵' }
    ]
  },
  {
    category: 'AI Tools',
    sites: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: '👨‍💻' },
      { name: 'Tabnine', url: 'https://www.tabnine.com', icon: '📝' },
      { name: 'Codeium', url: 'https://codeium.com', icon: '💻' },
      { name: 'Replit Ghostwriter', url: 'https://replit.com/ai', icon: '👻' },
      { name: 'Amazon CodeWhisperer', url: 'https://aws.amazon.com/codewhisperer', icon: '📊' }
    ]
  },
  {
    category: 'AI APIs for Developers',
    sites: [
      { name: 'OpenAI API', url: 'https://platform.openai.com', icon: '🔌' },
      { name: 'Anthropic API', url: 'https://www.anthropic.com/api', icon: '🧩' },
      { name: 'Hugging Face', url: 'https://huggingface.co', icon: '🤗' },
      { name: 'Fireworks AI', url: 'https://fireworks.ai', icon: '🎆' },
      { name: 'Groq API', url: 'https://groq.com', icon: '⚡' }
    ]
  },
  {
    category: 'AI Voice & Speech Tools',
    sites: [
      { name: 'ElevenLabs', url: 'https://elevenlabs.io', icon: '🗣️' },
      { name: 'Murf AI', url: 'https://murf.ai', icon: '🎤' },
      { name: 'Descript', url: 'https://www.descript.com', icon: '🎙️' },
      { name: 'HeyGen', url: 'https://www.heygen.com', icon: '📱' }
    ]
  },
  {
    category: 'Free AI Tools',
    sites: [
      { name: 'DeepSeek Chat (Free)', url: 'https://chat.deepseek.com', icon: '💫' },
      { name: 'Ollama (Local AI)', url: 'https://ollama.ai', icon: '🖥️' },
      { name: 'LM Studio', url: 'https://lmstudio.ai', icon: '🧪' },
      { name: 'Hugging Face Chat', url: 'https://huggingface.co/chat', icon: '💭' }
    ]
  },
  {
    category: 'AI Search Engines',
    sites: [
      { name: 'Perplexity AI', url: 'https://perplexity.ai', icon: '🔎' },
      { name: 'You.com', url: 'https://you.com', icon: '🌐' },
      { name: 'Phind', url: 'https://phind.com', icon: '🔍' }
    ]
  },
  {
    category: 'AI for Productivity',
    sites: [
      { name: 'Notion AI', url: 'https://www.notion.so/product/ai', icon: '📓' },
      { name: 'Grammarly AI', url: 'https://www.grammarly.com', icon: '✏️' },
      { name: 'Tome AI', url: 'https://tome.app', icon: '📊' }
    ]
  },
  {
    category: 'AI for Data & Analytics',
    sites: [
      { name: 'Pandas AI', url: 'https://github.com/gventuri/pandas-ai', icon: '🐼' },
      { name: 'Tableau GPT', url: 'https://www.tableau.com', icon: '📈' }
    ]
  },
  {
    category: 'AI Learning & Courses',
    sites: [
      { name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai', icon: '🧠' },
      { name: 'Fast.ai', url: 'https://www.fast.ai', icon: '🚀' }
    ]
  } ,
  {
    category: 'Notes',
    sites: [
      { name: 'Notion', url: 'https://www.notion.so', icon: '📓' },
      { name: 'Coda', url: 'https://coda.io', icon: '📊' },
      { name: 'ClickUp', url: 'https://clickup.com', icon: '✅' }
    ]
  },
  {
    category: 'Markdown & Developer-Friendly Notes',
    sites: [
      { name: 'Obsidian', url: 'https://obsidian.md', icon: '🔮' },
      { name: 'Logseq', url: 'https://logseq.com', icon: '🧠' },
      { name: 'Typora', url: 'https://typora.io', icon: '📝' }
    ]
  },
  {
    category: 'Simple & Lightweight Notes',
    sites: [
      { name: 'Evernote', url: 'https://evernote.com', icon: '🐘' },
      { name: 'Bear', url: 'https://bear.app', icon: '🐻' },
      { name: 'Simplenote', url: 'https://simplenote.com', icon: '✏️' }
    ]
  },
  {
    category: 'Open-Source & Privacy-Focused Notes',
    sites: [
      { name: 'Joplin', url: 'https://joplinapp.org', icon: '🔒' },
      { name: 'Standard Notes', url: 'https://standardnotes.com', icon: '🛡️' },
      { name: 'Zettlr', url: 'https://www.zettlr.com', icon: '📄' }
    ]
  },
  {
    category: 'Specialized Note-taking Tools',
    sites: [
      { name: 'Roam Research', url: 'https://roamresearch.com', icon: '🔄' },
      { name: 'Tana', url: 'https://tana.inc', icon: '🌱' },
      { name: 'Mem', url: 'https://mem.ai', icon: '🧩' }
    ]
  },
  {
    category: 'Offline/Desktop Note-taking',
    sites: [
      { name: 'OneNote', url: 'https://www.onenote.com', icon: '📔' },
      { name: 'Apple Notes', url: 'https://www.apple.com/notes', icon: '🍏' },
      { name: 'QOwnNotes', url: 'https://www.qownnotes.org', icon: '📋' }
    ]
  }
];

const Dashboard = ({ selectedCategory, searchQuery, selectedType, scrollToTopSignal }) => {
  const { trackSiteUsage } = useContext(UserContextData); // Access trackSiteUsage from context
  const sitesContainerRef = useRef(null); // Ref for the main container of site cards
  const categoryRefs = useRef({}); // Refs for each category section

  // Add animation index to cards when the displayed set of cards changes
  useEffect(() => {
    if (sitesContainerRef.current) {
      // Get all card-like elements for animation
      const cards = sitesContainerRef.current.querySelectorAll('.site-card, .site-list-item, .result-button');
      cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index); // Set animation index
      });
    }
  }, [searchQuery, selectedType, popularSites]);

  // Scroll to the selected category when it changes (only if not searching)
  useEffect(() => {
    if (!searchQuery && selectedCategory && categoryRefs.current[selectedCategory]) {
      // Scroll to the category section with offset
      const element = categoryRefs.current[selectedCategory];
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - 120, // Offset from the top
        behavior: 'smooth'
      });
    }
  }, [selectedCategory, searchQuery]);

  // Scroll dashboard to top when search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      // Scroll dashboard cards to top when searching
      const dashboard = document.querySelector('.dashboard-container');
      if (dashboard) dashboard.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery]);

  // Scroll dashboard to top when scrollToTopSignal changes
  useEffect(() => {
    if (scrollToTopSignal) {
      const dashboard = document.querySelector('.dashboard-container');
      if (dashboard) dashboard.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollToTopSignal]);

  const handleSiteClick = (site) => {
    trackSiteUsage(site); // Track the site usage for recently used
    window.open(site.url, '_blank'); // Open the site in a new tab
  };

  // --- START: Search Functionality Logic ---

  // List of allowed movie site domains for search
  const allowedMovieSites = [
    'multimovies.pro',
    'myflixerz.to',
    'gomovies.sx',
    'theflixertv.to',
    'wmovies.xyz', 'soap2dayhdz.com',
    'lookmovie2.to',
    'fmovies.co',
    'sflix.to',
    'watch.ug',
    'popcornmovies.to',
    'onionplay.ch',
    'pressplay.top',
    'broflix.si',
    '123moviesfree.net',
    'hdtoday.cc',
    'vidplay.org',
    'vidplay.top',
    'yesmovies.ag',
    'watchseries.pe',
    'soaper.top',
    'watch32.sx'
  ];
  // List of allowed anime site domains for search
  const allowedAnimeSites = [
    'hianimez.to',
    '9animetv.to',
    'anitaku.io',
    'animekai.to',
    'gogoanime.org.vc',
    'kaa.mx',
    'kayoanime.com',
    'aniwatchtv.to',
    'animez.org',
    'animegg.org',
    'w1.123animes.ru'
  ];  // Returns the list of sites to show in search results based on selectedType
  const getSearchableSites = () => {
    if (!searchQuery || !searchQuery.trim()) return []; // No search query, return empty
    let results = [];
    const movieCategoryData = popularSites.find(cat => cat.category === 'Movies');
    const animeCategoryData = popularSites.find(cat => cat.category === 'Anime');

    if (selectedType === 'movie') {
      if (movieCategoryData) {
        // Filter and map allowed movie sites
        results = movieCategoryData.sites
          .filter(site => allowedMovieSites.some(domain => site.url.toLowerCase().includes(domain.toLowerCase())))
          .map(site => ({ ...site, category: 'Movies' }));
      }
    } else if (selectedType === 'anime') {
      if (animeCategoryData) {
        // Filter and map allowed anime sites
        results = animeCategoryData.sites
          .filter(site => allowedAnimeSites.some(domain => site.url.toLowerCase().includes(domain.toLowerCase())))
          .map(site => ({ ...site, category: 'Anime' }));
      }
    } else {
      // If no specific type, search both
      if (movieCategoryData) {
        const movieSites = movieCategoryData.sites
          .filter(site => allowedMovieSites.some(domain => site.url.toLowerCase().includes(domain.toLowerCase())))
          .map(site => ({ ...site, category: 'Movies' }));
        results.push(...movieSites);
      }
      if (animeCategoryData) {
        const animeSites = animeCategoryData.sites
          .filter(site => allowedAnimeSites.some(domain => site.url.toLowerCase().includes(domain.toLowerCase())))
          .map(site => ({ ...site, category: 'Anime' }));
        results.push(...animeSites);
      }
    }
    // Remove duplicates by url
    return results.filter((site, index, self) =>
      index === self.findIndex((s) => s.url === site.url)
    );
  };

  // Returns the correct search URL for a given site and query
  const getSiteSearchUrl = (site, query) => {
    const baseSiteUrl = site.url.replace(/\/home$/, ''); // Remove /home if present
    const formattedQuery = query.trim().replace(/\s+/g, '-');
    const q = encodeURIComponent(formattedQuery).replace(/%2D/g, '-').replace(/%20/g, '-');
    // Movie site patterns
    if (site.url.toLowerCase().includes('myflixerz.to')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('gomovies.sx')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('theflixertv.to')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('wmovies.xyz')) return `${baseSiteUrl}/${q}/`;
    if (site.url.toLowerCase().includes('soap2dayhdz.com')) return `${baseSiteUrl}/search/?q=${q}`;
    if (site.url.toLowerCase().includes('lookmovie2.to')) return `${baseSiteUrl}/movies/search/?q=${encodeURIComponent(query.trim())}`;
    if (site.url.toLowerCase().includes('fmovies.co')) return `${baseSiteUrl}/search/?q=${q}`;
    if (site.url.toLowerCase().includes('sflix.to')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('watch.ug')) return `${baseSiteUrl}/movie/${q}`;
    if (site.url.toLowerCase().includes('popcornmovies.to')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('onionplay.ch')) return `${site.url}/search/${q}`;
    if (site.url.toLowerCase().includes('pressplay.top')) return `${baseSiteUrl}/movie/${q}`;
    if (site.url.toLowerCase().includes('broflix.si')) return `${baseSiteUrl}/search?text=${q}`;
    if (site.url.toLowerCase().includes('123moviesfree.net')) return `${baseSiteUrl}/search/?q=${q}`;
    if (site.url.toLowerCase().includes('hdtoday.cc')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('vidplay.org') || site.url.toLowerCase().includes('vidplay.top')) return `${baseSiteUrl}/index.php?menu=search&query=${q}`;
    if (site.url.toLowerCase().includes('yesmovies.ag')) return `${baseSiteUrl}/search.html?q=${q}`;
    if (site.url.toLowerCase().includes('watchseries.pe')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('soaper.top')) return `${baseSiteUrl}/search.html?keyword=${q}`;
    if (site.url.toLowerCase().includes('watch32.sx')) return `${baseSiteUrl}/search/${q}`;
    if (site.url.toLowerCase().includes('multimovies.pro')) {
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${baseSiteUrl}/?s=${plusQuery}`;
    }
    // Anime site patterns
    const plusQueryAnime = query.trim().replace(/\s+/g, '+');
    if (site.url.toLowerCase().includes('hianimez.to')) return `${baseSiteUrl}/search?keyword=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('9animetv.to')) return `${baseSiteUrl}/search?keyword=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('anitaku.io')) return `${baseSiteUrl}/?s=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('animekai.to')) return `${baseSiteUrl}/browser?keyword=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('gogoanime.org.vc')) return `${baseSiteUrl}/?s=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('kaa.mx')) return `${baseSiteUrl}/search?q=${encodeURIComponent(query.trim())}`;
    if (site.url.toLowerCase().includes('kayoanime.com')) return `${baseSiteUrl}/?s=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('aniwatchtv.to')) return `${baseSiteUrl}/search?keyword=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('animez.org')) return `${baseSiteUrl}/?act=search&f[status]=all&f[sortby]=lastest-chap&f[keyword]=${encodeURIComponent(query.trim())}`;
    if (site.url.toLowerCase().includes('animegg.org')) return `${baseSiteUrl}/search/?q=${plusQueryAnime}`;
    if (site.url.toLowerCase().includes('w1.123animes.ru')) return `${baseSiteUrl}/search?keyword=${plusQueryAnime}`;
    // Default: Google site search
    return `https://www.google.com/search?q=site:${site.url}+${encodeURIComponent(query.trim())}`;
  };

  const searchableSitesResult = getSearchableSites(); // Get search results for rendering

  // --- END: Search Functionality Logic ---
  // REMOVE DUPLICATE useEffect hooks and function declarations below

  // Helper: get all sites from Movies, Anime, Manga, minus excluded
  const excludedSites = [
    'hydrahd',
    'cineby',
    // 'popcorn movies', // Keep commented if it's in allowedMovieSites
    'onion play',
    'pressplay',
    'moviesjoytv',
    'the flixer tv',
    'hdtoday',
    'hurawatch',
    'ridomovies',
    // 'vidplay', // Keep commented if it's in allowedMovieSites
    'watch32',
    'flickermini',
    'soap2night',
    // 'wmovies', // Keep commented if it's in allowedMovieSites
    'goojara',
    // 'watch.ug' // Keep commented if it's in allowedMovieSites
  ];
  // The following functions were duplicated. The primary definitions are above.
  // const getSearchableSites = () => { ... }; 
  // const getSiteSearchUrl = (site, query) => { ... };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header"></div>

      {searchQuery && searchQuery.trim() ? (
        <section className="search-results-section neobrut-category" ref={sitesContainerRef}>
          <h2 className="neobrut-category-title search-results-title">
            Results for "{searchQuery}"
            ({selectedType === 'movie' ? 'Movies' : selectedType === 'anime' ? 'Anime' : 'All Results'})
          </h2>          {searchableSitesResult.length > 0 ? (
            <ul className="sites-grid results-grid">
              {searchableSitesResult.map(site => (
                <li key={site.url + '-' + site.name} className="site-card animated-card">
                  <a
                    href={getSiteSearchUrl(site, searchQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackSiteUsage(site)}
                    style={{ textDecoration: 'none' }}
                  >
                    <button className="result-button">
                      <span className="button_top">{site.name}</span>
                    </button>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results-message">No sites found for "{searchQuery}" in the selected category.</p>
          )}
        </section>
      ) : (
        <>
          {/* Recently Used Section Removed */}
          
          {/* Popular Sites by Category - always assign ref if not searching */}
          <ul className="sites-list" ref={!searchQuery ? sitesContainerRef : null}>
            {popularSites.map((category) => (
              <li
                key={category.category}
                ref={el => categoryRefs.current[category.category] = el}
                className="site-category-list neobrut-category"
                data-category={category.category}
              >
                <div className="site-category-title neobrut-category-title">{category.category}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="category-sites-list">
                  {category.sites
                    .filter(site => !excludedSites.some(ex => site.name.toLowerCase().includes(ex)))
                    .map((site, index) => (
                      <li key={`${category.category}-${site.name}-${index}`} className="site-list-item neobrut-list-item animated-card"> {/* Added animated-card here too */}
                        <span className="site-list-name neobrut-site-name">{site.name}</span>
                        <button
                          onClick={() => handleSiteClick(site)}
                          className="neobrut-link-btn"
                        >
                          LINK
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
