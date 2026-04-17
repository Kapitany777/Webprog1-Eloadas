import "./TrigButton.css"

function TrigButton(props) {
    return (
        <button className={ `${props.className}` } onClick={ () => props.onClick(props.keyValue) }>
            { props.keyValue }
        </button>
    );
}

export default TrigButton;
