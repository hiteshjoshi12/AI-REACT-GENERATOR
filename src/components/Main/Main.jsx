/* eslint-disable react/prop-types */
import { useState } from "react";
import { button_name } from "../../utils/button_name";
import { display_buttons } from "../../utils/button_name";
import { chatSession } from "../AI/Gemini";

const Main = ({ menu, setMenu, selectedButton }) => {
  const [prompt, setPrompt] = useState("");
  console.log(prompt);
  const generativePrompt = `${prompt} in ${menu}.The code should follow best practices and be optimized for readability and performance. Give whole code in one file and don't give explanation.`;
  console.log(generativePrompt);

  const generateResponse = async () => {
    try {
      const result = await chatSession.sendMessage(generativePrompt);
      
      // Get raw text response
      const textResponse = await result.response.text();
      console.log("Raw API Response:", textResponse);
  
      // Extract code block from response
      const codeMatch = textResponse.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
      
      if (codeMatch) {
        const extractedCode = codeMatch[1]; // Extract the actual code
        console.log("Extracted Code:", extractedCode);
        
        // Now you can use extractedCode to render in UI
      } else {
        console.error("No code block found in API response.");
      }
    } catch (error) {
      console.error("Error processing response:", error);
    }
  };
  

  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto mt-28">
      <h2 className="text-xl font-semibold">
        Home.{" "}
        <span className="text-gray-400">
          Where the AI magic of coding happens.
        </span>
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Choose generator and start coding now.
      </p>
      <div className="flex gap-4 mt-4 border-b border-gray-700 pb-2">
        {display_buttons.map((btn) => (
          <button
            key={btn.name}
            onClick={() => setMenu(btn.name)}
            className={
              menu === btn.name
                ? "text-gray-400 border-b-2 border-blue-500 pb-1"
                : "cursor-pointer"
            }
          >
            {btn.name}
          </button>
        ))}
        <select
          name="buttons"
          id="buttons"
          className="bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMenu(e.target.value)}
        >
          {button_name.map((item, index) => (
            <option
              className={
                menu === item.name
                  ? "text-gray-400 border-b-2 border-blue-500 pb-1"
                  : "cursor-pointer "
              }
              key={index}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        className="w-full p-3 mt-4 bg-gray-900 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={
          selectedButton ? selectedButton.placeholder : "Enter your prompt..."
        }
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <p className="text-gray-500 text-sm mt-2">
        Example:{" "}
        {selectedButton
          ? selectedButton.example
          : "Provide a prompt to generate code."}
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={generateResponse}
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold cursor-pointer"
        >
          GENERATE
        </button>
      </div>
    </div>
  );
};

export default Main;
