// ConnectWithGuide.js

import React, { useState } from 'react';
import './ConnectWithGuide.css';

const ConnectWithGuide = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    // Implement your connection logic here
    // For example, you might show a loading spinner during the connection process
    setIsConnecting(true);

    // Simulating a connection delay (replace with your actual connection logic)
    setTimeout(() => {
      // Reset the loading state after the connection is established (or failed)
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="connect-with-guide">
      <h2>Connect with Your Guide Now</h2>
      <button onClick={handleConnect} disabled={isConnecting}>
        {isConnecting ? 'Connecting...' : 'Connect'}
      </button>
    </div>
  );
};

export default ConnectWithGuide;
