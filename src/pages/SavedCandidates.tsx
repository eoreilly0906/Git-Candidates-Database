import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadSavedCandidates = () => {
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      setSavedCandidates(candidates);
    };

    loadSavedCandidates();
    // Add event listener for storage changes
    window.addEventListener('storage', loadSavedCandidates);

    return () => {
      window.removeEventListener('storage', loadSavedCandidates);
    };
  }, []);

  if (savedCandidates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Potential Candidates</h1>
        <p>No candidates have been accepted yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Potential Candidates</h1>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {savedCandidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              style={{ width: '100px', borderRadius: '50%', margin: '0 auto', display: 'block' }}
            />
            <h3>{candidate.name || candidate.login}</h3>
            <p>Username: {candidate.login}</p>
            {candidate.location && <p>Location: {candidate.location}</p>}
            {candidate.email && <p>Email: {candidate.email}</p>}
            {candidate.company && <p>Company: {candidate.company}</p>}
            <p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
