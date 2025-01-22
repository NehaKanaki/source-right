import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import './App.css'; 
import logo from './image.png';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const formatAssistantMessage = (text) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\*\s+/gm, '') // Remove stars at the start of headings
      .replace(/(<strong>.*<\/strong>)/g, '$1<br>'); // Add a line break after headings
    return formattedText.split('\n').map((line, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-2"></p>
    ));
  };



  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>AI Chatbot</h1>

      </div>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.sender === 'bot' && <img src={logo} alt="Bot" className="bot-avatar" />}
            <div className={`message-content ${chat.sender}`}>
              {chat.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <div className="message-content bot">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} className={loading ? 'loading' : ''}>
          {loading ? <div className="loader"></div> : <Send size={20}/>}
        </button>
      </div>
    </div>
  );
}

export default App;
