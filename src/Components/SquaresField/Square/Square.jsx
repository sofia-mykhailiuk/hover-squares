import "./../SquaresField.css"

const Square = (props) => {

    const onSquareMouseOver = (id) => () => {
        props.toggleIsActive(id);
        props.getSquarePosition(id);
    }

    const squareSize = {
        width: props.squareSize,
        height: props.squareSize
    };

    return <div id={props.id} className={`square animated-element ${props.isActive ? "active" : ""}`}
                onMouseOver={onSquareMouseOver(props.id)}
                style={squareSize}
    />
}

export default Square;