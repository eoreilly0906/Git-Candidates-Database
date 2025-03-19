// Debug environment variables
const ENV_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
console.log('Environment check:');
console.log('- ENV object:', import.meta.env);
console.log('- Token exists:', !!ENV_TOKEN);
console.log('- Token type:', typeof ENV_TOKEN);

const verifyToken = async () => {
  try {
    console.log('Verifying GitHub token...');
    const token = ENV_TOKEN;
    
    // Debug token format
    if (!token) {
      console.error('No token found in environment!');
      console.error('Available env vars:', Object.keys(import.meta.env));
      throw new Error('No token configured');
    }
    
    console.log('Token format check:');
    console.log('- Length:', token.length);
    console.log('- Starts with:', token.substring(0, 4));
    console.log('- Is string:', typeof token === 'string');
    console.log('- Has whitespace:', /\s/.test(token));
    
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
    });
    
    console.log('API Response:');
    console.log('- Status:', response.status);
    console.log('- Status Text:', response.statusText);
    
    const data = await response.json();
    if (!response.ok) {
      console.error('Full error response:', data);
      throw new Error(data.message || 'Token verification failed');
    }
    console.log('Token verified successfully for user:', data.login);
    return true;
  } catch (err) {
    console.error('Token verification error:', err);
    throw new Error('Token verification failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
  }
};

const searchGithub = async () => {
  try {
    const token = ENV_TOKEN;
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Fetching users with start:', start);
    const response = await fetch(
      `https://api.github.com/users?since=${start}&per_page=10`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json'
        },
      }
    );
    console.log('Response status:', response.status);
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data);
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
    const token = ENV_TOKEN;
    console.log('Fetching user details for:', username);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      },
    });
    console.log('Response status:', response.status);
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.message || 'Invalid API response');
    }
    console.log('User details found:', data.login);
    return data;
  } catch (err) {
    console.error('User search error:', err);
    throw err;
  }
};

export { searchGithub, searchGithubUser, verifyToken };
