import React, { useState } from "react";

import Backdrop from "@mui/material/Backdrop";

import "../css/showMessage.css";

const ShowMessage = (props) => {

    const [open, setOpen] = useState(true);

    const closeBackdrop = () => {
        setOpen(false);
        props.clickOk();
    }

    let borderStyle;

    if (props.status === "error") {
        borderStyle = {
            border: "2px solid red",
            background: "peachpuff"
        }
    }

    else if (props.status === "success") {
        borderStyle = {
            border: "2px solid darkgreen",
            background: "beige"
        }
    }

    return (
        <>
            <Backdrop
                open={open}
            >
                <div className="wrapper">
                    <div className="displayFlex">
                        <div style={borderStyle} className="childWrapper">
                            <div className="showMessage"> {props.message} </div>
                            <button className="buttonStyles" onClick={closeBackdrop}> OK </button>
                        </div>
                    </div>
                </div>
            </Backdrop>
        </>
    )
}

export default ShowMessage;