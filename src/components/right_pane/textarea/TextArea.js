import React, { useRef } from 'react';
import classes from './TextArea.module.css'

const TextArea = (props) => {
    const textareaElemet = useRef(null);

    const growHeight = () => {
        // console.log(textareaElemet.current)
        textareaElemet.current.style.height = "45px";
        textareaElemet.current.style.height = (textareaElemet.current.scrollHeight) + "px";
    }

    return <textarea
        className={classes.textBox}
        value={props.value}
        onChange={props.onChange}
        ref={textareaElemet}
        onKeyUp={growHeight}
    ></textarea>
}

export default TextArea;