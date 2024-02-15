// PostSearch.jsx
import React, { useState } from 'react';

const PostSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/v1/posts/search?q=${query}`);
    const data = await response.json();
    debugger
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostSearch;
