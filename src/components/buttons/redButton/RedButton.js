import '../../buttons/button.css';

function RedButton(props) {
    return <button
        className="button red_button"
        onClick={props.onClick}
    >{props.label}</button>
}

export default RedButton;