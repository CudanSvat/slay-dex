import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ address: '', name: '', logo: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('/api/pairs')
      .then(res => res.json())
      .then(data => {
        setPairs(data.pairs || []);
        setLoading(false);
      })
      .catch(() => {
        // fallback to placeholder data
        setPairs([
          {
            id: 1,
            name: 'Dogecoin 2.0',
            address: '0x123...abc',
            logo: '',
            description: 'The ultimate meme coin',
            status: 'approved',
          },
          {
            id: 2,
            name: 'Pepe Stark',
            address: '0x456...def',
            logo: '',
            description: 'Frog on Starknet',
            status: 'approved',
          },
        ]);
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setForm({ address: '', name: '', logo: '', description: '' });
    setShowModal(true);
    setSuccessMsg('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    try {
      const res = await fetch('/api/pairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setPairs(p => [...p, data.pair]);
        setSuccessMsg('Pair submitted! Awaiting admin approval... 🚀');
        setForm({ address: '', name: '', logo: '', description: '' });
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg('');
        }, 2000);
      } else {
        setSuccessMsg(data.error || 'Submission failed!');
      }
    } catch {
      setSuccessMsg('Submission failed!');
    }
    setSubmitting(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Starknet MemeDex</h1>
        <button className="submit-btn" onClick={openModal}>Submit New Pair 🚀</button>
      </header>
      <main>
        {loading ? (
          <p>Loading memecoins...</p>
        ) : (
          <div className="pair-grid">
            {pairs.map(pair => (
              <div className="pair-card" key={pair.id}>
                <div className="pair-logo">{pair.logo ? <img src={pair.logo} alt={pair.name} /> : '🦄'}</div>
                <h2>{pair.name}</h2>
                <p className="pair-desc">{pair.description}</p>
                <p className="pair-status">{pair.status === 'approved' ? '✅' : '⏳'}</p>
                <p className="pair-address">{pair.address}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Submit New Memecoin</h2>
            <form onSubmit={handleSubmit}>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Token Address" required />
              <input name="name" value={form.name} onChange={handleChange} placeholder="Token Name" required />
              <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL (optional)" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" />
              <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
            </form>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
