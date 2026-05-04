"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const AISupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm CORA , your Copym AI Assistant. How can I help you today?",
      sender: 'ai'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      text: getAIResponse(inputMessage),
      sender: 'ai'
    };

    // Clear input and add AI response
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    const responses = {
      'hi': "Hello! Welcome to Copym. How can I assist you today?",
      'hello': "Hi there! I'm ready to help you with any questions about Copym.",
      'help': "I can help you with information about our AI-powered entitlement platform, blockchain integrations, and tokenization services.",
      'what is copym': "Copym is an innovative AI-driven platform that democratizes entitlement by allowing fractional entitlement of high-value assets like real estate, art, and more.",
      'how does it work': "We use AI to identify and tokenize valuable assets, allowing users to invest in fractions of these assets with minimal capital.",
      'features': "Key features include AI-powered asset selection, fractional entitlement, seamless trading, and a user-friendly dashboard.",
      'default': "I'm here to help! Could you be more specific about what you'd like to know about Copym?"
    };

    // Find the most appropriate response
    const matchedResponse = Object.entries(responses)
      .find(([key]) => lowerInput.includes(key));

    return matchedResponse ? matchedResponse[1] : responses['default'];
  };

  const renderMessage = (message) => (
    <div
      key={message.id}
      className={`flex mb-4 ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`
          max-w-[70%] p-3 rounded-lg 
          ${message.sender === 'ai'
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-blue-100 text-blue-800'}
        `}
      >
        {message.text}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl" />
              <span className="font-semibold">Copym AI Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-emerald-700 p-1 rounded-full transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-2">
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about Copym..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center 
          ${isOpen
            ? 'bg-red-500 text-white'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'}
          transition-all duration-300 ease-in-out
        `}
      >
        {isOpen ? <FaTimes className="text-2xl" /> : <FaRobot className="text-2xl" />}
      </button>
    </div>
  );
};

export default AISupport;
