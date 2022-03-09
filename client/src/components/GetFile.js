import React, { useEffect, useState } from 'react';

import API from "../API/musicAPI";
import AudioPlayer from './AudioPlayer';

import { HTTP_SERVER } from "../config/config";

const GetFile = () => {

    const [audioFiles, setAudioFiles] = useState([]);
    const [autoPlayCode, setAutoPlayCode] = useState(-1);

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getApiData = async () => {
        const res = await API.get("/getFiles");
        setAudioFiles(res.data.data);
        // setAutoPlayCode(0, res.data.data.length);
    }

    const songPlaying = (index) => {
        if (index !== autoPlayCode)
            setAutoPlayCode(index);
    }

    const changeSong = () => {
        let index = randomIntFromInterval(0, audioFiles.length - 1);
        if (index === autoPlayCode)
            changeSong();
        else {
            setAutoPlayCode(index);
        }
    }

    useEffect(() => {
        getApiData();
    }, []);

    const styles = {
        postFileWrapper: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5%"
        }
    }

    return (
        <>
            {
                audioFiles.length &&
                audioFiles.map((value, index) => {
                    var path = `${HTTP_SERVER}${value.Path}`;
                    return (
                        <div style={styles.postFileWrapper} key={value._id}>
                            <AudioPlayer
                                path={path}
                                index={index}
                                name={value.Name}
                                isPlaying={index === autoPlayCode ? true : false}
                                changeSong={changeSong}
                                playSong={songPlaying}
                            />
                        </div>
                    )
                })
            }
        </>
    )
}

export default GetFile;