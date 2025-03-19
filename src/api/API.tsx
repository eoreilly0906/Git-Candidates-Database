// Debug environment variables
const ENV_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // This is the token from the .env file
console.log('Environment check:'); // This is a debug log
console.log('- ENV object:', import.meta.env); // This is a debug log
console.log('- Token exists:', !!ENV_TOKEN); // This is a debug log
console.log('- Token type:', typeof ENV_TOKEN); // This is a debug log

const verifyToken = async () => {
  try {
    console.log('Verifying GitHub token...'); // This is a debug log
    const token = ENV_TOKEN;
    
    // Debug token format
    if (!token) {
      console.error('No token found in environment!'); // This is a debug log
      console.error('Available env vars:', Object.keys(import.meta.env)); // This is a debug log
      throw new Error('No token configured');
    }
    
    console.log('Token format check:'); // This is a debug log
    console.log('- Length:', token.length); // This is a debug log
    console.log('- Starts with:', token.substring(0, 4)); // This is a debug log
    console.log('- Is string:', typeof token === 'string'); // This is a debug log
    console.log('- Has whitespace:', /\s/.test(token)); // This is a debug log
    
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
    });
    
    console.log('API Response:'); // This is a debug log
    console.log('- Status:', response.status); // This is a debug log
    console.log('- Status Text:', response.statusText); // This is a debug log
    
    const data = await response.json();
    if (!response.ok) {
      console.error('Full error response:', data);
      throw new Error(data.message || 'Token verification failed');
    }
    console.log('Token verified successfully for user:', data.login); // This is a debug log
    return true;
  } catch (err) {
    console.error('Token verification error:', err); // This is a debug log
    throw new Error('Token verification failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
  }
};

const searchGithub = async () => {
  try {
    const token = ENV_TOKEN;
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Fetching users with start:', start); // This is a debug log
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        },
      }
    );
    console.log('Response status:', response.status); // This is a debug log
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data); // This is a debug log
      throw new Error(data.message || 'Invalid API response');
    }
    console.log('Users found:', data.length);
    return data;
  } catch (err) {
    console.error('Search error:', err);
    throw err;
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = ENV_TOKEN; // This is the token from the .env file
    console.log('Fetching user details for:', username); // This is a debug log
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`, // This is the token from the .env file
        Accept: 'application/vnd.github.v3+json'
      },
    });
    console.log('Response status:', response.status); // This is a debug log
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data); // This is a debug log
      throw new Error(data.message || 'Invalid API response');
    }
    console.log('User details found:', data.login); // This is a debug log
    return data;
  } catch (err) {
    console.error('User search error:', err); // This is a debug log
    throw err;
  }
};

export { searchGithub, searchGithubUser, verifyToken };
