import 'react-h5-audio-player/lib/styles.css';
import React from "react";
import AudioPlayer from "react-h5-audio-player";



export const Player = () => (
    <AudioPlayer
        autoPlay={false}
        src="/itsbritney.mp3"
        onPlay={e => console.log("onPlay")}
        // other props here
        style={{background: "var(--bg-color)"}}
    />
);