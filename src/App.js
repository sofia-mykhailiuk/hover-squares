import "./App.css";
import {useCallback, useEffect, useState} from "react";
import ModeForm from "./Components/ModeForm/ModeForm";
import SquaresField from "./Components/SquaresField/SquaresField";
import Toasts from "./Components/Toasts/Toasts";
import ToastContext from "./contexts/ToastContext";

const App = () => {
    const [appModes, setAppModes] = useState(null);
    const [selectedAppMode, setSelectedAppMode] = useState(null);
    const [toasts, setToasts] = useState([]);

    const value = {
        toasts,
        setToasts,
        removeToast: useCallback((toastIndex) => {
            setToasts((toasts) => {
                return toasts.filter(toastInState => toastInState.index !== parseInt(toastIndex))
            })
        }, [toasts]),
        removeAllToasts: useCallback(() => {
            setToasts([])
        }, [toasts])
    };

    const fetchAppModes = async () => {
        const appModes = await fetch("https://demo1030918.mockable.io/", { mode: "cors" })
            .then(appModes => appModes.json());
        setAppModes(appModes);
    }

    useEffect(() => {
        fetchAppModes();
    }, [])

    const getSelectedAppMode = (mode) => {
        setSelectedAppMode(mode);
    }

    return <ToastContext.Provider value={value}>
        <div className="app-wrapper">
            {appModes === null ? <span>Please wait, app is loading...</span>
                : <ModeForm appModes={appModes} getSelectedAppMode={getSelectedAppMode}/>
            }
            <h1>Hover Squares</h1>
            {selectedAppMode && <SquaresField fieldSize={selectedAppMode}/>}
            {selectedAppMode && <Toasts fieldSize={selectedAppMode}/>}
        </div>
    </ToastContext.Provider>
}

export default App;
