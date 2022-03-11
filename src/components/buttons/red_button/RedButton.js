import classes from './RedButton.module.css'

function RedButton(props) {
    return <button
        className={classes.redBtn}
        onClick={props.onClick}
    >{props.label}</button>
}

export default RedButton;