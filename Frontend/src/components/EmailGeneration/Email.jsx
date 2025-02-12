/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { relations, dropDownList, lang } from "../../utils/EmailData";
import { EmailSession } from "../AI/Gemini";
import EmailDisplay from "./EmailDisplay";

const EmailForm = () => {
  const [mailType, setMailType] = useState("Thankyou Note");
  const [receiverName, setReceiverName] = useState("");
  const [reason, setReason] = useState("");
  const [senderName, setSenderName] = useState("");
  const [language, setLanguage] = useState("English");
  const [selectedRelation, setSelectedRelation] = useState("");
  const { theme } = useContext(ThemeContext);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const GenerateEmail = async () => {
    if (!mailType || !reason || !selectedRelation || !language) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setGeneratedEmail("");

    const prompt =
      `Generate a professional ${mailType} in ${language} for my ${selectedRelation}` +
      (receiverName ? ` named ${receiverName}` : "") +
      `. The purpose of this email is to ${reason}.` +
      (senderName ? ` My name is ${senderName}.` : "") +
      " Format the email in a polite and formal tone, keeping it concise yet impactful.";

    try {
      const result = await EmailSession.sendMessage(prompt);
      const textResponse = await result.response.text();
      console.log("Raw API Response:", textResponse);
      setGeneratedEmail(textResponse);
    } catch (error) {
      console.error("Error generating email:", error);
      alert("Error generating email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-wrap gap-6 justify-center items-center ${
        theme === "dark" ? "bg-[#09090B] text-white shadow-none" : "bg-white text-black shadow-gray-500"
      }`}
    >
      <div className="w-[669px] p-3.5 shadow-2xl  rounded-2xl">
        <label className="block font-semibold">
          Mail Type <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={mailType}
          onChange={(e) => setMailType(e.target.value)}
        >
          {dropDownList.map((item, index) => (
            <option
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-[#09090B] text-white"
                  : "bg-white text-black"
              }`}
            >
              {item}
            </option>
          ))}
        </select>

        <label className="block mt-4 font-semibold">
          Relation to the receiver
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {relations.map((rel) => (
            <button
              key={rel}
              onClick={() => setSelectedRelation(rel)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer transition ${
                selectedRelation === rel
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {selectedRelation === rel ? "✔ " : ""}
              {rel}
            </button>
          ))}
        </div>

        <label className="block mt-4">Receiver's name (optional)</label>
        <input
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
        />

        <label className="block mt-4">
          Reason for sending the email <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <label className="block mt-4">Sender's name (optional)</label>
        <input
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
      </div>

      <div className=" w-full md:w-1/3 p-5 h-44 shadow-2xl  rounded-2xl">
        <label className="block font-semibold">Language</label>
        <select
          className={`w-full p-2 border rounded mt-1 ${
            theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
          }`}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {lang.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>

        <button
          onClick={GenerateEmail}
          className={`w-full mt-4 p-2 rounded cursor-pointer ${
            loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
          } text-white transition`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {generatedEmail && (
        <div
          className={`flex w-full ml-0 md:ml-[111px] ${
            theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
          }`}
        >
          <EmailDisplay emailContent={generatedEmail} />
        </div>
      )}
    </div>
  );
};

export default EmailForm;
