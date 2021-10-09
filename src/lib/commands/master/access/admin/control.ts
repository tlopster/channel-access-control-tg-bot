import { AdminCommand } from "../../../utils/core";
import TG from "../../../../TG/core";
import DB from "../../../../DB/core";
import { utilites } from "../../../../utils/core";
import { QiwiUtils } from "../../../../utils/core";


new AdminCommand(/^(?:открыть|выдать) доступ(?:\s([0-9]+))?(?:\s([0-9]+))?(?:\s([0-9]+))?$/i, async (ctx) => {
	if(ctx.state.args[1] && (ctx.state.args[2] || ctx.state.args[2] === 0)) {
		const id = Number(ctx.state.args[1]);
		const time = Number(ctx.state.args[2]);
		const give = await QiwiUtils.givePayment(id, time, { give: true, notify: ctx.state.args[3] ? [ ctx.state.args[3] ] : [] });
		if(give) {
			ctx.reply("доступ выдан: " + (time === 0 ? "безлимит" : utilites.displayTime(time)) );
		} else {
			ctx.reply("пользователь не найден");
		}
	} else {
		ctx.reply('Пример: "выдать доступ [телеграм ид] [время в секундах, 0 - безлимит] [за сколько времени уведомить о приближении окончания доступа, в секундах (на безлимит не работает)]"')
	}
})

new AdminCommand(/^(?:закрыть|забрать) доступ(?:\s([0-9]+))?$/i, async (ctx) => {
	if(ctx.state.args[1]) {
		const id = Number(ctx.state.args[1]);
		const time = Number(ctx.state.args[2]);
		const user = await DB.master.models.user.findOne({ id });
		if(user) {
			try {
				const api = TG.master.getAPI();
				user.access.be = false;
				user.access.unlimit = false;
				user.access.time = 0;
				user.access.notify = [];
				await user.save();
				await api.callApi("banChatMember", { chat_id: DB.config.telegram.channel.id, user_id: user.id });
				api.sendMessage(user.id, "Администратор закрыл вам доступ к каналу.");
				ctx.reply("доступ успешно закрыт");
			} catch (e) {
				ctx.reply(e.toString());
			}
		} else {
			ctx.reply("пользователь не найден");
		}
	} else {
		ctx.reply('Пример: "забрать доступ [телеграм ид]"')
	}
})

new AdminCommand(/^(?:kick|кик|ban|бан)(?:\s(.*))?$/i, async (ctx) => {
	if(ctx.state.args[1]) {
		const api = TG.master.getAPI();
		try{
			await api.callApi("banChatMember", { chat_id: DB.config.telegram.channel.id, user_id: ctx.state.args[1] });
			ctx.reply("успешно");
		} catch (e) {
			ctx.reply(e.toString());
		}
	} else {
		ctx.reply("кого кикать?")
	}
})

new AdminCommand(/^(?:разбан|unban)(?:\s(.*))?$/i, async (ctx) => {
	if(ctx.state.args[1]) {
		const api = TG.master.getAPI();
		try{
			await api.unbanChatMember(DB.config.telegram.channel.id, ctx.state.args[1]);
			ctx.reply("успешно");
		} catch (e) {
			ctx.reply(e.toString());
		}
	} else {
		ctx.reply("кого разбанивать?")
	}
})