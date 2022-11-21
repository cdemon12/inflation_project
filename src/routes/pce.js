import json from "./pce.json";

let predata = json.observations;
    
let data = predata
    .map(x => [x.value, new Date(x.date)]);

export default data;