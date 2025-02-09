import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Coming Soon
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-lg md:text-2xl text-gray-300 text-center"
      >
        We’re working on something amazing. Stay tuned!
      </motion.p>
    </div>
  );
};

export default ComingSoon;
