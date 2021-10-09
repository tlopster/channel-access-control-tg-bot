import { TtypeofResponse } from "./types";
import UtilsError from "./error";

class Utilites {
    public displayTime(seconds: number): string {
        var ticks = seconds;
        var dd = Math.floor(ticks / 86400)
        var hh = Math.floor((ticks % 86400) / 3600); 
        var mm = Math.floor((ticks % 3600) / 60); 
        var ss = ticks % 60; 
        var resultat: string = ``;
        if(dd > 0) resultat += `${dd} дн. `;
        if(hh > 0) resultat += `${hh} час. `;
        if(mm > 0) resultat += `${mm} мин. `;
        if(ss > 0) resultat += `${ss} сек. `;
        if(resultat == ``) resultat += `${ss} сек.`;
        return(resultat); 
    }
}

export default new Utilites();