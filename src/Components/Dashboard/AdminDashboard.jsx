import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getDynamicProjects,
  addDynamicProject,
  removeDynamicProject
} from '../../firebase/projectsService';
import { isFirebaseConfigured } from '../../firebase/config';

const DEFAULT_PIN = "gaurav@2026";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError('');
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
        w_img: formData.w_img || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60',
        tech_stack: formData.tech_stack,
        featured: formData.featured
      });

      setSuccessMsg(`Project "${formData.w_name}" added successfully!`);
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
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
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
    }
  };

  // 1. Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-2">Portfolio Admin</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your master passcode to access the Project Dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode..."
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-primary text-white outline-none text-center tracking-widest text-lg transition-all"
              autoFocus
            />

            {pinError && <p className="text-red-400 text-xs font-semibold">{pinError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Return to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Project Dashboard
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isFirebaseConfigured() ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
              {isFirebaseConfigured() ? '● Firebase Cloud Active' : '● Local Storage Ready'}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Add new projects seamlessly without modifying code or pausing databases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/#work"
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all"
          >
            ← View Portfolio
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-5 py-2.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-sm font-medium transition-all"
          >
            Lock
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          {successMsg}
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Add Project Form */}
        <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">＋</span>
            Add New Project
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="w_img"
                placeholder="https://images.unsplash.com/... or direct image link"
                value={formData.w_img}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-primary text-white outline-none transition-all text-sm"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Tip: Paste any hosted image URL (ImgBB, Cloudinary, Unsplash, GitHub raw image).
              </p>
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 transition-all duration-300"
            >
              {loading ? 'Publishing Project...' : '🚀 Publish Project to Portfolio'}
            </button>
          </form>
        </div>

        {/* Right Column: Manage Dynamic Projects */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center font-bold">📂</span>
                Live Dynamic Projects ({projects.length})
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
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex-shrink-0 transition-colors"
                      title="Delete Project"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-primary text-sm mb-2 flex items-center gap-2">
              💡 Zero Downtime Architecture
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Aapke purane 26 hardcoded projects hamesha safe aur active rahenge! Naye projects jo aap yahan se add karoge wo top par automatically appear honge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
