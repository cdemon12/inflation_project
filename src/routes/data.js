import json from "./data.json";
    
let data = json
    .map(x => {
        const [date, pcepi_raw, pcepi_pc, pcepi_core, cpi_core_pc, pce, cpi, cpi_pc, big, small] =
        [ new Date(x.date),  
        x.pcepi_raw, 
        x.pcepi_pc, 
        x.pcepi_core_pc,
        x.cpi_core_pc, 
        x.pce, 
        x.cpi, 
        x.cpi_pc,
        30,
        -20 
    ]; 
        return {date, pcepi_raw, pcepi_pc, pcepi_core, cpi_core_pc, pce, cpi, cpi_pc, big, small};
    });

export default data;