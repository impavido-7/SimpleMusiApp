import React, { useRef, useEffect } from "react";

import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = (props) => {

    const musicRef = useRef(null);

    useEffect(() => {
        if (props.isPlaying) {
            musicRef.current.audioEl.current.play();
        }
        else {
            musicRef.current.audioEl.current.pause();
        }
    }, [props.isPlaying]);

    return (
        <>
            <p> {props.name} </p>
            <ReactAudioPlayer
                src={props.path}
                controls
                ref={musicRef}
                onPlay={() => !props.isPlaying && props.playSong(props.index)}
                onEnded={props.changeSong}
            />
        </>
    )
}

export default AudioPlayer;