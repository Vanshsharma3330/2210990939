// question2/src/pages/Feed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get('http://localhost:3001/posts?type=latest')
        .then(response => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load posts');
          setLoading(false);
        });
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded shadow">
            <img
              src={`https://picsum.photos/300/200?random=${post.id}`}
              alt="Post"
              className="w-full h-48 object-cover rounded mb-2"
            />
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500">Comments: {post.commentCount}</p>
            <p className="text-sm text-gray-500">
              Posted: {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;