const Qiwi = require("@qiwi/bill-payments-node-js-sdk");
import DB from "../DB/core";

class MasterQIWI {
    public main = new Qiwi(DB.config.qiwi.options.token);

    getQIWI() {
        return this.main;
    }
}

class CoreQIWI {
    public master = new MasterQIWI();
}

const qiwi = new CoreQIWI();

export default qiwi;