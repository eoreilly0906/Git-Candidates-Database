import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, verifyToken } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => { // This is the CandidateSearch component
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyAndLoadCandidate = async () => { // This is the verifyAndLoadCandidate function
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
      for (const user of users) { // This is the for loop
        try {
          const detailedUser = await searchGithubUser(user.login); // This is the detailedUser variable 
          if (detailedUser && detailedUser.login) { // This is the if statement
            setCurrentCandidate(detailedUser); // This is the setCurrentCandidate function
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

  const saveCandidate = () => { // This is the saveCandidate function
    if (currentCandidate) { // This is the if statement
      try {
        const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]'); // This is the savedCandidates variable
        if (!savedCandidates.some((c: Candidate) => c.id === currentCandidate.id)) { // This is the if statement
          localStorage.setItem(
            'savedCandidates',
            JSON.stringify([...savedCandidates, currentCandidate])
          );
        }
        verifyAndLoadCandidate(); // This is the verifyAndLoadCandidate function
      } catch (err) {
        console.error('Error saving candidate:', err);
        setError('Error saving candidate. Please try again.');
      }
    }
  };

  useEffect(() => { // This is the useEffect function
    verifyAndLoadCandidate(); // This is the verifyAndLoadCandidate function
  }, []); // This is the empty array

  if (loading) { // This is the if statement
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Candidate Search</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) { // This is the if statement
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

  return ( // This is the return statement
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div style={{ 
          maxWidth: '600px', // This is the maxWidth variable
          margin: '0 auto', // This is the margin variable
          padding: '30px', // This is the padding variable
          border: '1px solid #ccc', // This is the border variable
          borderRadius: '8px', // This is the borderRadius variable
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // This is the backgroundColor variable
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // This is the boxShadow variable
        }}>
          <img
            src={currentCandidate.avatar_url}
            alt={`${currentCandidate.login}'s avatar`}
            style={{ 
              width: '200px', // This is the width variable
              height: '200px', // This is the height variable
              borderRadius: '50%', // This is the borderRadius variable
              margin: '20px 0', // This is the margin variable
              border: '3px solid #fff', // This is the border variable
              objectFit: 'cover' // This is the objectFit variable
            }}
          />
          <h2 style={{ 
            margin: '10px 0', // This is the margin variable
            fontSize: '1.5em', // This is the fontSize variable
              color: '#fff' // This is the color variable
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
