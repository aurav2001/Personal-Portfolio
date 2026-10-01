import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'portfolio_theme_settings';
const FIRESTORE_DOC = 'theme';
const FIRESTORE_COLLECTION = 'site_settings';

export const THEME_PRESETS = [
  {
    id: 'default',
    name: 'Cosmic Royal (Default)',
    mode: 'default',
    primary: '#3b82f6',
    accent: '#f472b6',
    bg: '#020617',
    desc: 'The original deep cosmic dark universe palette'
  },
  {
    id: 'dark-obsidian',
    name: 'Obsidian Midnight',
    mode: 'dark',
    primary: '#a855f7',
    accent: '#06b6d4',
    bg: '#09090b',
    desc: 'Deep midnight obsidian with cyberpunk purple & cyan'
  },
  {
    id: 'dark-emerald',
    name: 'Cyber Emerald',
    mode: 'dark',
    primary: '#10b981',
    accent: '#06b6d4',
    bg: '#06130d',
    desc: 'Matrix inspired sleek dark with vibrant emerald & teal'
  },
  {
    id: 'light-clean',
    name: 'Modern Pure Light',
    mode: 'light',
    primary: '#2563eb',
    accent: '#db2777',
    bg: '#f8fafc',
    desc: 'Crisp, high-contrast light mode with rich typography'
  },
  {
    id: 'light-sunset',
    name: 'Warm Sunset Light',
    mode: 'light',
    primary: '#d97706',
    accent: '#e11d48',
    bg: '#fefce8',
    desc: 'Warm sunlit editorial light mode with amber & coral'
  }
];

export const ThemeProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      mode: 'default', // 'default' | 'dark' | 'light'
      primary: '#3b82f6',
      accent: '#f472b6',
      bg: '#020617'
    };
  });

  // Apply theme attributes and CSS variables to the document
  const applyThemeToDOM = (settings) => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', settings.mode);
    body.setAttribute('data-theme', settings.mode);

    if (settings.mode === 'light') {
      root.style.setProperty('--color-bg', settings.bg || '#f8fafc');
      root.style.setProperty('--color-text', '#0f172a');
      root.style.setProperty('--color-card-bg', 'rgba(255, 255, 255, 0.85)');
      root.style.setProperty('--color-border', 'rgba(15, 23, 42, 0.12)');
      body.style.backgroundColor = settings.bg || '#f8fafc';
      body.style.color = '#0f172a';
    } else {
      root.style.setProperty('--color-bg', settings.bg || '#020617');
      root.style.setProperty('--color-text', '#ffffff');
      root.style.setProperty('--color-card-bg', 'rgba(255, 255, 255, 0.03)');
      root.style.setProperty('--color-border', 'rgba(255, 255, 255, 0.1)');
      body.style.backgroundColor = settings.bg || '#020617';
      body.style.color = '#ffffff';
    }

    root.style.setProperty('--color-primary', settings.primary);
    root.style.setProperty('--color-accent', settings.accent);
  };

  // On mount: fetch remote theme from Firestore if available
  useEffect(() => {
    applyThemeToDOM(themeSettings);

    const loadRemoteTheme = async () => {
      if (isFirebaseConfigured() && db) {
        try {
          const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const remoteSettings = snap.data();
            setThemeSettings(remoteSettings);
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(remoteSettings));
            applyThemeToDOM(remoteSettings);
          }
        } catch (err) {
          console.warn("Could not fetch remote theme settings, using local fallback:", err.message);
        }
      }
    };

    loadRemoteTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme function
  const updateTheme = async (newSettings) => {
    const updated = { ...themeSettings, ...newSettings };
    setThemeSettings(updated);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    applyThemeToDOM(updated);

    // Save to Firestore so visitors see the updated theme
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, FIRESTORE_COLLECTION, FIRESTORE_DOC);
        await setDoc(docRef, updated, { merge: true });
      } catch (err) {
        console.warn("Failed to sync theme to Firestore:", err.message);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
