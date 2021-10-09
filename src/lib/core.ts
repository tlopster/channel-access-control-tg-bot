import moment from "moment";

moment.locale("ru");

import TG from "./TG/core";

import "./commands/loader";
import "./intervals/loader";
import "./requests/loader";
console.log("loaded")

import DB from "./DB/core"
import Express from "./express/core";

try {
    DB.master.connection.once("open", () => {
    console.log(`MongoDB connected.`)
    TG.master.main
        .launch()
        .then(() => console.log(`Telegarm polling => Master started.`));
    })
    DB.config.express.ports.forEach(x => {
        Express.start(x).then( () => 
            console.log(`Express listening => ${x} port started;`)
        );
    })
} catch (e) {
    console.error(e);
}