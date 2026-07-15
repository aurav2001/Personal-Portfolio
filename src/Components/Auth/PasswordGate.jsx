import React, { useState, useEffect } from 'react';

// Base64-encoded access code (change value to your chosen code encoded with btoa)
const PASSWORD_B64 = 'R2F1cmF2'; // 'Gaurav'

const PasswordGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('mywork_unlocked') === '1') setUnlocked(true);
  }, []);

  const tryUnlock = (e) => {
    e && e.preventDefault();
    try {
      const secret = atob(PASSWORD_B64);
      if (input === secret) {
        localStorage.setItem('mywork_unlocked', '1');
        setUnlocked(true);
      } else {
        setError('Incorrect code, try again');
      }
    } catch (err) {
      setError('Configuration error');
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/90 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl text-white font-bold mb-2">Protected Projects</h3>
        <p className="text-sm text-gray-400 mb-4">Enter the access code to view the projects.</p>

        <form onSubmit={tryUnlock} className="flex flex-col gap-3">
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder="Access code"
            className="px-4 py-2 rounded bg-white/5 text-white border border-white/10"
          />
          {error && <div className="text-sm text-red-400">{error}</div>}

          <div className="flex gap-2">
            <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded">Unlock</button>
            <button
              type="button"
              onClick={() => { setInput(''); setError(''); localStorage.removeItem('mywork_unlocked'); }}
              className="px-4 py-2 bg-white/5 text-gray-300 rounded"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-3">Tip: share the access code only with people you trust.</p>
      </div>
    </div>
  );
};

export default PasswordGate;
