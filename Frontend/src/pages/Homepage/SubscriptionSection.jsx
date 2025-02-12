import { useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { ThemeContext } from '../../Context/ThemeContext';

const SubscriptionSection = ()=> {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-[90%]  mt-10 m-auto text-white p-6 rounded-2xl">
      <div className={`w-[60%] p-6 rounded-xl  ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
        <h2 className="text-2xl font-bold">Stay up to date on what we’re building</h2>
        <p className="text-gray-400">Follow our engineering newsletter</p>
        <div className="mt-4 flex items-center gap-2 rounded-full overflow-hidden p-2">
          <Input placeholder="Your best email" className={`flex-1 text-white outline-none border-none  ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`} />
          <Button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-black">Subscribe</Button>
        </div>
      </div>
      <div className={`w-[40%] p-6 rounded-xl relative flex flex-col justify-center items-center h-[181px]  ${theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"}`}>
        <h3 className="text-lg font-semibold">Connect with me here.</h3>
        <div className="flex gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 text-white hover:text-gray-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 text-white hover:text-gray-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-white hover:text-gray-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6 text-white hover:text-gray-300" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default SubscriptionSection;