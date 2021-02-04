const Util = require('./util');
import Immetric from './immetrical'
const systems = require('./systems');
const {siUnits} = require('./siUnits')

function init() {
    console.log(Immetric);
    // Populate the selectors
    Util.fillSelect(document.querySelector("#fromUnit"));
    Util.fillSelect(document.querySelector("#toUnit"), systems.imperial);
    let im = new Immetric();
    document.querySelector("#calc").addEventListener('click', () => im.process());
}


init();
