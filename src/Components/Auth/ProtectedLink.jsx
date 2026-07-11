import React, { useState } from 'react';

// Use the same encoded secret as PasswordGate for consistency
const PASSWORD_B64 = 'R2F1cmF2'; // 'Gaurav'

const ProtectedLink = ({ href, children, className }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const key = `link_unlocked_${btoa(href)}`;

  const openLink = () => {
    try {
      window.open(href, '_blank', 'noopener,noreferrer');
    } catch (e) {
      window.location.href = href;
    }
  };

  const handleClick = (e) => {
    e && e.preventDefault();
    try {
      if (sessionStorage.getItem(key) === '1') return openLink();
    } catch (err) {
      // ignore
    }
    setShowPrompt(true);
  };

  const submit = (e) => {
    e && e.preventDefault();
    try {
      const secret = atob(PASSWORD_B64);
      if (input === secret) {
        try { sessionStorage.setItem(key, '1'); } catch (err) {}
        openLink();
      } else {
        setError('Incorrect code');
      }
    } catch (err) {
      setError('Configuration error');
    }
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>

      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm bg-gray-900/95 p-5 rounded-lg border border-white/10">
            <h4 className="text-white font-bold mb-2">Enter access code</h4>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(''); }}
                className="px-3 py-2 rounded bg-white/5 text-white border border-white/10"
                placeholder="Access code"
                autoFocus
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-3 py-2 bg-primary text-white rounded">Open</button>
                <button type="button" onClick={() => setShowPrompt(false)} className="px-3 py-2 bg-white/5 text-gray-300 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedLink;
