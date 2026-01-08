import React, {useEffect} from "react";
import styles from "~/pages/index.module.css";
import { motion } from "framer-motion";

interface PopupProps {
    onClose: (_: boolean) => void,
    children: React.ReactNode,
}


export const Popup = ({ children, onClose }: PopupProps) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className={styles.popup_overlay}>
            <motion.div initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1,
                            transition: {
                                ease: "easeInOut",
                                duration: 0.1
                            }}}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{duration: 0.3}}>
                <div className={styles.popup_content}>
                    <div className={`${styles.popup_nav_children_container}`}>
                        {children}
                    </div>
                    <div className={`${styles.popup_close_container}`}>
                        <button onClick={() => onClose(false)}>Close</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
