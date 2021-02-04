const Util = require('./util')
const {siUnits} = require('./siUnits')

export default class Immetric {
    process() {
        let input = Util.getInputs();
        let nNumber = Util.calculate(input.nIn, input.nUnitIn, input.nUnitOut);
        //Get the magnitude and simplify to thousands
        let [nResult, nMagnitude] = Util.convertToRange(nNumber);
        let [nResNumber, sPrefix] = this.convertToSI(nResult, nMagnitude);
        let el = document.querySelector("#result");
        nResNumber = parseFloat(nResNumber).toLocaleString("nl-NL", {
            maximumFractionDigits: 3
        });
        let sNewUnit = sPrefix + input.sUnitOut;
        el.innerHTML = `${input.nIn} ${input.sUnitIn} converts to ${nResNumber} ${sNewUnit}`;
    }

    /*
     * @ Fixes number and provides SI prefix
     * @Returns: [nNumber, sPrefix]
     */
    convertToSI(nNumber, nMagnitude) {
        if (nNumber < 0) {
            throw new Error("Negative distance");
        }
        //Get mix/max magnitude
        let indexes = Object.keys(siUnits);
        let nMin = indexes[indexes.length - 1];
        let nMax = Math.max.apply(Math, Object.keys(siUnits));

        // Create function to change the numbers based on magnitude being positive
        let fCalcUp = (nOriginalNumber, nOriginalMagnitude) => {
            nOriginalNumber = nOriginalNumber * 10;
            nOriginalMagnitude--;
            return [nOriginalNumber, nOriginalMagnitude];
        }

        // Create function to change the numbers based on magnitude being positive
        let fCalcDown = (nOriginalNumber, nOriginalMagnitude) => {
            nOriginalNumber = nOriginalNumber / 10;
            nOriginalMagnitude++;
            return [nOriginalNumber, nOriginalMagnitude];
        }

        if (indexes.includes(nMagnitude.toString())) {
            return [nNumber, siUnits[nMagnitude.toString()]];
        }

        //Check min/max boundries and resolve as well as possible
        if (nMagnitude > nMax) {
            while (nMagnitude > nMax) {
                [nNumber, nMagnitude] = fCalcUp(nNumber, nMagnitude);
            }
            return [nNumber, siUnits[nMagnitude.toString()]];
        }
        if (nMagnitude < nMin) {
            while (nMagnitude < nMin) {
                [nNumber, nMagnitude] = fCalcDown(nNumber, nMagnitude);
            }
            return [nNumber, siUnits[nMagnitude.toString()]];
        }
        while (!indexes.includes(nMagnitude.toString())) {
            [nNumber, nMagnitude] = fCalcUp(nNumber, nMagnitude);
        }
        return [nNumber, siUnits[nMagnitude.toString()]];
    }
}
