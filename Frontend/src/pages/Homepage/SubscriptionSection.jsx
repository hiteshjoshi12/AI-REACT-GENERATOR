import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const SubscriptionSection = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:w-[90%] w-full mt-10 m-auto text-white md:p-6 rounded-2xl">
      <div
        className={`md:w-[60%] w-full p-6 rounded-xl shadow-2xl  ${
          theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold">
          Stay up to date on what we’re building
        </h2>
        <p className="text-gray-400">Follow our engineering newsletter</p>
       
        <div className="mt-4 flex items-center gap-2 rounded-full overflow-hidden p-2">
          <Input
            placeholder="Your best email"
            className={`flex-1 text-white outline-none border-none  ${
              theme === "dark"
                ? "bg-[#09090B] text-white"
                : "bg-white text-black"
            }`}
          />
          <Button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-black">
            Subscribe
          </Button>
        </div>
      </div>
      
      <div
        className={`md:w-[40%] w-full md:p-6 rounded-xl relative flex flex-col justify-center items-center h-[181px] shadow-2xl  ${
          theme === "dark" ? "bg-[#09090B] text-white" : "bg-white text-black"
        }`}
      >
        <h3 className="text-lg font-semibold">Connect with me here.</h3>
        <div className="flex gap-4 mt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6  " />
          </a>
          <a
            href="https://www.instagram.com/hiteshh_12/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/hitesh-joshi-0b868b227/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 " />
          </a>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionSection;
