/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Copy, Eye, Code2, Check, ExternalLink, RotateCcw } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const CodeDisplay = ({ language, generatedCode }) => {
  const [activeTab, setActiveTab] = useState("code"); // 'code' or 'preview'
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const previewableTech = {
    react: true, vue: true, angular: true, svelte: true, 
    javascript: true, html: true, web: true, css: true,
  };

  const isPreviewable = previewableTech[language.toLowerCase()] || false;

  // Logic to wrap code remains the same but moved to a cleaner helper
  const updatePreview = () => {
    if (!generatedCode || !isPreviewable) return;

    let wrappedCode = "";
    const lang = language.toLowerCase();

    if (lang === "react") {
      const cleanedCode = generatedCode
        .replace(/import\s+.*?;?\n/g, "")
        .replace(/export\s+default\s+/g, "");

      wrappedCode = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>body { background: white; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }</style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const { useState, useEffect } = React;
              try {
                ${cleanedCode}
                const componentMatch = ${JSON.stringify(cleanedCode)}.match(/(?:function|const|class)\\s+([A-Z][A-Za-z0-9]*)/);
                if (componentMatch) {
                  const Component = eval(componentMatch[1]);
                  ReactDOM.createRoot(document.getElementById("root")).render(<Component />);
                }
              } catch (e) { document.getElementById("root").innerHTML = '<pre style="color:red">'+e.message+'</pre>'; }
            </script>
          </body>
        </html>`;
    } else {
        // Standard HTML/JS wrap
        wrappedCode = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="p-4">${generatedCode}</body></html>`;
    }
    setIframeSrcDoc(wrappedCode);
  };

  useEffect(() => {
    if (activeTab === "preview") updatePreview();
  }, [activeTab, generatedCode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
      isDark ? "bg-[#0d0d0f] border-white/10" : "bg-slate-50 border-slate-200"
    }`}>
      
      {/* Header / Tabs */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
      }`}>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "code" 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Code2 size={16} /> Code
          </button>
          
          {isPreviewable && (
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "preview" 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Eye size={16} /> Preview
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hidden sm:block">
                {language}
            </span>
            <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isDark ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-slate-100"
            }`}
            >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {activeTab === "code" ? (
          <div className="group">
            <pre className={`p-6 text-sm font-mono overflow-auto max-h-[500px] leading-relaxed scrollbar-thin ${
              isDark ? "text-slate-300" : "text-slate-700 bg-white"
            }`}>
              <code>{generatedCode}</code>
            </pre>
          </div>
        ) : (
          <div className={`animate-in fade-in zoom-in-95 duration-300 ${isDark ? "bg-white" : "bg-slate-200"}`}>
            {/* Browser Frame UI */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 border-b border-slate-300">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-grow mx-4 px-3 py-0.5 rounded bg-white text-[10px] text-slate-400 truncate">
                    localhost:3000/preview
                </div>
                <RotateCcw size={12} className="text-slate-400 cursor-pointer hover:text-purple-600" onClick={updatePreview}/>
            </div>
            <iframe
              title="Code Preview"
              className="w-full h-[500px] border-none"
              srcDoc={iframeSrcDoc}
              sandbox="allow-scripts allow-modals"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeDisplay;