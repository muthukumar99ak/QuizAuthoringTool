import '../../buttons/button.css';

function YellowButton(props) {
    return <button
        className="button yellow_button"
        onClick={props.onClick}
        disabled={props.disabled}
    >{props.label}</button>
}

export default YellowButton;