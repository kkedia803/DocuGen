"use client";

import { motion } from "framer-motion";

interface MaskTextProps {
    text: any;
}

export const MaskText: React.FC<MaskTextProps> = ({ text }) => {
    return (
        <div>
            <div className="overflow-hidden leading-tight">
                <motion.div
                    initial={{ y: "100%",  }}
                    animate={{ y: "0",  }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {text}
                </motion.div>
            </div>
        </div>
    );
};
