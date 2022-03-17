import React, { useRef } from 'react';
import './textArea.css'

const TextArea = (props) => {
    return <textarea
        className="textbox"
        value={props.value}
        onChange={props.onChange}
    ></textarea>
}

export default TextArea;