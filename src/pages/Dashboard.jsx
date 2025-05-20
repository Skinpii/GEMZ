import React, { useContext, useEffect, useRef } from 'react';
import { UserContextData } from '../context/userContext';
import './Dashboard.css';

// Predefined popular websites
const popularSites = [
  {
    category: 'Movies',
    sites: [
      { name: 'MultiMovies', url: 'https://multimovies.media', icon: '🎞️' },
      { name: 'Soap2Night', url: 'https://soap2night.cc', icon: '🎬' },
      { name: 'WMovies', url: 'https://wmovies.xyz', icon: '🎥' },
      { name: 'Goojara', url: 'https://goojara.to', icon: '🍿' },
      { name: 'MyFlixerz', url: 'https://myflixerz.to', icon: '📺' },
      { name: 'Cineby', url: 'https://cineby.app', icon: '🎬' },
      { name: 'Watch.ug', url: 'https://watch.ug', icon: '👁️' },
      { name: 'Popcorn Movies', url: 'https://popcornmovies.to', icon: '🍿' },
      { name: 'GoMovies', url: 'https://gomovies.sx', icon: '🎬' },
      { name: 'Onion Play', url: 'https://onionplay.ch', icon: '🧅' },
      { name: 'LookMovie', url: 'https://lookmovie2.to', icon: '👀' },
      { name: 'PressPlay', url: 'https://pressplay.top', icon: '▶️' },
      { name: 'MoviesJoy TV', url: 'https://moviesjoytv.to', icon: '😄' },
      { name: 'FMovies', url: 'https://fmovies.co', icon: '🎞️' },
      { name: 'Soap2day HD', url: 'https://soap2dayhd.co', icon: '🧼' },
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
      { name: 'VidPlay', url: 'https://vidplay.top', icon: '▶️' },
      { name: 'Putlocker', url: 'https://putlocker.pe', icon: '🔒' },
      { name: 'GoMovies TV', url: 'https://gomoviestv.to', icon: '📺' },
      { name: 'YesMovies', url: 'https://yesmovies.ag', icon: '✓' },
      { name: 'Watch Series', url: 'https://watchseries.pe', icon: '📺' },
      { name: 'Soaper', url: 'https://soaper.top', icon: '🧼' },
      { name: 'Watch32', url: 'https://watch32.sx', icon: '👁️' },
      { name: 'FlickerMini', url: 'https://flickermini.pages.dev', icon: '🎬' }
    ]
  },
  {
    category: 'Anime',
    sites: [
      { name: 'Anime Nexus', url: 'https://anime.nexus', icon: '🍥' },
      { name: 'Hi Anime', url: 'https://hianime.to', icon: '🎌' },
      { name: '9anime TV', url: 'https://9animetv.to', icon: '🐉' },
      { name: 'Anitaku', url: 'https://anitaku.io', icon: '🏯' },
      { name: 'AnimeKai', url: 'https://animekai.to', icon: '⛩️' },
      { name: 'GoGoAnime', url: 'https://gogoanime.org.vc', icon: '🍙' },
      { name: 'AnimePahe', url: 'https://animepahe.ru', icon: '🎭' },
      { name: 'KickAssAnime', url: 'https://kickassanime.mx', icon: '👊' },
      { name: 'AniWatch TV', url: 'https://aniwatchtv.to', icon: '👁️' },
      { name: 'AnimeZ', url: 'https://animez.org', icon: '🎬' },
      { name: 'AnimeGG', url: 'https://animegg.org', icon: '🥚' },
      { name: 'AnimeStream', url: 'https://animestream.net', icon: '📺' },
      { name: 'KissAnime', url: 'https://kissanime.com.ru', icon: '💋' },
        { name: 'AllManga', url: 'https://allmanga.to', icon: '📚' },      { name: 'AniWorld', url: 'https://aniworld.to', icon: '🌏' },
      { name: 'WCOStream', url: 'https://wcostream.tv', icon: '📺' },
      { name: 'Nyaa', url: 'https://nyaa.land', icon: '🐱' },
      { name: '123Animes', url: 'https://123animes.ru', icon: '🔢' },
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
    category: 'Chatbots',
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
    category: 'AI Assistants',
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
    category: 'Notes Apps',
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
  const { recentlyUsed, trackSiteUsage } = useContext(UserContextData);
  const sitesRef = useRef(null);
  const categoryRefs = useRef({});

  // Add animation index to cards on component mount
  useEffect(() => {
    if (sitesRef.current) {
      const cards = sitesRef.current.querySelectorAll('.site-card');
      cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
      });
    }
  }, [recentlyUsed]);
  
  // Scroll to the selected category when it changes
  useEffect(() => {
    if (selectedCategory && categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [selectedCategory]);

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
    // Track the site usage
    trackSiteUsage(site);
    
    // Open the site in a new tab
    window.open(site.url, '_blank');
  };

  // Helper: get all sites from Movies, Anime, Manga, minus excluded
  // Only include the specified movie sites in the search result section
  const allowedMovieSites = [
    'multimovies.media',
    'myflixerz.to',
    'gomovies.sx',
    'theflixertv.to',
    'wmovies.xyz',
    'soap2dayhdz.com',
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
  ];
  const getSearchableSites = () => {
    let allowedCategories = ['Movies', 'Anime', 'Manga'];
    if (selectedType === 'anime') allowedCategories = ['Anime'];
    if (selectedType === 'movie') allowedCategories = ['Movies'];
    let sites = popularSites.filter(cat =>
      allowedCategories.includes(cat.category)
    ).flatMap(cat => cat.sites.map(site => ({ ...site, category: cat.category })));
    if (selectedType === 'movie' || (searchQuery && selectedType !== 'anime' && selectedType !== 'manga')) {
      // Only show the specified movie sites in the movie result section
      sites = sites.filter(site => allowedMovieSites.some(domain => site.url.includes(domain)));
    }
    if (selectedType === 'anime') {
      // Only show the specified anime sites in the anime result section
      sites = sites.filter(site => allowedAnimeSites.some(domain => site.url.includes(domain)));
    }
    return sites;
  };

  // Helper: build search URL for each site
  const getSiteSearchUrl = (site, query) => {
    // Replace spaces with hyphens for search URLs, and do not encode hyphens
    const formattedQuery = query.trim().replace(/\s+/g, '-');
    // Only encode characters except hyphens
    const q = encodeURIComponent(formattedQuery).replace(/%2D/g, '-').replace(/%20/g, '-');
    // Custom search URL for specific sites
    if (site.url.includes('myflixerz.to')) {
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('gomovies.sx')) {
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('theflixertv.to')) {
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('wmovies.xyz')) {
      // wmovies.xyz uses /{query}/, but avoid double slashes
      return `${site.url}/${q}/`;
    }
    if (site.url.includes('soap2dayhdz.com')) {
      // soap2dayhdz.com uses /search/?q={query}
      return `${site.url}/search/?q=${q}`;
    }
    if (site.url.includes('lookmovie2.to')) {
      return `${site.url}/movies/view/${q}`;
    }
    if (site.url.includes('fmovies.co')) {
      // fmovies.co uses /search/?q={query}
      return `${site.url}/search/?q=${q}`;
    }
    if (site.url.includes('sflix.to')) {
      // sflix.to uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('watch.ug')) {
      // watch.ug uses /movie/{query}
      return `${site.url}/movie/${q}`;
    }
    if (site.url.includes('popcornmovies.to')) {
      // popcornmovies.to uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('onionplay.ch')) {
      // onionplay.ch uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('pressplay.top')) {
      // pressplay.top uses /movie/{query}
      return `${site.url}/movie/${q}`;
    }
    if (site.url.includes('broflix.si')) {
      // broflix.si uses /search?text={query}
      return `${site.url}/search?text=${q}`;
    }
    if (site.url.includes('123moviesfree.net')) {
      // 123moviesfree.net uses /search/?q={query}
      return `${site.url}/search/?q=${q}`;
    }
    if (site.url.includes('hdtoday.cc')) {
      // hdtoday.cc uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('vidplay.org') || site.url.includes('vidplay.top')) {
      // vidplay uses /index.php?menu=search&query={query}
      return `${site.url}/index.php?menu=search&query=${q}`;
    }
    if (site.url.includes('yesmovies.ag')) {
      // yesmovies.ag uses /search.html?q={query}
      return `${site.url}/search.html?q=${q}`;
    }
    if (site.url.includes('watchseries.pe')) {
      // watchseries.pe uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('soaper.top')) {
      // soaper.top uses /search.html?keyword={query}
      return `${site.url}/search.html?keyword=${q}`;
    }
    if (site.url.includes('watch32.sx')) {
      // watch32.sx uses /search/{query}
      return `${site.url}/search/${q}`;
    }
    if (site.url.includes('multimovies.media')) {
      // multimovies.media uses /?s={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/?s=${plusQuery}`;
    }
    if (site.url.includes('hianimez.to')) {
      // hianimez.to uses /search?keyword={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/search?keyword=${plusQuery}`;
    }
    if (site.url.includes('9animetv.to')) {
      // 9animetv.to uses /search?keyword={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/search?keyword=${plusQuery}`;
    }
    if (site.url.includes('anitaku.io')) {
      // anitaku.io uses /?s={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/?s=${plusQuery}`;
    }
    if (site.url.includes('animekai.to')) {
      // animekai.to uses /browser?keyword={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/browser?keyword=${plusQuery}`;
    }
    if (site.url.includes('gogoanime.org.vc')) {
      // gogoanime.org.vc uses /?s={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/?s=${plusQuery}`;
    }
    if (site.url.includes('kaa.mx')) {
      // kaa.mx uses /search?q={query} with %20 for spaces (standard URL encoding)
      const encodedQuery = encodeURIComponent(query.trim());
      return `${site.url}/search?q=${encodedQuery}`;
    }
    if (site.url.includes('kayoanime.com')) {
      // kayoanime.com uses /?s={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/?s=${plusQuery}`;
    }
    if (site.url.includes('aniwatchtv.to')) {
      // aniwatchtv.to uses /search?keyword={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/search?keyword=${plusQuery}`;
    }
    if (site.url.includes('animez.org')) {
      // animez.org uses /?act=search&f[status]=all&f[sortby]=lastest-chap&f[keyword]={query} with %20 for spaces
      const encodedQuery = encodeURIComponent(query.trim());
      return `${site.url}/?act=search&f[status]=all&f[sortby]=lastest-chap&f[keyword]=${encodedQuery}`;
    }
    if (site.url.includes('animegg.org')) {
      // animegg.org uses /search/?q={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/search/?q=${plusQuery}`;
    }
    if (site.url.includes('w1.123animes.ru')) {
      // w1.123animes.ru uses /search?keyword={query} with + for spaces
      const plusQuery = query.trim().replace(/\s+/g, '+');
      return `${site.url}/search?keyword=${plusQuery}`;
    }
    // Default: Google site search
    return `https://www.google.com/search?q=site:${site.url}+${q}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header"></div>
      {/* Search Result Section */}
      {searchQuery && searchQuery.trim() && (
        <section className="section">
          <h2 className="section-title">Results for "{searchQuery}"</h2>
          <div className="sites-grid">
            {getSearchableSites().map((site, idx) => (
              <a
                key={`result-${site.name}-${idx}`}
                className="site-card result-card"
                href={getSiteSearchUrl(site, searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Search for "${searchQuery}" on ${site.name}`}
              >
                <div className="site-icon">{site.icon}</div>
                <h3 className="site-name">{site.name}</h3>
                <div className="site-search-query">{searchQuery}</div>
                <div className="site-category">{site.category}</div>
              </a>
            ))}
          </div>
        </section>
      )}
      {/* Recently Used Section */}
      {recentlyUsed.length > 0 && (
        <section className="section">
          <h2 className="section-title">Recently Used</h2>
          <div className="sites-grid" ref={sitesRef}>
            {recentlyUsed.map((site, index) => (
              <div 
                key={`recent-${index}`} 
                className="site-card"
                onClick={() => handleSiteClick(site)}
              >
                <div className="site-icon">{site.icon}</div>
                <h3 className="site-name">{site.name}</h3>
              </div>
            ))}
          </div>
        </section>
      )}      {/* Popular Sites by Category */}
      {popularSites.map((category) => (
        <section 
          key={category.category} 
          className="section"
          ref={el => categoryRefs.current[category.category] = el}
        >
          <h2 className="section-title">{category.category}</h2>
          <div className="sites-grid" ref={sitesRef}>
            {category.sites.map((site, index) => (
              <div 
                key={`${category.category}-${index}`} 
                className="site-card"
                onClick={() => handleSiteClick(site)}
              >
                <div className="site-icon">{site.icon}</div>
                <h3 className="site-name">{site.name}</h3>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Dashboard;
