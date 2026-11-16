
import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const aiDataset = [
  {
    keywords: ['special', 'today'],
    response: "Today's special is Chicken Alfredo for $18.99."
  },
  {
    keywords: ['vegetarian', 'veggie'],
    response:
      'We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.'
  },
  {
    keywords: ['recommend', 'suggest'],
    response:
      'Based on popular orders, we recommend our Chicken Alfredo.'
  },
  {
    keywords: ['gluten', 'gluten-free'],
    response:
      'Yes. We offer gluten-free pasta and selected salads.'
  },
  {
    keywords: ['dessert', 'sweet'],
    response:
      'Our Chocolate Lava Cake is our most popular dessert.'
  },
  {
    keywords: ['last time', 'previous order'],
    response:
      'For this demo, your sample previous order was Chicken Alfredo and Chocolate Lava Cake.'
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    response:
      'Hello! Welcome to Smart Restaurant. How can I help you today?'
  },
  {
    keywords: ['hours', 'opening'],
    response:
      'Please contact the restaurant to confirm current opening hours.'
  }
];

function getAIResponse(question) {
  const text = question.toLowerCase().trim();

  const match = aiDataset.find((item) =>
    item.keywords.some((keyword) => text.includes(keyword))
  );

  return match
    ? match.response
    : "Sorry, I didn't understand that. You can ask about today's specials, vegetarian meals, recommendations, or desserts.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Smart Restaurant. Ask me about our menu!'
    }
  ]);

  const sendMessage = (question = input) => {
    const text = question.trim();

    if (!text) return;

    const userMessage = {
      sender: 'user',
      text
    };

    const botMessage = {
      sender: 'bot',
      text: getAIResponse(text)
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage
    ]);

    setInput('');
  };

  const quickQuestions = [
    "What are today's specials?",
    'What vegetarian meals do you have?',
    'What do you recommend?',
    'Do you have gluten-free options?',
    'What is the most popular dessert?',
    'What did I order last time?'
  ];

  return (
    <div className="chatbotContainer">
      {!isOpen && (
        <button
          className="chatToggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open restaurant assistant"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div className="chatWindow">
          <div className="chatHeader">
            <div>
              <strong>Smart Restaurant AI</strong>
              <small>Virtual Restaurant Assistant</small>
            </div>

            <button
              className="chatClose"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chatMessages" role="log">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatMessage ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="quickQuestions">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="chatInputArea"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Chat message"
            />

            <button type="submit" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
