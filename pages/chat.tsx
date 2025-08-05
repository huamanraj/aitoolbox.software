

import { useState } from 'react';
import PersonalitySelector from '@/components/PersonalitySelector';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [personality, setPersonality] = useState('formal');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, personality }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Custom Personality Chatbot</h1>

      <PersonalitySelector selected={personality} setSelected={setPersonality} />

      <textarea
        className="w-full mt-4 p-2 border"
        rows={4}
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
}
