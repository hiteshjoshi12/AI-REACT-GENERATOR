import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_APP_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Switch to a stable model identifier
// "gemini-1.5-flash" is fast, stable, and highly reliable for code generation
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain", // Explicitly set to text/plain
};

// --- CHAT SESSION FOR CODE GENERATION ---
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a React component for a user profile card with an avatar, name, and a follow button. Use Tailwind CSS for styling. Give whole code in one file and don't give explanation.\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```jsx\nimport React, { useState } from 'react';\n\nconst UserProfileCard = ({ avatarUrl, name }) => {\n    const [isFollowing, setIsFollowing] = useState(false);\n\n    const handleFollow = () => {\n        setIsFollowing(!isFollowing);\n    };\n\n    return (\n        <div className=\"bg-white rounded-lg shadow-md p-6 flex items-center space-x-4\">\n            <img\n                className=\"w-16 h-16 rounded-full object-cover\"\n                src={avatarUrl}\n                alt={`${name}'s avatar`}\n            />\n            <div>\n                <h2 className=\"text-xl font-semibold\">{name}</h2>\n                <button\n                    className={`px-4 py-2 rounded-md text-white ${\n                        isFollowing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'\n                    } transition-colors duration-200`}\n                    onClick={handleFollow}\n                >\n                    {isFollowing ? 'Following' : 'Follow'}\n                </button>\n            </div>\n        </div>\n    );\n};\n\nexport default UserProfileCard;\n```\n" },
      ],
    },
  ],
});

// --- CHAT SESSION FOR EMAIL GENERATION ---
export const EmailSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a professional Thank You Note in English for my business associate named John Doe. The purpose of this email is to express gratitude for his recent support on our project. My name is Alex Smith. Format the email in a polite and formal tone, keeping it concise yet impactful." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "Subject: Thank You for Your Support on [Project Name]\n\nDear John,\n\nI am writing to express my sincere gratitude for your invaluable support on the recent [Project Name] project. Your contributions were instrumental in [Mention a specific positive impact or contribution, e.g., overcoming a key challenge, meeting a tight deadline, improving efficiency].\n\nI truly appreciate your dedication and collaborative spirit. It was a pleasure working with you on this initiative.\n\nThank you again for your assistance.\n\nSincerely,\n\nAlex Smith\n" },
      ],
    },
  ],
});