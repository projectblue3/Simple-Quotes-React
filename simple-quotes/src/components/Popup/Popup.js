import React from 'react';
import './Popup.css';

const Popup = (props) => {
    return (
        <div className="popup-main">
            <div className="popup-bg" onClick={props.onCancel}></div>
            <div className="popup-content">{props.content}</div>
        </div>
    );
};

export default Popup;
