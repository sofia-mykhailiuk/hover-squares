import "./SquaresField.css"
import Square from "./Square/Square";
import {useContext, useEffect, useState} from "react";
import ToastContext from "../../contexts/ToastContext";

const SquaresField = (props) => {
    const [activeSquaresIndices, setActiveSquaresIndices] = useState([]);
    const {toasts, setToasts, removeToast, removeAllToasts} = useContext(ToastContext);

    const fieldSize = parseInt(props.fieldSize);
    const fieldSizePx = 500;
    const squareSize = fieldSizePx / fieldSize;
    const squaresItems = [];

    const getSquarePosition = (index) => {
        const squareIndex = parseInt(index);
        const squarePosition = {index: squareIndex};

        if (squareIndex <= fieldSize) {
            squarePosition.column = squareIndex;
            squarePosition.row = 1;
        } else {
            const result = squareIndex % fieldSize;
            squarePosition.column = result === 0 ? fieldSize : result;
            squarePosition.row = Math.ceil(squareIndex / fieldSize);
        }

        return squarePosition;
    }

    const addToast = (toast) => {
        setToasts(toasts => [...toasts, toast]);
    }

    const isSquareActive = (squareIndex) => {
        return activeSquaresIndices.some(index => Number.parseInt(index) === squareIndex);
    }

    const toggleIsActiveSquare = (squareIndex) => {
        if (activeSquaresIndices.every(indexInArray => indexInArray !== squareIndex)) {
            setActiveSquaresIndices([...activeSquaresIndices, squareIndex]);
            addToast(getSquarePosition(squareIndex));
        } else {
            setActiveSquaresIndices(activeSquaresIndices.filter(indexInArray => indexInArray !== squareIndex));
            removeToast(squareIndex);
        }
    }

    useEffect(() => {
        setActiveSquaresIndices([]);
        removeAllToasts();
    }, [props.fieldSize])

    for (let i = 1; i <= Math.pow(fieldSize, 2); i++) {
        squaresItems.push(<Square key={i}
                                  id={i}
                                  isActive={isSquareActive(i)}
                                  toggleIsActive={toggleIsActiveSquare}
                                  squareSize={squareSize}
                                  getSquarePosition={getSquarePosition}
        />);
    }

    return <div className="squares">
        {squaresItems}
    </div>
}

export default SquaresField;