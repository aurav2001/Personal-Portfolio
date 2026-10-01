import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getDynamicProjects,
  addDynamicProject,
  removeDynamicProject
} from '../../firebase/projectsService';
import { isFirebaseConfigured } from '../../firebase/config';
import { useTheme, THEME_PRESETS } from '../../context/ThemeContext';
import mywork_data from '../../assets/mywork_data';

const DEFAULT_PIN = "gaurav@2026";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'theme' | 'analytics'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: 'success' });

  // Theme Context
  const { themeSettings, updateTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(themeSettings);

  // Form State
  const [formData, setFormData] = useState({
    w_name: '',
    w_category: 'Full Stack Development',
    custom_category: '',
    github_link: '',
    w_img: '',
    tech_stack: '',
    featured: false
  });

  const categories = [
    'Full Stack Development',
    'WordPress Development',
    'Web Development',
    'Enterprise Software',
    'App Development',
    'Other'
  ];

  // Quick Preset Images for fast entry
  const quickImages = [
    { label: 'Web/Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60' },
    { label: 'E-Commerce', url: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=60' },
    { label: 'Mobile App', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60' },
    { label: 'Dashboard/AI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60' }
  ];

  // Sync local theme state with context
  useEffect(() => {
    setLocalTheme(themeSettings);
  }, [themeSettings]);

  // Load existing dynamic projects
  const loadProjects = async () => {
    setLoading(true);
    try {
      const items = await getDynamicProjects();
      setProjects(items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: 'success' }), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError('');
      showToast('Welcome back, Gaurav! Dashboard unlocked.');
    } else {
      setPinError('Invalid Passcode! Please try again.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.w_name.trim()) return;

    setLoading(true);
    const finalCategory =
      formData.w_category === 'Other'
        ? formData.custom_category || 'Web Development'
        : formData.w_category;

    try {
      await addDynamicProject({
        w_name: formData.w_name,
        w_category: finalCategory,
        github_link: formData.github_link || '/',
        w_img: formData.w_img || quickImages[0].url,
        tech_stack: formData.tech_stack,
        featured: formData.featured
      });

      showToast(`Project "${formData.w_name}" published live to Firestore!`);
      setFormData({
        w_name: '',
        w_category: 'Full Stack Development',
        custom_category: '',
        github_link: '',
        w_img: '',
        tech_stack: '',
        featured: false
      });
      await loadProjects();
    } catch (err) {
      console.error(err);
      showToast('Error saving project. Please check network.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setLoading(true);
      await removeDynamicProject(id);
      await loadProjects();
      setLoading(false);
      showToast(`Project "${name}" removed.`);
    }
  };

  // Theme Management Handlers
  const handleModeChange = (mode) => {
    let bg = '#020617';
    if (mode === 'dark') bg = '#09090b';
    if (mode === 'light') bg = '#f8fafc';

    const updated = {
      ...localTheme,
      mode,
      bg
    };
    setLocalTheme(updated);
    updateTheme(updated);
    showToast(`Mode set to ${mode.toUpperCase()}!`);
  };

  const handleApplyPreset = (preset) => {
    const updated = {
      mode: preset.mode,
      primary: preset.primary,
      accent: preset.accent,
      bg: preset.bg
    };
    setLocalTheme(updated);
    updateTheme(updated);
    showToast(`Applied preset: ${preset.name}!`);
  };

  const handleSaveCustomColors = () => {
    updateTheme(localTheme);
    showToast('Theme colors applied to the entire portfolio!');
  };

  // 1. Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary via-purple-600 to-accent flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Portfolio Studio</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Manage projects, customize live theme colors, and inspect analytics.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Master Passcode..."
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/15 focus:border-primary text-white outline-none text-center tracking-widest text-lg transition-all"
              autoFocus
            />

            {pinError && <p className="text-red-400 text-xs font-semibold">{pinError}</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Unlock Studio
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Return to Main Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMsg.text && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-fade-in ${toastMsg.type === 'error' ? 'bg-red-500/20 border-red-500/40 text-red-300' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'}`}>
          <span className="text-lg">{toastMsg.type === 'error' ? '⚠️' : '✓'}</span>
          <span className="text-sm font-semibold">{toastMsg.text}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
                Portfolio Studio
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${isFirebaseConfigured() ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {isFirebaseConfigured() ? 'Firestore Cloud Online' : 'LocalStorage Cache'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/90 border border-white/15">
                Mode: {localTheme.mode.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2 max-w-2xl">
              Add new projects on the fly and dynamically manage real-stage colors (Light, Dark & Cosmic Default).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/#work"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold transition-all flex items-center gap-2"
            >
              <span>👁️</span> View Portfolio
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-5 py-2.5 rounded-full bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-sm font-semibold transition-all"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Total Projects</p>
            <p className="text-2xl font-bold text-white mt-1">{mywork_data.length + projects.length}</p>
            <span className="text-[11px] text-gray-500">{projects.length} dynamic + {mywork_data.length} baseline</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Live Web Apps</p>
            <p className="text-2xl font-bold text-accent mt-1">
              {mywork_data.filter((p) => p.github_link && p.github_link !== '/' && !p.github_link.includes('github.com')).length + projects.filter((p) => p.github_link && p.github_link !== '/').length}
            </p>
            <span className="text-[11px] text-gray-500">Accessible URLs</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Site Theme</p>
            <p className="text-2xl font-bold text-primary capitalize mt-1">{localTheme.mode}</p>
            <span className="text-[11px] text-gray-500">Live Stage</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Storage Engine</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">Firestore</p>
            <span className="text-[11px] text-gray-500">No Pauses / 24x7</span>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex gap-2 mt-8 pt-4 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'projects' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <span>📁</span> Projects Manager
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'theme' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <span>🎨</span> Appearance & Theme Engine
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <span>📊</span> Analytics & Info
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: APPEARANCE & THEME ENGINE (New Color Management) */}
      {/* ======================================================== */}
      {activeTab === 'theme' && (
        <div className="space-y-8 animate-fade-in">
          {/* 1. Mode Selector (Default, Dark, Light) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>🌓</span> Real Stage Theme Modes
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Switch between Light, Dark, or Default modes for your entire live website.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Default Cosmic Mode */}
              <div
                onClick={() => handleModeChange('default')}
                className={`p-6 rounded-2xl cursor-pointer border-2 transition-all relative overflow-hidden ${localTheme.mode === 'default' ? 'border-primary bg-primary/10 shadow-xl shadow-primary/20 scale-[1.02]' : 'border-white/10 bg-black/40 hover:border-white/20'}`}
              >
                {localTheme.mode === 'default' && (
                  <span className="absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full bg-primary text-white font-bold">
                    Active
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-pink-500 flex items-center justify-center text-xl mb-4 shadow-lg">
                  🌌
                </div>
                <h3 className="font-bold text-lg text-white">Default Cosmic</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  The original deep universe theme with navy-black background, royal blue glow, and pink accents.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="w-5 h-5 rounded-full bg-[#020617] border border-white/20"></span>
                  <span className="w-5 h-5 rounded-full bg-[#3b82f6]"></span>
                  <span className="w-5 h-5 rounded-full bg-[#f472b6]"></span>
                </div>
              </div>

              {/* Dark Obsidian Mode */}
              <div
                onClick={() => handleModeChange('dark')}
                className={`p-6 rounded-2xl cursor-pointer border-2 transition-all relative overflow-hidden ${localTheme.mode === 'dark' ? 'border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-500/20 scale-[1.02]' : 'border-white/10 bg-black/40 hover:border-white/20'}`}
              >
                {localTheme.mode === 'dark' && (
                  <span className="absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-bold">
                    Active
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-xl mb-4 shadow-lg">
                  🌑
                </div>
                <h3 className="font-bold text-lg text-white">Dark Obsidian</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  High-contrast midnight dark mode with deep black backdrop and vibrant neon cyberpunk accents.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="w-5 h-5 rounded-full bg-[#09090b] border border-white/20"></span>
                  <span className="w-5 h-5 rounded-full bg-[#a855f7]"></span>
                  <span className="w-5 h-5 rounded-full bg-[#06b6d4]"></span>
                </div>
              </div>

              {/* Light Mode */}
              <div
                onClick={() => handleModeChange('light')}
                className={`p-6 rounded-2xl cursor-pointer border-2 transition-all relative overflow-hidden ${localTheme.mode === 'light' ? 'border-amber-400 bg-amber-400/10 shadow-xl shadow-amber-400/20 scale-[1.02]' : 'border-white/10 bg-black/40 hover:border-white/20'}`}
              >
                {localTheme.mode === 'light' && (
                  <span className="absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-bold">
                    Active
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-sky-400 flex items-center justify-center text-xl mb-4 shadow-lg">
                  ☀️
                </div>
                <h3 className="font-bold text-lg text-white">Modern Light</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  Crisp clean editorial aesthetic with slate dark typography, soft glow, and high-visibility cards.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="w-5 h-5 rounded-full bg-[#f8fafc] border border-gray-400"></span>
                  <span className="w-5 h-5 rounded-full bg-[#2563eb]"></span>
                  <span className="w-5 h-5 rounded-full bg-[#db2777]"></span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Curated Designer Presets */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>💎</span> 1-Click Designer Presets
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Choose from curated harmonious color themes tailored for high visual impact.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {THEME_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/50 cursor-pointer transition-all group flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">
                      {preset.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{preset.desc}</p>
                    <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 uppercase tracking-widest">
                      {preset.mode}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <span className="w-6 h-6 rounded-full shadow-md" style={{ backgroundColor: preset.primary }}></span>
                    <span className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: preset.accent }}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Custom Color Pickers & Live Preview */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span>🎛️</span> Custom Color Controls
              </h2>
              <p className="text-gray-400 text-sm mb-6">Fine-tune the exact hex colors for your brand.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Primary Brand Color (Buttons, Highlights, Links)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localTheme.primary}
                      onChange={(e) => setLocalTheme({ ...localTheme, primary: e.target.value })}
                      className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localTheme.primary}
                      onChange={(e) => setLocalTheme({ ...localTheme, primary: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-mono text-sm uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Accent Color (Subtitles, Star Badges, Borders)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localTheme.accent}
                      onChange={(e) => setLocalTheme({ ...localTheme, accent: e.target.value })}
                      className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localTheme.accent}
                      onChange={(e) => setLocalTheme({ ...localTheme, accent: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-mono text-sm uppercase"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveCustomColors}
                  className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  💾 Save & Apply Colors to Live Site
                </button>
              </div>
            </div>

            {/* Live Component Preview Sandbox */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span>✨</span> Live Preview Sandbox
                </h3>
                <p className="text-gray-400 text-sm mb-6">See how your cards and interactive buttons will look.</p>

                {/* Preview Card */}
                <div className="p-6 rounded-2xl bg-black/60 border border-white/15 relative overflow-hidden shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: localTheme.accent }}>
                      ★ Featured Component
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md" style={{ backgroundColor: localTheme.primary }}>
                      Preview Mode
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">
                    Modern Interactive Application
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    This live demo reflects your custom primary and accent palette exactly as visitors will see it.
                  </p>

                  <div className="flex gap-3">
                    <button
                      className="px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: localTheme.primary }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-xl bg-white/5 border text-xs font-bold transition-colors"
                      style={{ borderColor: localTheme.accent, color: localTheme.accent }}
                    >
                      Accent Outline
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">
                💡 <strong className="text-white">Real-time sync:</strong> Whenever you save changes, all visitors to your portfolio will automatically view the site with your selected mode and colors.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PROJECTS MANAGER                                   */}
      {/* ======================================================== */}
      {activeTab === 'projects' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Left Column: Add Project Form */}
          <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">＋</span>
              Publish New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Project Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="w_name"
                  required
                  placeholder="e.g. AI Workflow Automation Tool"
                  value={formData.w_name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Category
                </label>
                <select
                  name="w_category"
                  value={formData.w_category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-gray-900 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {formData.w_category === 'Other' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Custom Category Name
                  </label>
                  <input
                    type="text"
                    name="custom_category"
                    placeholder="e.g. AI & Machine Learning"
                    value={formData.custom_category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                  />
                </div>
              )}

              {/* Live URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Live URL / Website Link
                </label>
                <input
                  type="url"
                  name="github_link"
                  placeholder="https://myproject.com or https://github.com/..."
                  value={formData.github_link}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                />
              </div>

              {/* Image URL */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Thumbnail Image URL
                  </label>
                  <span className="text-[11px] text-gray-500">Pick preset or paste URL</span>
                </div>
                <input
                  type="url"
                  name="w_img"
                  placeholder="https://images.unsplash.com/... or direct image link"
                  value={formData.w_img}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickImages.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, w_img: img.url })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 border border-white/10"
                    >
                      📷 {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  name="tech_stack"
                  placeholder="React, Node.js, Express, MongoDB, Tailwind"
                  value={formData.tech_stack}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleFormChange}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300 cursor-pointer">
                  Mark as Featured Project (Shows Star Badge)
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? 'Publishing to Cloud...' : '🚀 Publish Project to Live Portfolio'}
              </button>
            </form>
          </div>

          {/* Right Column: Manage Dynamic Projects */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold">📂</span>
                  Dynamic Firestore Projects ({projects.length})
                </h2>
                <button
                  onClick={loadProjects}
                  className="text-xs text-primary hover:underline"
                >
                  Refresh
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-gray-400 text-sm">No dynamic projects added yet.</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Fill the form on the left to publish your first new project!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {p.w_img && (
                          <img
                            src={p.w_img}
                            alt={p.w_name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white truncate text-sm">{p.w_name}</h4>
                            {p.featured && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                                ★ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-accent text-xs mt-0.5">{p.w_category}</p>
                          <p className="text-gray-500 text-[11px] truncate mt-0.5">
                            {Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : p.tech_stack}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(p.id, p.w_name)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-semibold flex-shrink-0 transition-colors"
                        title="Delete Project"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Baseline Notice */}
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-primary text-sm mb-2 flex items-center gap-2">
                🛡️ Safe Hybrid Baseline
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Aapke purane 26 hardcoded projects (MANABS, Tyka Store, GP_THEME, etc.) hamesha safe rahenge! Yahan se naye projects top par add hote rahenge.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ANALYTICS & BREAKDOWN                              */}
      {/* ======================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📈</span> Project Categories Distribution
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'WordPress Development', count: mywork_data.filter((w) => w.w_category === 'WordPress Development').length + projects.filter((w) => w.w_category === 'WordPress Development').length },
                { name: 'Full Stack Development', count: mywork_data.filter((w) => w.w_category === 'Full Stack Development').length + projects.filter((w) => w.w_category === 'Full Stack Development').length },
                { name: 'Web Development', count: mywork_data.filter((w) => w.w_category === 'Web Development').length + projects.filter((w) => w.w_category === 'Web Development').length },
                { name: 'Enterprise Software', count: mywork_data.filter((w) => w.w_category === 'Enterprise Software').length + projects.filter((w) => w.w_category === 'Enterprise Software').length },
                { name: 'App Development', count: mywork_data.filter((w) => w.w_category === 'App Development').length + projects.filter((w) => w.w_category === 'App Development').length },
                { name: 'Game Development', count: mywork_data.filter((w) => w.w_category === 'Game Development').length + projects.filter((w) => w.w_category === 'Game Development').length },
              ].map((cat) => (
                <div key={cat.name} className="p-5 rounded-2xl bg-black/40 border border-white/10 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{cat.name}</h4>
                    <p className="text-gray-500 text-xs mt-0.5">Active Category</p>
                  </div>
                  <span className="text-2xl font-extrabold text-primary">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
