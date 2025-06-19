import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <header>
        <h1>Starknet MemeDex</h1>
        <button className="submit-btn">Submit New Pair 🚀</button>
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
    </div>
  );
}

export default App;
