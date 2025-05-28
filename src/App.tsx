import { useState, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([]);
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, sender: "user" }]);
    setInputText("");

    // Simulate AI response (replace with DeepSeek API call)
    setTimeout(() => {
      const aiResponse = `Here’s a polished email:\n\n---\nSubject: Meeting Request\n\nDear [Name],\n\nI hope this email finds you well. I would appreciate the opportunity to discuss [topic]. Please let me know a convenient time.\n\nBest regards,\n[Your Name]`;
      setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }]);
    }, 1000);
  };

  const insertIntoEmail = () => {
    const lastBotMessage = messages.filter((m) => m.sender === "bot").pop();
    if (lastBotMessage) {
      navigator.clipboard.writeText(lastBotMessage.text).then(() => {
        alert("Copied to clipboard! Paste into your email.");
      });
    }
  };

  return (
    <div className="w-96 h-[600px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="font-bold">EmailGenie ✨</h1>
        <button onClick={() => document.documentElement.classList.toggle("dark")}>
          🌓
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 p-3 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target)}
          placeholder="Type your email prompt..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          rows={3}
        />
        <div className="flex justify-between mt-2">
          <select className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            <option>General</option>
            <option>Job Application</option>
            <option>Meeting Request</option>
          </select>
          <div>
            <button
              onClick={insertIntoEmail}
              className="mr-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Insert
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}