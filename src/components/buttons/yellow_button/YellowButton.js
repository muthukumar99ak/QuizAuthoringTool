import classes from './YellowButton.module.css'

function YellowButton(props) {
    return <button
        className={classes.yellowBtn}
        onClick={props.onClick}
    >{props.label}</button>
}

export default YellowButton;