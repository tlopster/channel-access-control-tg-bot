import DB from "../../../DB/core";
import TG from "../../../TG/core";
import { utilites } from "../../core";

interface IExtraParams {
	billId?: string,
	give?: boolean,
	notify?: number[]
}

class QiwiUtils {
	public async givePayment(userId: number, time: number, params?: IExtraParams): Promise<void | boolean> {
		if(!params) params = {};
		if(params.billId) {
			const findBill = await DB.master.models.bill.findOne({ value: params.billId });
			if(!findBill) {
				await new DB.master.models.bill({ value: params.billId }).save();
			} else return;
		};
		const api = TG.master.getAPI();
		const user = await DB.master.models.user.findOne({ id: userId });
		if(user) {
			if(time === 0) {
				user.access.unlimit = true;
				user.access.be = true;
				user.access.notify = params.notify || [];
				await user.save();
				await api.unbanChatMember(DB.config.telegram.channel.id, userId).catch((e) => {});
				const inviteLink: any = await api.callApi("createChatInviteLink", { chat_id: DB.config.telegram.channel.id, expire_date: ( Date.now() + DB.config.telegram.channel.settings.inviteLink.access.time ) / 1000, member_limit: DB.config.telegram.channel.settings.inviteLink.access.inviteCount }).catch(e=>console.error(e))
				await api.sendMessage(userId, `${params.give ? "Администратор выдал вам" : "Вы успешно приобрели"} безлимитный доступ к каналу.\n${inviteLink.invite_link}\n\nСколько раз можно воспользоваться ссылкой: ${DB.config.telegram.channel.settings.inviteLink.access.inviteCount}\nСсылка действует ${utilites.displayTime(DB.config.telegram.channel.settings.inviteLink.access.time / 1000)}`);
				return true;
			} else {
				user.access.time = time;
				user.access.be = true;
				user.access.notify = params.notify || [];
				await user.save();
				await api.unbanChatMember(DB.config.telegram.channel.id, userId).catch((e) => {});
				const inviteLink: any = await api.callApi("createChatInviteLink", { chat_id: DB.config.telegram.channel.id, expire_date: ( Date.now() + DB.config.telegram.channel.settings.inviteLink.access.time ) / 1000, member_limit: DB.config.telegram.channel.settings.inviteLink.access.inviteCount }).catch(e=>console.error(e))
				await api.sendMessage(userId, `${params.give ? "Администратор выдал вам" : "Вы успешно приобрели"} доступ к каналу на ${utilites.displayTime(time)}\n${inviteLink.invite_link}\n\nСколько раз можно воспользоваться ссылкой: ${DB.config.telegram.channel.settings.inviteLink.access.inviteCount}\nСсылка действует ${utilites.displayTime(DB.config.telegram.channel.settings.inviteLink.access.time / 1000)}`);
				return true;
			}
		} else return false;
	}
}

export default new QiwiUtils();