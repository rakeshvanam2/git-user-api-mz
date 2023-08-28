import React, { useState } from 'react';
import './styles.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="text-2xl mb-4">GitHub User Card</h1>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {userData && (
          <div>
            <img src={userData.avatar_url} alt="Avatar" className="avatar" />
            <h2 className="username">{userData.login}</h2>
            <p className="info">{userData.name}</p>
            <p className="info">Public Repos: {userData.public_repos}</p>
            <p className="info">Public Gists: {userData.public_gists}</p>
            {userData.created_at && (
              <p className="info">Profile Created At: {userData.created_at.slice(0, 10)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
