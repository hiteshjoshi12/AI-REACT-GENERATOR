/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Copy, Eye, EyeOff } from 'lucide-react';

const CodeDisplay = ({ language, generatedCode }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);


  const previewableTech = {
    // Web frameworks & libraries
    'react': true,
    'vue': true,
    'angular': true,
    'svelte': true,
    'three.js': true,
    
    // UI frameworks
    'material ui': true,
    'bootstrap ui': true,
    
    // Core web technologies
    'javascript': true,
    'html': true,
    'css': true,
    'web': true,
    
    // Graphics & Animation
    'canvas': true,
    'svg': true,
    
    // Other web technologies
    'typescript': true
  };

  const isPreviewable = previewableTech[language.toLowerCase()] || false;

  useEffect(() => {
    if (showPreview && isPreviewable && generatedCode) {
      let wrappedCode = "";

      switch (language.toLowerCase()) {
        case 'html':
        case 'web':
          wrappedCode = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                </style>
              </head>
              <body>${generatedCode}</body>
            </html>
          `;
          break;

        case 'javascript':
          wrappedCode = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                </style>
              </head>
              <body>
                <div id="output"></div>
                <script>
                  const output = document.getElementById('output');
                  const originalLog = console.log;
                  console.log = (...args) => {
                    output.innerHTML += args.map(arg => 
                      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
                    ).join(' ') + '<br>';
                    originalLog.apply(console, args);
                  };

                  try {
                    ${generatedCode}
                  } catch (error) {
                    output.innerHTML += '<p style="color: red;">Error: ' + error.message + '</p>';
                  }
                </script>
              </body>
            </html>
          `;
          break;

        case 'react':
        case 'material ui':
          // Remove import statements and extract component code
          const codeWithoutImports = generatedCode.replace(/import.*?;?\n/g, '');
          
          wrappedCode = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
                <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
                <script src="https://unpkg.com/@material-ui/core@4.12.4/umd/material-ui.development.js"></script>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
                <style>
                  body { font-family: 'Roboto', sans-serif; margin: 0; padding: 20px; }
                  .error { color: red; padding: 10px; border: 1px solid red; border-radius: 4px; }
                </style>
              </head>
              <body>
                <div id="root"></div>
                <script type="text/babel">
                  try {
                    window.React = React;
                    
                    ${codeWithoutImports}
                    
                    let ComponentToRender;
                    
                    if (typeof exports !== 'undefined' && exports.default) {
                      ComponentToRender = exports.default;
                    } else {
                      const componentMatch = ${JSON.stringify(codeWithoutImports)}
                        .match(/(?:function|const|class)\\s+([A-Z][A-Za-z0-9]*)/);
                      
                      if (componentMatch) {
                        ComponentToRender = eval(componentMatch[1]);
                      }
                    }

                    if (ComponentToRender) {
                      ReactDOM.render(
                        React.createElement(ComponentToRender),
                        document.getElementById('root')
                      );
                    } else {
                      throw new Error('No React component found in the code');
                    }
                  } catch (error) {
                    document.getElementById('root').innerHTML = 
                      '<div class="error">Error: ' + error.message + '</div>';
                    console.error(error);
                  }
                </script>
              </body>
            </html>
          `;
          break;

        case 'Three.js':
          wrappedCode = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
                <style>
                  body { margin: 0; }
                  canvas { display: block; }
                </style>
              </head>
              <body>
                <script>
                  try {
                    ${generatedCode}
                  } catch (error) {
                    document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
                  }
                </script>
              </body>
            </html>
          `;
          break;

        default:
          if (generatedCode.includes('<html>')) {
            wrappedCode = generatedCode;
          } else {
            wrappedCode = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                  </style>
                </head>
                <body>${generatedCode}</body>
              </html>
            `;
          }
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
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white capitalize">{language} Code</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto p-4 bg-gray-800 rounded-lg text-gray-100 font-mono text-sm">
          <code>{generatedCode}</code>
        </pre>
      </div>

      {isPreviewable && (
        <div className="mt-4">
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          
          {showPreview && (
            <div className="mt-4">
              <iframe
                title="Code Preview"
                className="w-full h-96 bg-white rounded-lg border border-gray-300"
                srcDoc={iframeSrcDoc}
                sandbox="allow-scripts allow-modals"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;