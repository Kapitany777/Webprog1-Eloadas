import React, { useState } from "react";
import TrigButton from "./TrigButton"
import "./TrigCalculator.css"

function TrigCalculator() {
    
    const [nextValue, setNextValue] = useState("0");
    const [resultValue, setResultValue] = useState(null);
    
    const handleClear = () => {
        setNextValue("0");
        setResultValue("");
    };

    const handleNumber = number => {
        setNextValue(nextValue === "0" ? String(number) : `${nextValue}${number}`);
    };

    const handleFunction = func => {
        let tmpResult = 0.0;
        let txtResult = "";
        let error = false;
        
        if (func === "sin") {
            tmpResult = Math.sin(nextValue * Math.PI / 180.0);
        }
        else if (func === "cos") {
            tmpResult = Math.cos(nextValue * Math.PI / 180.0);
        }
        else if (func === "tan") {
            if ((nextValue - 90) % 180 === 0) {
                txtResult = "Error";
                error = true;
            }
            else {
                tmpResult = Math.tan(nextValue * Math.PI / 180.0);
            }
        }

        if (!error) {
            tmpResult = Math.round(tmpResult * 10000.0) / 10000;
            txtResult = `${func}(${nextValue}°) = ${tmpResult}`;
        }

        setNextValue("0");
        setResultValue(txtResult);
    };
    
    return (
        <div className="trigCalculator">
            <div className="calculator-input">
                <div className="input">{nextValue}</div>
                <div className="output">{resultValue}</div>
            </div>
            
            <div className="keys-operations">
                <TrigButton keyValue="sin" onClick={handleFunction} />
                <TrigButton keyValue="cos" onClick={handleFunction} />
                <TrigButton keyValue="tan" onClick={handleFunction} />
            </div>

            <div className="keys-numbers">
                <TrigButton keyValue="7" onClick={handleNumber} />
                <TrigButton keyValue="8" onClick={handleNumber} />
                <TrigButton keyValue="9" onClick={handleNumber} />
            </div>

            <div className="keys-numbers">
                <TrigButton keyValue="4" onClick={handleNumber} />
                <TrigButton keyValue="5" onClick={handleNumber} />
                <TrigButton keyValue="6" onClick={handleNumber} />
            </div>

            <div className="keys-numbers">
                <TrigButton keyValue="1" onClick={handleNumber} />
                <TrigButton keyValue="2" onClick={handleNumber} />
                <TrigButton keyValue="3" onClick={handleNumber} />
            </div>

            <div className="keys-numbers">
                <TrigButton keyValue="0" className="trigButtonZero" onClick={handleNumber} />
                <TrigButton keyValue="C" onClick={handleClear} />
            </div>
        </div>
    );
}

export default TrigCalculator;
