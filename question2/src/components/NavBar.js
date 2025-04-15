// question2/src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Social Analytics</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">Top Users</Link>
          <Link to="/trending" className="text-white hover:underline">Trending Posts</Link>
          <Link to="/feed" className="text-white hover:underline">Feed</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;