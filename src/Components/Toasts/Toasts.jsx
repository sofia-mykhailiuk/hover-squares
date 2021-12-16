import "./Toasts.css"
import {useContext} from "react";
import ToastContext from "../../contexts/ToastContext";

const Toasts = () => {
    const { toasts } = useContext(ToastContext);

    const toastItems = toasts.map((toast, index) => {
        return <div key={index} className="toast animated-element"> {`row: ${toast.row} col: ${toast.column}`} </div>;
    })

    return <div className="toasts">
        {toastItems}
    </div>
}

export default Toasts;