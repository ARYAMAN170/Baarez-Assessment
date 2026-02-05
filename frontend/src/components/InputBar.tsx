import React, { useState } from 'react';

interface InputBarProps {
  onSend: (message: string) => void;
  isDisabled: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSend, isDisabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t flex gap-2">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isDisabled}
      />
      <button
        type="submit"
        disabled={isDisabled || !input.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default InputBar;