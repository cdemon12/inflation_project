import main from "./recon/main.json";
import formula from './recon/formula.json';
import other from './recon/other.json';
import scope_less from './recon/scope_less.json';
import scope_plus from './recon/scope_plus.json';
import weight from './recon/weight.json';

// map = {pce: xx, cpi: xx, effect:{effect: {total: xx, subcat: xx}}}

const data = {
    "main":main[0],
    "formula":formula[0],
    "other":other[0],
    "scope_less":scope_less[0],
    "scope_plus":scope_plus[0],
    "weight":weight[0]
}

export default data;