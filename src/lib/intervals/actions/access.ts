import DB from "../../DB/core";
import TG from "../../TG/core";
import { utilites } from "../../utils/core";

setInterval(async function() {
	const users = await DB.master.models.user.find({});
	for(let user of users) {
		if(user.access.unlimit !== true) {
			if(user.access.be === true) {
				user.access.time -= DB.config.intervals.access.time / 1000;
				const TempAPI = TG.master.getAPI();
				if(user.access.time < 1) {
					user.access.be = false;
					user.access.notify = [];
					await TempAPI.callApi("banChatMember", { chat_id: DB.config.telegram.channel.id, user_id: user.id });
					TempAPI.sendMessage(user.id, "Оплаченное время истекло, доступ к каналу закрыт.");
				} else if(user.access.notify.length > 0 && user.access.time <= user.access.notify[0]) {
					user.access.notify.splice(0, 1);
					TempAPI.sendMessage(user.id, "Оплаченный доступ истекает через " + utilites.displayTime(user.access.time));
				}
			}
		}
		await user.save();
	}
}, DB.config.intervals.access.time)