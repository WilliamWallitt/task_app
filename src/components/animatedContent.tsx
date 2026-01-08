import React from "react";
import {AnimatePresence, motion} from "framer-motion";
import {UserLoginSignup} from "~/components/userLoginSignup";

export enum AnimatedContentType {
    UP,
    LEFT
}

interface AnimatedContentProps {
    children: React.ReactNode;
    key: string,
    type: AnimatedContentType
}

export const AnimatedContent = ({children, key, type}: AnimatedContentProps) => {

    if (type === AnimatedContentType.LEFT) {
        return (
            <AnimatePresence mode={"wait"}>
                <motion.div
                    style={{width: "100%", height: "100%"}}
                    key={key}
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 10}}
                    transition={{duration: 0.3}}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        )
    } else if (type === AnimatedContentType.UP) {
        return (
            <AnimatePresence mode={"wait"}>
                <motion.div style={{width: "100%", height: "100%"}}
                            initial={{opacity: 0, y: 0}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}>
                    {children}
                </motion.div>
            </AnimatePresence>
        )
    }

    return <></>
}