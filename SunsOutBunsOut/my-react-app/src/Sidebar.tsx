// Sidebar.tsx
import React, { useState } from 'react';
import './Sidebar.css'; // Add your styles here

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <nav>
        {/* Add your navigation links here */}
        <a href="/">Home</a>
        <a href="/burgers">Burgers</a>
      </nav>
    </div>
  );
};

export default Sidebar;
