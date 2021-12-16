import "./ModeForm.css";
import {useState} from "react";

const toFirstCharacterUpperCase = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

const ModeForm = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    const selectOptions = Object.entries(props.appModes).map((appMode) => {
        // data in format {easyMode: {field : 5}} -> appMode[1].field === 5, appMode[0] === "easyMode"
        const value = appMode[1].field;
        const modeName = toFirstCharacterUpperCase(appMode[0].replace(/Mode/g, ""));

        return <option key={value} value={value} onClick={toggleIsSelected}>{modeName}</option>;
    })

    const onStartCLick = (event) => {
        event.preventDefault();
        props.getSelectedAppMode(event.target.form.firstChild.value);
        toggleIsSelected();
    }

    return <form className="form">
        <select defaultValue='0' name="mode-select" id="mode-select">
            <option disabled value="0">Pick mode</option>
            {selectOptions}
        </select>
        <button disabled={!isSelected} onClick={onStartCLick}>START</button>
    </form>
}

export default ModeForm;