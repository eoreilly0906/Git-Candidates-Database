import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => { // This is the SavedCandidates component
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // This is the savedCandidates variable

  useEffect(() => { // This is the useEffect function   
    const loadSavedCandidates = () => { // This is the loadSavedCandidates function
      const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]'); // This is the candidates variable
      setSavedCandidates(candidates); // This is the setSavedCandidates function
    };

    loadSavedCandidates(); // This is the loadSavedCandidates function
    // Add event listener for storage changes
    window.addEventListener('storage', loadSavedCandidates); // This is the event listener for storage changes

    return () => {
      window.removeEventListener('storage', loadSavedCandidates);
    };
  }, []); // This is the empty array

  const handleDelete = (candidateId: number) => { // This is the handleDelete function
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== candidateId); // This is the updatedCandidates variable
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // This is the localStorage item for savedCandidates
    setSavedCandidates(updatedCandidates); // This is the setSavedCandidates function
  };

  if (savedCandidates.length === 0) { // This is the if statement
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
      <div style={{ 
        display: 'grid', 
        gap: '20px', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '20px 0'
      }}>
        {savedCandidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <button
              onClick={() => handleDelete(candidate.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                padding: 0
              }}
            >
              ×
            </button>
            <img
              src={candidate.avatar_url}
              alt={`${candidate.login}'s avatar`}
              style={{ 
                width: '120px', 
                height: '120px',
                borderRadius: '50%', 
                margin: '0 auto', 
                display: 'block',
                objectFit: 'cover',
                border: '3px solid #fff'
              }}
            />
            <h3 style={{ 
              margin: '10px 0',
              fontSize: '1.2em',
              textAlign: 'center',
              color: '#fff'
            }}>
              {candidate.name || candidate.login}
            </h3>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              fontSize: '0.9em'
            }}>
              <p><strong>Username:</strong> {candidate.login}</p>
              {candidate.location && <p><strong>Location:</strong> {candidate.location}</p>}
              {candidate.email && <p><strong>Email:</strong> {candidate.email}</p>}
              {candidate.company && <p><strong>Company:</strong> {candidate.company}</p>}
            </div>
            <a 
              href={candidate.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                marginTop: 'auto',
                padding: '8px 16px',
                backgroundColor: '#0366d6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                textAlign: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#0245a3'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#0366d6'}
            >
              View GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
