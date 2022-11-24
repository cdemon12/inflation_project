import json from "./PCEPI.json";
    
let data = json
    .map(x => [new Date(x.date), Number(x.percent_change_one_year), x.raw, (x.raw * 20/130)-5]);

export default data;