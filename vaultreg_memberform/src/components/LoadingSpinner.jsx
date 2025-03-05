import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <motion.div 
                className="relative w-24 h-24 flex items-center justify-center"
                animate={{
                    rotate: [0, -15, 15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut"
                }}
            >
                <img src="/path-to-your-logo.png" alt="Loading" className="w-16 h-16" />
                <div className="absolute w-24 h-24 border-4 border-gray-300 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
