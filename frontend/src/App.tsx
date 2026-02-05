import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { mockAgentResponse } from './lib/mockApi';
import type { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const data = await mockAgentResponse(userMessage.content);
      let agentText = '';

      if (data.error) {
        agentText = data.error;
      } else if (data.chosen_tool === 'calculator' && data.response?.result !== undefined) {
        agentText = `The result is ${data.response.result}`;
      } else if (data.chosen_tool === 'memory_save' && data.response?.key) {
        agentText = `I've remembered that your ${data.response.key} is ${data.response.value}.`;
      } else if (data.chosen_tool === 'memory_read' && data.response?.key) {
        agentText = data.response.value 
          ? `Your ${data.response.key} is ${data.response.value}.` 
          : `I don't remember your ${data.response.key}.`;
      } else {
        agentText = "I processed that, but I'm not sure what to say.";
      }

      setMessages((prev) => [...prev, { role: 'agent', content: agentText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'agent', content: "Sorry, something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px]">
        <div className="bg-blue-600 p-4 text-white font-bold text-center">
          Mini-Agent Chat
        </div>
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBar onSend={handleSend} isDisabled={isTyping} />
      </div>
    </div>
  );
}

export default App;