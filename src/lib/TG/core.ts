import { Telegraf } from "telegraf";
import DB from "../DB/core";
import eventHandler from "./eventHandler/core";

const plug = () => null;

class MasterTG {
    public main = new Telegraf(DB.config.master.options.token)
    getTG() {
        return this.main;
    }
    getAPI() {
        return this.main.telegram;
    }
    constructor() {
        this.main.on("message", eventHandler.master.messageNew);
    }
}

class CoreTG {
    public master = new MasterTG();
}

const telegram = new CoreTG();

export default telegram;