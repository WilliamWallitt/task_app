import React, { useState, useEffect } from 'react';
import styles from "../pages/index.module.css";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());

        // Update the time every second
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (!time) {
        return null;
    }

    return (
        <p className={styles.small_text}>{time.toLocaleTimeString()}</p>
    );
};

export default Clock;