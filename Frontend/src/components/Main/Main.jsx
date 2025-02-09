/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { button_name } from "../../utils/button_name";
import { display_buttons } from "../../utils/button_name";
import { chatSession } from "../AI/Gemini";
import CodeDisplay from "../CodePreviewer/CodeDisplay";
import { ThemeContext } from "../Context/ThemeContext";
import SimilarRecommendations from "../SimilarRecomendations/SimilarRecommendations";

const Main = ({ menu, setMenu, selectedButton }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const generativePrompt = `Generate code for ${prompt} in ${menu}. The code should be clean and well-structured. Provide only code, no explanation.`;

  const generateResponse = async () => {
    try {
      if(prompt == ""){
        alert("enter prompt")
        return
      }
      setLoading(true);
      const result = await chatSession.sendMessage(generativePrompt);
      const textResponse = await result.response.text();
      console.log("Raw API Response:", textResponse);

      const codeMatch = textResponse.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
      if (codeMatch) {
        setGeneratedCode(codeMatch[1].trim());
      } else {
        console.error("No code block found in API response.");
      }
    } catch (error) {
      console.error("Error processing response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg w-full max-w-5xl mx-auto mt-10 transition-colors duration-300 
      ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"} 
      sm:mt-6 sm:w-[95%]`}
    >
      <h2 className="text-xl font-semibold text-center sm:text-lg">
        Home.{" "}
        <span className="text-gray-400">Where the AI magic of coding happens.</span>
      </h2>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Choose a generator and start coding now.
      </p>

      {/* Navigation Buttons & Select Dropdown */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 border-b border-gray-700 pb-2">
        {display_buttons.map((btn) => (
          <button
            key={btn.name}
            onClick={() => setMenu(btn.name)}
            className={`px-4 py-2 rounded-md text-sm 
            ${menu === btn.name ? " border-b-2 border-purple-500" : "cursor-pointer hover:text-purple-500"}`}
          >
            {btn.name}
          </button>
        ))}
        <select
          name="buttons"
          id="buttons"
          className={` ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}  border border-purple-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
          onChange={(e) => setMenu(e.target.value)}
        >
          {button_name.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Prompt Input */}
      <div className="mt-4"  >
        <input
          type="text"
          className={`w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}
          placeholder={selectedButton ? selectedButton.placeholder : "Enter your prompt..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <p className="text-gray-500 text-sm mt-2 text-center md:text-start">
          Example: {selectedButton ? selectedButton.example : "Provide a prompt to generate code."}
        </p>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center md:justify-start mt-4">
        <button
          onClick={generateResponse}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-purple-600 transition"
        >
          {!loading ? "GENERATE" : "GENERATING..."}
        </button>
      </div>

      {/* Code Display (Responsive) */}
      {generatedCode && (
        <div className="mt-6">
          <CodeDisplay language={menu} generatedCode={generatedCode} />
        </div>
      )}
      <SimilarRecommendations />
    </div>
  );
};

export default Main;
