import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 text-gray-500 p-3 rounded-lg rounded-bl-none italic">
        Agent is typing...
      </div>
    </div>
  );
};

export default TypingIndicator;