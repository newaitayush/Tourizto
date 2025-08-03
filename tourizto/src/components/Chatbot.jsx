import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm TouriztoBot, your virtual travel assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined responses based on keywords
  const botResponses = [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: "Hello! I'm TouriztoBot. I can help you discover amazing places in Indore, provide travel tips, or assist with bookings. What would you like to know?"
    },
    {
      keywords: ['rajwada', 'palace', 'historical'],
      response: "Rajwada Palace is a historical 7-story palace in Indore built by the Holkars. It features a blend of Maratha and Mughal architecture. The entry fee is ₹50 per person and it's open from 10 AM to 5 PM every day except Mondays."
    },
    {
      keywords: ['sarafa', 'food', 'eat', 'bazaar', 'market'],
      response: "Sarafa Bazaar is Indore's famous night food street that comes alive after 8 PM. You'll find delicious street food options like Bhutte Ka Kees, Poha, Jalebi, and much more. It's a must-visit for food lovers!"
    },
    {
      keywords: ['waterfall', 'patalpani', 'nature'],
      response: "Patalpani Waterfall is a beautiful 300-foot waterfall located about 35km from Indore. It's most spectacular during the monsoon season (July-September). Entry is free, but be careful as the rocks can be slippery."
    },
    {
      keywords: ['temple', 'religious', 'annapurna'],
      response: "Annapurna Temple is a beautiful temple dedicated to the goddess of food. It features intricate architecture and is located in the heart of Indore. It's open from 5 AM to 12 PM and 4 PM to 10 PM daily."
    },
    {
      keywords: ['book', 'booking', 'reserve', 'reservation'],
      response: "To book a tour or make a reservation, please log in to your account and visit our 'Places' page. There you can select your desired destination and click the 'Book Now' button."
    },
    {
      keywords: ['price', 'cost', 'fee', 'ticket', 'entry'],
      response: "Entry fees vary by location. Historical sites like Rajwada Palace cost around ₹50 per person, while natural attractions like Patalpani Waterfall are free to visit. You can find specific pricing on our 'Places' page."
    },
    {
      keywords: ['weather', 'climate', 'temperature', 'season', 'best time'],
      response: "The best time to visit Indore is from October to March when the weather is pleasant. Summers (April-June) can be quite hot with temperatures reaching 40°C, while monsoons (July-September) bring moderate rainfall and lush greenery."
    },
    {
      keywords: ['transport', 'transportation', 'travel', 'bus', 'taxi', 'auto', 'rickshaw'],
      response: "Indore has good public transportation options including city buses, auto-rickshaws, and taxi services. For convenience, you can also book a private cab through our app for your sightseeing tours."
    },
    {
      keywords: ['hotel', 'stay', 'accommodation', 'lodge', 'resort'],
      response: "Indore offers a range of accommodation options from budget hotels to luxury resorts. Popular areas to stay include Vijay Nagar, South Tukoganj, and near Indore Railway Station. We can help you book accommodations through our partners."
    },
    {
      keywords: ['thanks', 'thank you', 'thx'],
      response: "You're welcome! I'm happy to help. Feel free to ask if you have any other questions about Indore or your travel plans."
    }
  ];

  // Default response if no keywords match
  const defaultResponse = "I'm not sure I understand. Could you rephrase your question? I can help with information about places in Indore, travel tips, or booking assistance.";

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Get bot response based on user input
  const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const item of botResponses) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // Return default response if no matches
    return defaultResponse;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h3>TouriztoBot</h3>
              <p>Travel Assistant</p>
            </div>
          </div>
          <button className="close-chatbot" onClick={toggleChatbot}>×</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
            >
              {message.sender === 'bot' && <div className="bot-avatar">🤖</div>}
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="bot-avatar">🤖</div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button type="submit">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </form>
      </div>
      
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
