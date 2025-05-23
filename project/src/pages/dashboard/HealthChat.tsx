import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { useHealthStore } from '../../stores/healthStore';
import { useAuthStore } from '../../stores/authStore';

const HealthChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { chatHistory, addChatMessage, getDiagnosis } = useHealthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    addChatMessage({
      sender: 'user',
      message: message.trim()
    });
    
    // Clear input field
    setMessage('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate AI response based on user's message
      let aiResponse = '';
      
      if (message.toLowerCase().includes('symptom') || message.toLowerCase().includes('feel')) {
        // If message is about symptoms, use the symptom checker
        const diagnosis = await getDiagnosis(message);
        
        aiResponse = `Based on the symptoms you've described, I've analyzed the following:\n\n` +
          `Possible conditions include: ${diagnosis.possibleConditions.map(c => c.name).join(', ')}.\n\n` +
          `Recommendation: ${diagnosis.recommendation}\n\n` +
          `Urgency: ${diagnosis.urgency.charAt(0).toUpperCase() + diagnosis.urgency.slice(1)}\n\n` +
          `Remember, this is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation.`;
      } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        // Greeting
        aiResponse = `Hello ${user?.firstName}! I'm your AI health assistant. How can I help you today? You can ask me about your symptoms, medications, or general health questions.`;
      } else if (message.toLowerCase().includes('thank')) {
        // Thanks
        aiResponse = "You're welcome! If you have any other questions or concerns, feel free to ask anytime.";
      } else {
        // Generic response
        aiResponse = "I understand you're asking about your health. To give you the most helpful response, could you provide more specific details about your symptoms or questions?";
      }
      
      // Add AI response to chat
      addChatMessage({
        sender: 'ai',
        message: aiResponse
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message to chat
      addChatMessage({
        sender: 'ai',
        message: "I'm sorry, I encountered an error processing your request. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Chat Assistant</h1>
        <p className="text-neutral-600">Chat with our AI to get personalized health advice and answers to your questions</p>
      </div>
      
      <div className="card h-[calc(100vh-220px)] flex flex-col">
        <div className="flex-1 overflow-y-auto p-2">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Bot className="h-16 w-16 text-primary-200 mb-4" />
              <h3 className="text-xl font-medium text-neutral-800 mb-2">
                Your Health Assistant
              </h3>
              <p className="text-neutral-600 max-w-md mb-6">
                I'm here to help with your health questions and concerns. 
                Feel free to ask about symptoms, medications, or general health advice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md w-full">
                <button 
                  onClick={() => setMessage("What should I do for a headache?")}
                  className="btn-outline text-left"
                >
                  What should I do for a headache?
                </button>
                <button 
                  onClick={() => setMessage("How much water should I drink daily?")}
                  className="btn-outline text-left"
                >
                  How much water should I drink daily?
                </button>
                <button 
                  onClick={() => setMessage("I'm feeling tired all the time")}
                  className="btn-outline text-left"
                >
                  I'm feeling tired all the time
                </button>
                <button 
                  onClick={() => setMessage("Tips for better sleep")}
                  className="btn-outline text-left"
                >
                  Tips for better sleep
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-2">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-primary-100 text-primary-900' 
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {msg.sender === 'user' ? (
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-primary-600 mr-1" />
                          <span className="text-xs font-medium text-primary-600">You</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 text-neutral-600 mr-1" />
                          <span className="text-xs font-medium text-neutral-600">Health Assistant</span>
                        </div>
                      )}
                    </div>
                    <p className="whitespace-pre-line">{msg.message}</p>
                    <div className="text-right mt-1">
                      <span className="text-xs opacity-60">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 rounded-lg p-3 flex items-center">
                    <Bot className="h-4 w-4 text-neutral-600 mr-2" />
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="border-t border-neutral-200 p-4 mt-auto">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your health question..."
              className="input flex-1 mr-3"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="btn-primary"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-4 text-sm text-neutral-500 text-center">
        <p>
          Remember: This AI assistant provides general information and is not a substitute for 
          professional medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
};

export default HealthChat;