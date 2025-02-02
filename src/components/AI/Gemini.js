import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_APP_GEMINI_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "",
};


export  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a React component for a user profile card with an avatar, name, and a follow button. Use Tailwind CSS for styling. Give whole code in one file and don't give explanation.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```jsx\nimport React, { useState } from 'react';\n\nconst UserProfileCard = ({ avatarUrl, name }) => {\n    const [isFollowing, setIsFollowing] = useState(false);\n\n    const handleFollow = () => {\n        setIsFollowing(!isFollowing);\n    };\n\n    return (\n        <div className=\"bg-white rounded-lg shadow-md p-6 flex items-center space-x-4\">\n            <img\n                className=\"w-16 h-16 rounded-full object-cover\"\n                src={avatarUrl}\n                alt={`${name}'s avatar`}\n            />\n            <div>\n                <h2 className=\"text-xl font-semibold\">{name}</h2>\n                <button\n                    className={`px-4 py-2 rounded-md text-white ${\n                        isFollowing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'\n                    } transition-colors duration-200`}\n                    onClick={handleFollow}\n                >\n                    {isFollowing ? 'Following' : 'Follow'}\n                </button>\n            </div>\n        </div>\n    );\n};\n\nexport default UserProfileCard;\n```\n"},
        ],
      },
    ],
  });
