import React, { useState, useRef } from 'react';

import ShowMessage from "./ShowMessage";
import API from '../API/musicAPI';

import "../css/postFile.css";

import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const PostFile = () => {

    const fileRef = useRef(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [albumName, setAlbumName] = useState("");
    const [language, setLanguage] = useState("Telugu");
    const [filename, setFileName] = useState("");
    const [fileDetail, setFileDetail] = useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);
        if (file.type !== 'audio/mpeg') {
            setError("You are not allowed to upload other files than music");
        }
        else {
            setFileDetail(file);
        }
    }

    const closeErrorMessage = (errorMessage = "", sucessMessage = "") => {
        fileRef.current.value = "";
        setSuccess(sucessMessage);
        setError(errorMessage);
        setAlbumName("");
        setLanguage("");
        setFileName("");
        setFileDetail(null);
    }

    const submitForm = async () => {
        const formData = new FormData();
        formData.append("albumName", albumName);
        formData.append("language", language);
        formData.append("music", fileDetail);
        const res = await API.post("/uploadMusic", formData, {
            headers: {
                'Content-Type': "audio/mpeg"
            }
        });
        if (res.status === 200) {
            closeErrorMessage("", res.data.message);
        }
        else {
            closeErrorMessage(res.data.message, "");
        }
    }

    return (
        <>
            {error.length > 0 && <ShowMessage status="error" message={error} clickOk={closeErrorMessage} />}
            {success.length > 0 && <ShowMessage status="success" message={success} clickOk={closeErrorMessage} />}

            <div className="postFileWrapper">

                <div className='childPostFileWrapper'>

                    <div className='header'>
                        UPLOAD THE SONG HERE
                    </div>

                    <div className='inputClass'>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-basic"
                                label="Album Name"
                                variant="outlined"
                                value={albumName}
                                onChange={(e) => setAlbumName(e.target.value)}
                            />
                        </FormControl>
                    </div>

                    <div className='inputClass'>
                        <FormControl fullWidth>
                            <InputLabel id="languageLabel"> Language </InputLabel>
                            <Select
                                labelId="languageLabel"
                                id="language"
                                autoWidth
                                label="LANGUAGE"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <MenuItem value="Telugu"> Telugu </MenuItem>
                                <MenuItem value="Tamil"> Tamil </MenuItem>
                                <MenuItem value="Hindi"> Hindi </MenuItem>
                                <MenuItem value="English"> English </MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                    <div style={{ margin: "20px" }}>
                        <div style={{ marginBottom: "15px", color: "rgba(0, 0, 0, 0.87)" }}>
                            {filename.length > 0 && <i> {filename} </i>}
                        </div>
                        <Button
                            variant="outlined"
                            component="label"
                            endIcon={<FileUploadIcon />}
                        >
                            Upload File
                            <input
                                type="file"
                                ref={fileRef}
                                onChange={onFileChange}
                                hidden
                            />
                        </Button>
                    </div>

                    <div className="postFileButtonStyle">
                        <Button variant="contained" onClick={submitForm}> SUBMIT </Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostFile;