import { db, isFirebaseConfigured } from './config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'portfolio_custom_projects';
const COLLECTION_NAME = 'projects';

// Helper to get local fallback projects
const getLocalProjects = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading localStorage:", err);
    return [];
  }
};

// Helper to save local fallback projects
const setLocalProjects = (projects) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

/**
 * Fetch all dynamic projects from Firestore (or localStorage fallback)
 */
export const getDynamicProjects = async () => {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const projects = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      // Keep local cache synced
      setLocalProjects(projects);
      return projects;
    } catch (error) {
      console.warn("Firestore fetch error, falling back to local storage:", error.message);
      return getLocalProjects();
    }
  }

  // Fallback to localStorage if Firebase keys are not yet configured
  return getLocalProjects();
};

/**
 * Add a new dynamic project
 */
export const addDynamicProject = async (projectData) => {
  const newProject = {
    w_name: projectData.w_name || 'Untitled Project',
    w_category: projectData.w_category || 'Full Stack Development',
    w_img: projectData.w_img || '',
    badge_img: projectData.w_img || '',
    badge_name: projectData.badge_name || projectData.w_name || 'Project',
    github_link: projectData.github_link || '/',
    tech_stack: Array.isArray(projectData.tech_stack)
      ? projectData.tech_stack
      : (projectData.tech_stack || '').split(',').map((t) => t.trim()).filter(Boolean),
    featured: Boolean(projectData.featured),
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...newProject,
        createdAt: serverTimestamp()
      });
      const created = { id: docRef.id, ...newProject };
      const local = getLocalProjects();
      setLocalProjects([created, ...local]);
      return created;
    } catch (error) {
      console.warn("Firestore write failed, saving to local storage:", error.message);
    }
  }

  // Local fallback
  const created = { id: 'local_' + Date.now(), ...newProject };
  const current = getLocalProjects();
  const updated = [created, ...current];
  setLocalProjects(updated);
  return created;
};

/**
 * Delete a dynamic project by ID
 */
export const removeDynamicProject = async (id) => {
  if (isFirebaseConfigured() && db && !String(id).startsWith('local_')) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.warn("Firestore delete failed:", error.message);
    }
  }

  const current = getLocalProjects();
  const filtered = current.filter((p) => p.id !== id);
  setLocalProjects(filtered);
  return true;
};
