import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, verifyToken } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyAndLoadCandidate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First verify the token
      try {
        await verifyToken();
      } catch (err) {
        setError('GitHub token is invalid or expired. Please check your token configuration.');
        return;
      }

      const users = await searchGithub();
      
      if (!Array.isArray(users) || users.length === 0) {
        setError('No more candidates available');
        return;
      }

      // Try each user in the list until we find one with complete data
      for (const user of users) {
        try {
          const detailedUser = await searchGithubUser(user.login);
          if (detailedUser && detailedUser.login) {
            setCurrentCandidate(detailedUser);
            return;
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
          // Continue to next user if one fails
          continue;
        }
      }
      
      // If we get here, we couldn't find any valid users
      setError('Unable to find valid candidates. Please try again.');
      
    } catch (err) {
      console.error('Error in loadNextCandidate:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error loading candidates: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      try {
        const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
        if (!savedCandidates.some((c: Candidate) => c.id === currentCandidate.id)) {
          localStorage.setItem(
            'savedCandidates',
            JSON.stringify([...savedCandidates, currentCandidate])
          );
        }
        verifyAndLoadCandidate();
      } catch (err) {
        console.error('Error saving candidate:', err);
        setError('Error saving candidate. Please try again.');
      }
    }
  };

  useEffect(() => {
    verifyAndLoadCandidate();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Candidate Search</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Candidate Search</h1>
        <h2>{error}</h2>
        <button onClick={verifyAndLoadCandidate} style={{ marginTop: '20px' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto',
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <img
            src={currentCandidate.avatar_url}
            alt={`${currentCandidate.login}'s avatar`}
            style={{ 
              width: '200px', 
              height: '200px',
              borderRadius: '50%', 
              margin: '20px 0',
              border: '3px solid #fff',
              objectFit: 'cover'
            }}
          />
          <h2 style={{ 
            margin: '10px 0',
            fontSize: '1.5em',
            color: '#fff'
          }}>
            {currentCandidate.name || currentCandidate.login}
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            marginBottom: '20px',
            fontSize: '1.1em'
          }}>
            <p><strong>Username:</strong> {currentCandidate.login}</p>
            {currentCandidate.location && <p><strong>Location:</strong> {currentCandidate.location}</p>}
            {currentCandidate.email && <p><strong>Email:</strong> {currentCandidate.email}</p>}
            {currentCandidate.company && <p><strong>Company:</strong> {currentCandidate.company}</p>}
          </div>
          <a 
            href={currentCandidate.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#0366d6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              marginBottom: '20px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#0245a3'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#0366d6'}
          >
            View GitHub Profile
          </a>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <button 
              onClick={() => verifyAndLoadCandidate()} 
              style={{ 
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#cc3333'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff4444'}
            >
              -
            </button>
            <button 
              onClick={saveCandidate} 
              style={{ 
                backgroundColor: '#44ff44',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#33cc33'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#44ff44'}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
