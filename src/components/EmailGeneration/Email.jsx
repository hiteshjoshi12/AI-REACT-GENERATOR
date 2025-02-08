import { useState, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import {relations} from '../../utils/EmailData'
import {dropDownList} from '../../utils/EmailData'
import {lang} from '../../utils/EmailData'

const EmailForm = () => {
  const [mailType, setMailType] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [reason, setReason] = useState("");
  const [senderName, setSenderName] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedRelation, setSelectedRelation] = useState(null);
  const { theme } = useContext(ThemeContext);
  

  const handleRelationClick = (rel) => {
    setSelectedRelation(rel);
    console.log("Selected Relation:", rel);
  };

  console.log("language is",language);

  return (
    <div className={`p-6 min-h-screen rounded-lg shadow-lg text-black flex flex-wrap gap-6 justify-center items-center ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
      <div className="w-[669px] p-3.5 shadow-2xl rounded-2xl">
        <label className="block font-semibold">Mail Type <span className="text-red-500">*</span></label>
        <select className="w-full p-2 border rounded mt-1" value={mailType} onChange={e => setMailType(e.target.value)}>
          {
            dropDownList.map((item,index)=>(
                <option className={`${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`} key={index}>{item}</option>
            ))
          }
          
        </select>

        <label className="block mt-4 font-semibold">Relation to the receiver</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {relations.map(rel => (
            <button 
              key={rel} 
              onClick={() => handleRelationClick(rel)}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer ${selectedRelation === rel ? "bg-purple-500 text-white" : "bg-gray-200 text-black"}`}
            >
              {selectedRelation === rel ? "✔ " : ""}{rel}
            </button>
          ))}
        </div>

        <label className="block mt-4">Receiver's name (optional)</label>
        <input className="w-full p-2 border rounded mt-1" placeholder="Enter name" value={receiverName} onChange={e => setReceiverName(e.target.value)} />

        <label className="block mt-4">Reason for sending the email <span className="text-red-500">*</span></label>
        <input className="w-full p-2 border rounded mt-1" placeholder="Enter reason" value={reason} onChange={e => setReason(e.target.value)} />

        <label className="block mt-4">Sender's name (optional)</label>
        <input className="w-full p-2 border rounded mt-1" placeholder="Enter name" value={senderName} onChange={e => setSenderName(e.target.value)} />
      </div>
      
      <div className="w-1/3">
        <label className="block font-semibold">Language</label>
        <select className="w-full p-2 border rounded mt-1" value={language} onChange={e => setLanguage(e.target.value)}>
          {
            lang.map((item,index)=>(
              <option key={index}>{item}</option>

            ))
          }
        </select>
        <button className="w-full mt-4 bg-purple-500 text-white p-2 rounded cursor-pointer">Generate</button>
      </div>
    </div>
  );
};

export default EmailForm;