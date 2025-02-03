/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

const CodeDisplay = ({ language, generatedCode }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);

  const previewableTech = {
    "react": false, "vue": true, "angular": true, "svelte": true, "three.js": true,
    "material ui": true, "bootstrap ui": true,
    "javascript": true, "html": true, "css": true, "web": true,
    "canvas": true, "svg": true, "typescript": true
  };

  const isPreviewable = previewableTech[language.toLowerCase()] || false;

  useEffect(() => {
    if (showPreview && isPreviewable && generatedCode) {
      let wrappedCode = "";

      switch (language.toLowerCase()) {
        case "html":
        case "web":
          wrappedCode = `<!DOCTYPE html><html><head><meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
            </head><body>${generatedCode}</body></html>`;
          break;

        case "javascript":
          wrappedCode = `<!DOCTYPE html><html><head><meta charset="utf-8">
            <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
            </head><body><div id="output"></div><script>
            const output = document.getElementById('output');
            console.log = (...args) => { output.innerHTML += args.join(' ') + '<br>'; };
            try { ${generatedCode} } catch (error) { output.innerHTML += '<p style="color: red;">Error: ' + error.message + '</p>'; }
            </script></body></html>`;
          break;

        default:
          wrappedCode = `<html><body>${generatedCode}</body></html>`;
      }

      setIframeSrcDoc(wrappedCode);
    }
  }, [showPreview, generatedCode, language, isPreviewable]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-6 sm:w-[95%] sm:mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white capitalize">{language} Code</h3>
        <button
          onClick={handleCopy}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code Block */}
      <div className="relative max-h-[300px] overflow-y-auto border border-gray-700 rounded-lg">
        <pre className="p-4 bg-gray-800 text-gray-100 font-mono text-sm overflow-x-auto">
          <code>{generatedCode}</code>
        </pre>
      </div>

      {/* Preview Button */}
      {isPreviewable && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      )}

      {/* Code Preview */}
      {showPreview && (
        <div className="mt-4 w-full">
          <iframe
            title="Code Preview"
            className="w-full h-[350px] bg-white rounded-lg border border-gray-300 sm:h-[250px]"
            srcDoc={iframeSrcDoc}
            sandbox="allow-scripts allow-modals"
          />
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;
