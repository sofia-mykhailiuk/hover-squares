import {createContext} from "react";

const ToastContext = createContext({
    toasts: [],
    addToast: () => {}
});

export default ToastContext;




