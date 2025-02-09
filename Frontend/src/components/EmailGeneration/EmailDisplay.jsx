/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { ThemeContext } from "../Context/ThemeContext";
import { Copy } from "lucide-react";

const EmailDisplay = ({ emailContent }) => {
  const typewriterRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typewriterRef.current) {
      typewriterRef.current.innerHTML = "";

      const typewriter = new Typewriter(typewriterRef.current, {
        loop: false,
        delay: 3,
      });
      typewriter.pauseFor(200).typeString(emailContent).start();
    }
  }, [emailContent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      className={`p-6 shadow-lg rounded-lg w-full max-w-2xl transition ${
        theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">Generated Email</h2>
      <div
        className={`border p-4 rounded-lg min-h-[150px] transition ${
          theme === "dark" ? "bg-[#1F1F23] text-gray-300 border-gray-700" : "bg-gray-100 text-black"
        }`}
      >
        <pre className="whitespace-pre-wrap" ref={typewriterRef}>
          {emailContent ? "" : "Your email will appear here..."}
        </pre>
      </div>
      <button
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2.5 mt-3 px-4 py-2 rounded transition ${
            theme === "dark" ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
    </div>
  );
};

export default EmailDisplay;
