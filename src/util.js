const systems = require('./systems');
const Util = {

    // @ Does the conversion between units
    // @Returns [nNumber]
    calculate: (nIn, nUnitIn, nUnitOut) => {
        //@TODO cleanup inputs
        let fromNumber = nIn;
        // let fromUnitSelector = document.querySelector("#fromUnit");
        let fromUnit = nUnitIn;
        // let fromUnitName = fromUnitSelector[fromUnitSelector.selectedIndex].innerHTML;
        // let toUnitSelector = document.querySelector("#toUnit");
        let toUnit = nUnitOut;
        // let toUnitName = toUnitSelector[toUnitSelector.selectedIndex].innerHTML;
        //Convert from to meters
        let nNumber = fromNumber;
        //Prevent divide by 0
        if(fromUnit === 0) {
            throw new Error("Divide by Zero");
        }
        // Do conversion
        nNumber = nNumber / fromUnit * toUnit;
        return nNumber
    },
    /*
     * @ Get all input fields, checks them for numerals and return them in 1 object
     * @Returns {
     *  nIn: number,
     *  sUnitIn: string,
     *  nUnitIn: num
     *  sUnitOut: string
     *  nUnitOut: num
     * }
     */
    getInputs: () => {
        //@TODO check for filled
        let nIn = document.querySelector("#fromNumber").value;

        let elUnitIn = document.querySelector("#fromUnit");
        elUnitIn = elUnitIn[elUnitIn.selectedIndex];
        let sUnitIn = elUnitIn.text;
        let nUnitIn = elUnitIn.value;

        let elUnitOut = document.querySelector("#toUnit");
        elUnitOut = elUnitOut[elUnitOut.selectedIndex];
        let sUnitOut = elUnitOut.text;
        let nUnitOut = elUnitOut.value;
        return {
            'nIn': nIn,
            'sUnitIn': sUnitIn,
            'nUnitIn': nUnitIn,
            'sUnitOut': sUnitOut,
            'nUnitOut': nUnitOut
        };
    },

//Flatten object if nessecary
    getCleanObj: (system) => {
        let res = {};
        let obj = systems;
        if (!Object.keys(system).includes('metric')) {
            Object.keys(system).map(unit => {
                res[unit] = system[unit].value;
            });
        } else {
            //flatten object
            Object.keys(obj).map(key => {
                    Object.keys(obj[key]).map(unit => {
                            res[unit] = obj[key][unit].value;
                        }
                    );
                }
            )
        }
        return res;
    },


//Generate the element and populate
    fillSelect: (select, data = systems) => {
        data = Util.getCleanObj(data)
        Object.keys(data).map(unit => {
                //Append units to from selector
                let node = document.createElement("option");
                node.value = data[unit];
                node.innerHTML = unit;
                select.append(node);
            }
        );
    },

    /*
     * @ Checks if n is between 1 and 10, if not converts it between those to and returns the result + magnitude needed
     * @returns [nNumber: number, nMagnitude: number]
     */

    convertToRange: (nResult, lower = 1, upper = 10) => {
        let nReturn = nResult
        let nMagnitude = 0;
        while (nReturn < lower || nReturn > upper) {
            if (nReturn < lower) {
                nMagnitude--;
                nReturn = nReturn * 10;
            } else {
                nMagnitude++;
                nReturn = nReturn / 10;
            }
        }
        return [nReturn, nMagnitude];
    },
}
module.exports = Util;
