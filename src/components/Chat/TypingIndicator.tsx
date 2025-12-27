import { motion } from "framer-motion";

export const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: dot * 0.1,
          }}
        />
      ))}
    </div>
  );
};
