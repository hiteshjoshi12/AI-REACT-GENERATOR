/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { button_name, display_buttons } from "../../utils/button_name";
import { chatSession } from "../AI/Gemini";
import CodeDisplay from "../CodePreviewer/CodeDisplay";
import { ThemeContext } from "../../Context/ThemeContext";
import { Sparkles, Send, Terminal, ChevronDown } from "lucide-react";

const Main = ({ menu, setMenu, selectedButton }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const generativePrompt = `Generate code for ${prompt} in ${menu}. The code should be clean and well-structured. Provide only code, no explanation.`;

  const generateResponse = async () => {
    if (!prompt.trim()) {
      return;
    }
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(generativePrompt);
      const textResponse = await result.response.text();

      const codeMatch = textResponse.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
      if (codeMatch) {
        setGeneratedCode(codeMatch[1].trim());
      }
    } catch (error) {
      console.error("Error processing response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      <div className={`
        relative rounded-3xl border transition-all duration-500 overflow-hidden
        ${isDark ? "bg-[#09090B] border-white/10 shadow-2xl" : "bg-white border-slate-200 shadow-xl"}
      `}>
        
        {/* Glow Effect in Dark Mode */}
        {isDark && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />}

        <div className="p-8 md:p-10">
          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} /> AI Component Generator
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Generate <span className="text-purple-500">{menu}</span> Snippets
            </h2>
            <p className={`${isDark ? "text-slate-400" : "text-slate-500"} max-w-lg mx-auto`}>
              Transform your ideas into production-ready code instantly using Google Gemini.
            </p>
          </header>

          {/* Navigation/Tabs */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-gray-800/10 dark:border-white/5">
            <div className="flex flex-wrap justify-center gap-2 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl">
              {display_buttons.map((btn) => (
                <button
                  key={btn.name}
                  onClick={() => setMenu(btn.name)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    menu === btn.name 
                      ? "bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-sm" 
                      : "text-slate-500 hover:text-purple-500 dark:hover:text-slate-200"
                  }`}
                >
                  {btn.name}
                </button>
              ))}
            </div>

            <div className="relative group">
              <select
                className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border font-medium text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all cursor-pointer ${
                  isDark ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
                onChange={(e) => setMenu(e.target.value)}
                value={menu}
              >
                {button_name.map((item, index) => (
                  <option key={index} value={item.name} className="bg-slate-900 text-white">{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Prompt Area */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-4 text-purple-500">
                <Terminal size={20} />
              </div>
              <textarea
                rows="3"
                className={`w-full pl-12 pr-4 pt-3.5 rounded-2xl border transition-all resize-none outline-none ${
                  isDark 
                    ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500" 
                    : "bg-slate-50 border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-inner"
                }`}
                placeholder={selectedButton ? selectedButton.placeholder : "Describe your component..."}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className={`text-xs italic ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                <span className="font-bold uppercase not-italic mr-1">Example:</span> 
                {selectedButton ? selectedButton.example : "A responsive contact form."}
              </p>
              
              <button
                onClick={generateResponse}
                disabled={loading || !prompt.trim()}
                className={`
                  flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg
                  ${loading || !prompt.trim() 
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                    : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-500/25 active:scale-95"}
                `}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Magicing...</span>
                  </div>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Generate Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Display Area */}
      {generatedCode && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`ml-2 text-xs font-mono uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
               Editor Output — {menu}
            </span>
          </div>
          <CodeDisplay language={menu} generatedCode={generatedCode} />
        </div>
      )}
    </div>
  );
};

export default Main;